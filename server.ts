import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // In-memory tile cache to serve tiles in <1ms and prevent upstream rate limits
  const tileCache = new Map<string, { buffer: Buffer; contentType: string; time: number }>();

  // Robust satellite tile proxy route
  app.get('/api/tiles/satellite/:z/:y/:x', async (req, res) => {
    const { z, y, x } = req.params;
    const cacheKey = `${z}/${y}/${x}`;

    const cached = tileCache.get(cacheKey);
    if (cached && Date.now() - cached.time < 86400000) {
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.send(cached.buffer);
    }

    const upstreamUrls = [
      `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
      `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
    ];

    for (const url of upstreamUrls) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const upstream = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);

        if (upstream.ok) {
          const contentType = upstream.headers.get('content-type') || 'image/jpeg';
          const arrayBuffer = await upstream.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          if (tileCache.size > 3000) {
            const firstKey = tileCache.keys().next().value;
            if (firstKey) tileCache.delete(firstKey);
          }
          tileCache.set(cacheKey, { buffer, contentType, time: Date.now() });

          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.setHeader('Access-Control-Allow-Origin', '*');
          return res.send(buffer);
        }
      } catch (err) {
        // Try next upstream URL
      }
    }

    // Secondary fallback: CARTO Dark basemap tile if satellite times out
    try {
      const fallbackUrl = `https://a.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`;
      const fallbackResp = await fetch(fallbackUrl);
      if (fallbackResp.ok) {
        const buf = Buffer.from(await fallbackResp.arrayBuffer());
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send(buf);
      }
    } catch (e) {}

    // Tertiary fallback: 1x1 transparent PNG so MapLibre never receives a network error
    const transparentPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(transparentPng);
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
