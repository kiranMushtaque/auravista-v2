# 🏙️ AURA VISTA | Global 3D Billboard Advertising Network & Virtual Digital Twin

> **Next-Generation Planetary & Metropolitan Geospatial Digital Twin with Interactive 3D Earth Globe, Atmospheric Cloud-Dive Engine, and In-Situ 3D Out-of-Home (OOH) Advertising Simulation Platform**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-v6.11-396B94?logo=maplibre&logoColor=white)](https://maplibre.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-v3.15-88CE02?logo=greensock&logoColor=white)](https://greensock.com/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Procedural_Sound-FF6F00)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 📑 Table of Contents

- [1. Executive Overview](#1-executive-overview)
- [2. System Architecture & Tech Stack](#2-system-architecture--tech-stack)
- [3. Interactive 3D Earth Globe & Sky Dive Engine](#3-interactive-3d-earth-globe--sky-dive-engine)
  - [3.1 Rotatable 3D Earth Globe (Three.js WebGL)](#31-rotatable-3d-earth-globe-threejs-webgl)
  - [3.2 360° Worldwide Coverage (20 Global Locations)](#32-360-worldwide-coverage-20-global-locations)
  - [3.3 Quick Region & Continent Jump Navigation](#33-quick-region--continent-jump-navigation)
  - [3.4 Supersonic Sky & Clouds Re-entry Dive Animation](#34-supersonic-sky--clouds-re-entry-dive-animation)
  - [3.5 High-Performance Tile Proxy & Resilient Map Architecture](#35-high-performance-tile-proxy--resilient-map-architecture)
- [4. Core Platform Capabilities](#4-core-platform-capabilities)
  - [4.1 High-Altitude Stratosphere to Street Flight Navigation](#41-high-altitude-stratosphere-to-street-flight-navigation)
  - [4.2 3D Geospatial Satellite Mapping (MapLibre GL)](#42-3d-geospatial-satellite-mapping-maplibre-gl)
  - [4.3 In-Situ Street-Level 4K Photographic Frame](#43-in-situ-street-level-4k-photographic-frame)
  - [4.4 360° Spherical Panoramic Virtual Environment](#44-360-spherical-panoramic-virtual-environment)
  - [4.5 In-Situ Live Motion Commercial Video Playback](#45-in-situ-live-motion-commercial-video-playback)
  - [4.6 Real-Time Solar & Atmospheric Lighting Simulator](#46-real-time-solar--atmospheric-lighting-simulator)
  - [4.7 GLSL Billboard Screen Rain & Ripple Shader](#47-glsl-billboard-screen-rain--ripple-shader)
  - [4.8 Sightline Distance Perspective Simulator](#48-sightline-distance-perspective-simulator)
  - [4.9 Interactive Campaign Studio & Instant Creative Upload](#49-interactive-campaign-studio--instant-creative-upload)
  - [4.10 Circular Radar Mini-Map & Real-Time Telemetry HUD](#410-circular-radar-mini-map--real-time-telemetry-hud)
  - [4.11 Procedural Web Audio Soundscape & FX Synthesizer](#411-procedural-web-audio-soundscape--fx-synthesizer)
  - [4.12 Inventory Booking & Automated Tracking Dispatch](#412-inventory-booking--automated-tracking-dispatch)
- [5. Complete Catalog of 20 Global Prime Billboard Sites](#5-complete-catalog-of-20-global-prime-billboard-sites)
- [6. Atmospheric Lighting Modes Specification](#6-atmospheric-lighting-modes-specification)
- [7. Directory & Codebase Structure](#7-directory--codebase-structure)
- [8. Installation & Local Development](#8-installation--local-development)
- [9. Build & Production Deployment](#9-build--production-deployment)
- [10. Performance Optimizations & Resilience](#10-performance-optimizations--resilience)

---

## 1. Executive Overview

**AURA VISTA** is an enterprise-grade planetary and metropolitan 3D Out-of-Home (OOH) digital twin platform engineered for global media agencies, luxury brand directors, outdoor advertisers, and media buyers.

Traditional billboard buying relies on static PDF pitch decks, flat generic mockups, and disjointed traffic spreadsheets. **AURA VISTA transforms outdoor advertising evaluation into a seamless, interactive planetary-to-street journey**:

1. **Spin and explore the 3D Earth Globe**: Drag the planet with mouse inertia or touch gestures to view 20 iconic billboard hubs across every continent.
2. **Dive from the sky into urban streets**: Click any location on Earth to trigger a supersonic atmospheric re-entry dive through volumetric clouds down to street level.
3. **Inspect physical and digital LED billboards in 4K**: Evaluate sightlines, pedestrian dwell times, and surrounding architecture from driver and pedestrian perspectives.
4. **Experience 360° street panoramas**: Rotate full 360-degree viewpoints to inspect oncoming traffic corridors and commercial landmark adjacencies.
5. **Simulate real-world weather and lighting**: Switch seamlessly between High Daylight, Golden Hour Sunset, Cyber Neon Night, and Moody Rain.
6. **Watch realistic rain ripples on LED screens**: Enjoy custom WebGL GLSL shaders simulating dynamic water droplet ripples and moisture streaks on the display glass.
7. **Upload custom brand creatives instantly**: Drag and drop any brand image or video onto displays with real-time perspective fitting and luminance grading.

---

## 2. System Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   AURA VISTA                                    │
├───────────────────────────────────────┬─────────────────────────────────────────┤
│    Planetary 3D Earth Globe Engine    │    Metropolitan Geospatial Twin Engine  │
│    (Three.js r186 + WebGL Shaders)    │    (MapLibre GL v6 + Express Tile Cache)│
├───────────────────────────────────────┼─────────────────────────────────────────┤
│ • Rotatable 3D Earth Sphere Geometry  │ • High-Res ESRI & CARTO Satellite Tiles │
│ • Dual-Layer Atmospheric Halo Shaders │ • Real-Time Satellite Proxy & Cache     │
│ • Deep Space 1,600 Star Particle Field│ • 3D Terrain Pitch (75°) & 360° Bearing │
│ • 20 3D Laser Beacons & Base Rings    │ • Screen-Space Radar Pulse Markers      │
│ • Projected Interactive Screen Badges │ • Dynamic City Center Tracking Radar    │
├───────────────────────────────────────┴─────────────────────────────────────────┤
│                        In-Situ Media & Rendering Engines                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • 360° Spherical Panoramic Environment (Three.js Equirectangular Sphere)        │
│ • GLSL Billboard Screen Rain Accumulation & Sinusoidal Ripple Shader            │
│ • 4K In-Situ Street Photography Viewer & 60fps Motion Video Playback            │
│ • 4-State Atmospheric Lighting Engine (Day, Sunset, Cyber Neon, Moody Rain)     │
│ • Procedural Web Audio API Synthesizer (Atmospheric Jet Hum, Servo & Clicks)    │
│ • Dynamic Campaign Studio with Instant Image & Video Drag-and-Drop              │
│ • Automated Inventory Reservation & Inquiry Reference Code Dispatch             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Technology Highlights
- **Three.js r186**: Powers both the interactive 3D Earth Globe, deep space starfield, 360° equirectangular spherical panorama, and custom GLSL rain ripple shader.
- **MapLibre GL v6.11**: High-performance geospatial map engine with 3D camera pitch, bearing control, and custom animated DOM marker pins.
- **Express Server & High-Speed Tile Proxy**: Server-side caching tile proxy (`/api/tiles/satellite/:z/:y/:x`) with sub-millisecond in-memory cache, eliminating CORS issues and browser blocking.
- **GSAP (GreenSock Animation Platform) v3.15**: Drives camera trajectories, supersonic altitude ticker countdowns, and atmospheric fade ramps.
- **Tailwind CSS v4.3**: Modern atomic styling with zero external CSS baggage or layout flicker.
- **Web Audio API**: 100% procedural sound synthesis engine generating cinematic radar locks, wind whooshes, atmospheric drones, and feedback chirps without external audio dependencies.

---

## 3. Interactive 3D Earth Globe & Sky Dive Engine

### 3.1 Rotatable 3D Earth Globe (Three.js WebGL)
- **High-Resolution Satellite Textures**: The Earth sphere (`THREE.SphereGeometry(125, 64, 64)`) is wrapped with high-resolution satellite imagery with metallic and roughness response.
- **Dual-Layer Translucent Atmosphere**: An inner atmospheric glow sphere with `THREE.AdditiveBlending` and an outer deep-space scattering halo produce a photorealistic celestial appearance.
- **Natural Solar Illumination**: Directional solar lighting paired with balanced ambient illumination creates realistic day/night terminator boundaries.
- **1,600 Deep Space Stars**: An orbital starfield surrounds the planet with subtle counter-rotational drift.
- **Mouse & Touch Manipulation**: Users can freely spin and rotate the Earth in any direction with smooth velocity damping (`targetRotX`, `targetRotY`) and inertia. Mouse wheel scrolling controls orbital zoom distance (165 to 480 units).
- **Auto-Rotation**: When not being dragged, the Earth gently auto-rotates at an orbital drift speed of `0.0012 rad/frame`.

### 3.2 360° Worldwide Coverage (20 Global Locations)
Unlike localized maps, AURA VISTA spans all 360 degrees of longitude with **20 prestigious prime billboard hubs**:
- **3D Surface Beacons**: Each location features an anchored surface pinpoint, a pulsing radar ring, a glowing vertical laser pillar (amber and cyan dual-frequency beams), and an illuminated apex tip.
- **Screen-Projected Interactive Badges**: High-performance screen-space projection renders location badges (`SITE 01 · KARACHI`, `SITE 08 · NEW YORK`, `SITE 11 · DUBAI`, etc.) that update 60 times per second.
- **Zero Dead-Zone Horizon Visibility**: Horizon visibility thresholds (`dot > -0.05`) ensure location pins curving around the edges of the planet are immediately visible with smooth alpha fading, so the globe is never empty regardless of rotation angle.

### 3.3 Quick Region & Continent Jump Navigation
A dedicated quick-navigation bar atop the 3D Earth Globe HUD provides instant one-click travel:
- `[🕌 KARACHI (7)]` · `[🏙️ DUBAI]` · `[🗼 TOKYO]` · `[🎡 LONDON]` · `[🏛️ PARIS]` · `[🗽 NEW YORK]` · `[🌴 LOS ANGELES]` · `[🦘 SYDNEY]` · `[🦁 SINGAPORE]` · `[🏺 CAIRO]`
- Clicking any pill smoothly rotates the globe to center that specific city and highlights its local pin cluster with cinematic audio feedback.

### 3.4 Supersonic Sky & Clouds Re-entry Dive Animation
Clicking any location pin on the 3D Earth Globe or Map triggers a multi-stage cinematic descent:
1. **Target Acquisition**: The 3D Earth centers on the chosen coordinates and engages a tactical targeting crosshair.
2. **Orbital Acceleration**: The camera accelerates into the Earth's atmosphere (`z: 135`) with procedural wind whoosh sound effects.
3. **Atmospheric Cloud Break**: A high-definition cumulus cloud deck rapidly expands (`scale: 1.75`), simulating high-speed flight through clouds.
4. **Live Altitude Telemetry**: A digital altitude ticker counts down in real-time from `140,000 M` down to `65 M`.
5. **Optical Flash Re-Entry**: An anamorphic white flash transitions the view onto high-resolution street satellite tiles, instantly unveiling the 4K billboard inspection panel.

### 3.5 High-Performance Tile Proxy & Resilient Map Architecture
- **Server-Side Tile Caching**: The integrated Express backend provides an in-memory cached tile proxy route at `/api/tiles/satellite/:z/:y/:x` to prevent CORS issues, timeouts, and privacy blocker interference.
- **Sub-Millisecond Response**: Cached tiles return in `< 1ms` with `Cache-Control: public, max-age=86400` and `Access-Control-Allow-Origin: *`.
- **Failover & Fallback**: Upstream requests automatically failover between multiple geographic mirrors (`services.arcgisonline.com`, `server.arcgisonline.com`), followed by CARTO Dark tiles and transparent fail-safe PNGs.
- **Silent Error Interception**: `map.on('error')` silences benign network dropouts, preventing browser alert popups or console noise.

---

## 4. Core Platform Capabilities

### 4.1 High-Altitude Stratosphere to Street Flight Navigation
- **Orbital Opening**: The experience launches in high-altitude orbit (Zoom: 4.8, Altitude: ~120,000m) framed by anamorphic 2.39:1 letterbox bars.
- **Tactical Flight Reticle**: Displays live altitude counters and mission targeting status.
- **Full Control**: Users can launch the flight descent, open the 3D Earth Globe directly, or jump straight to the satellite street map.

### 4.2 3D Geospatial Satellite Mapping (MapLibre GL)
- **High-Precision Coordinates**: Real GPS latitude and longitude coordinates for all 20 global sites.
- **True 3D Camera Controls**: Supports up to 75° pitch, 360° bearing rotation, and smooth zooming.
- **Map Style Toggling**: Seamless switching between High-Resolution Real Satellite and Dark Metro Vector Cartography.

### 4.3 In-Situ Street-Level 4K Photographic Frame
- **Architectural Context**: High-resolution photography captures the real-world environment, traffic flyovers, pedestrian walkways, and building context.
- **Navigation Controls**: Next/previous site buttons and an interactive bottom filmstrip facilitate instant browsing.

### 4.4 360° Spherical Panoramic Virtual Environment
- **Interactive Street View**: A Three.js equirectangular sphere (`radius: 500`) allows advertisers to drag and look around in 360 degrees.
- **Smooth Inertia & Damping**: Natural momentum dampens camera movement for a comfortable, nausea-free viewing experience.

### 4.5 In-Situ Live Motion Commercial Video Playback
- **Digital Motion Commercials**: The `LIVE VIDEO` tab converts the billboard face into a continuous 60fps digital commercial video.
- **Floating Glass Player Controls**: Integrated Play/Pause, Mute/Unmute, and status indicators.

### 4.6 Real-Time Solar & Atmospheric Lighting Simulator
Advertisers can test creative visibility across 4 distinct atmospheric and solar illumination states:
- ☀️ **Daylight (`day`)**: 12:00 PM crisp 6500K daylight with balanced ambient exposure.
- 🌅 **Golden Hour Sunset (`sunset`)**: 6:30 PM warm amber 3200K low-horizon sun with dusk bloom.
- 🌃 **Neon Cyber Night (`neon`)**: 11:00 PM high-contrast night grading with vibrant 7,500-nit digital screen bloom.
- 🌧️ **Moody Rain (`rain`)**: 9:00 PM overcast rainstorm with glossy pavement reflections and animated screen water ripples.

### 4.7 GLSL Billboard Screen Rain & Ripple Shader
When **Moody Rain** is selected, a custom WebGL fragment shader overlays the digital billboard face:
- **Expanding Concentric Ripples**: Sinusoidal wave rings expand and decay across pseudo-random impact coordinates.
- **Gravity Rivulets**: Downward water streaks trickle across the glass face.
- **Chromatic Refraction**: Droplets realistically refract display lighting with emerald and cyan spectral dispersion.

### 4.8 Sightline Distance Perspective Simulator
Tests human visual acuity and billboard scale from 3 critical distances:
- 📍 **Close (50m Pedestrian)**: Simulates pedestrian sidewalks and signal crossing queues (`scale: 1.38`).
- 📍 **Medium (150m Driver's Eye)**: Approaching vehicle perspective at traffic lights (`scale: 1.15`).
- 📍 **Far (350m Highway Approach)**: High-speed arterial corridor approach view (`scale: 1.0`).

### 4.9 Interactive Campaign Studio & Instant Creative Upload
- **Pre-Loaded Brand Campaigns**: Ready-to-evaluate creatives including *Aura Haute Couture*, *Voltix GT Hypercar*, *Nexus Acoustics*, and *Élan Parfum*.
- **Local File Ingestion**: Users can upload any `.jpg`, `.png`, or `.webp` file from their device to instantly preview their own creative on the billboard in real-time.

### 4.10 Circular Radar Mini-Map & Real-Time Telemetry HUD
- **Dynamic Radar Tracking**: Automatically recalculates dot positions based on current viewport coordinates, showing local sites when zoomed in and continental hubs when zoomed out.
- **Live Telemetry Readout**: Displays real-time GPS coordinates, camera heading, pitch, and altitude.

### 4.11 Procedural Web Audio Soundscape & FX Synthesizer
Built purely on the browser's **Web Audio API** (`AudioContext`), requiring zero external audio files:
- **Radar Lock Chimes**: Frequency modulated chirps on targeting lock.
- **Atmospheric Re-entry Sweeps**: Filtered noise sweeps during supersonic descent.
- **Audio Toggle**: Global sound on/off switch in the top HUD.

### 4.12 Inventory Booking & Automated Tracking Dispatch
- **Instant Reservation Drawer**: Displays live dimensions, traffic reach, dwell times, and estimated weekly rates.
- **Reference Code Generation**: Automatically dispatches a verified tracking reference code (e.g., `#AV-9241`) upon inquiry submission.

---

## 5. Complete Catalog of 20 Global Prime Billboard Sites

| Code | Location & Name | City & Region | Coordinates | Format | Daily Reach | Weekly Rate |
| :---: | :--- | :--- | :---: | :--- | :---: | :---: |
| **01** | **Shahrah-e-Faisal Grand Digital** | Karachi, South Asia | `67.0722, 24.8615` | 4K Digital LED (48 × 14 ft) | 142,000+ | **$4,800** |
| **02** | **Clifton Skyline Mega Rooftop** | Karachi, South Asia | `67.0315, 24.8210` | Panoramic Rooftop LED (60 × 20 ft) | 195,000+ | **$5,900** |
| **03** | **DHA Commercial Boulevard** | Karachi, South Asia | `67.0650, 24.7950` | High-Luminance MicroLED (40 × 14 ft) | 115,000+ | **$3,900** |
| **04** | **Saddar Downtown Curved Screen** | Karachi, South Asia | `67.0180, 24.8580` | Curved LED Spectacular (42 × 16 ft) | 178,000+ | **$4,600** |
| **05** | **Gulshan Expressway Cantilever** | Karachi, South Asia | `67.0980, 24.9180` | Highway Cantilever Gantry (50 × 16 ft) | 160,000+ | **$3,800** |
| **06** | **North Nazimabad Broadway** | Karachi, South Asia | `67.0420, 24.9420` | High-Contrast LED (36 × 14 ft) | 128,000+ | **$3,400** |
| **07** | **PECHS Boulevard Monolith** | Karachi, South Asia | `67.0620, 24.8720` | Monolith Totem LED (32 × 16 ft) | 98,000+ | **$3,600** |
| **08** | **Times Square Iconic Mega Tower** | New York, USA | `-73.9855, 40.7580` | 8K Ultra-HDR Spectacular (120 × 42 ft) | 480,000+ | **$18,500** |
| **09** | **Sunset Boulevard Hollywood Spectacular** | Los Angeles, USA | `-118.3287, 34.0928`| Entertainment Digital Display (80 × 30 ft) | 295,000+ | **$16,000** |
| **10** | **Toronto Yonge-Dundas Atrium Screen** | Toronto, Canada | `-79.3802, 43.6560` | Curved Square Spectacular LED (75 × 28 ft) | 230,000+ | **$12,400** |
| **11** | **Piccadilly Circus Curved Super-Screen** | London, UK | `-0.1342, 51.5101` | Curved 4K Ultra-Luminance LED (95 × 34 ft) | 340,000+ | **$15,200** |
| **12** | **Champs-Élysées Luxury Monolith** | Paris, France | `2.3025, 48.8710` | Architectural Couture Screen (55 × 22 ft) | 220,000+ | **$13,900** |
| **13** | **Alexanderplatz Media Cube** | Berlin, Germany | `13.4132, 52.5219` | Modular Urban Media Screen (62 × 24 ft) | 195,000+ | **$10,600** |
| **14** | **Sheikh Zayed Road Cyber Monolith** | Dubai, UAE | `55.2708, 25.2048` | Cyber Monolith High-Luminance (75 × 25 ft) | 285,000+ | **$14,500** |
| **15** | **Nile Corniche Grand Digital** | Cairo, Egypt | `31.2357, 30.0444` | Riverfront Illuminated Spectacular (58 × 20 ft) | 210,000+ | **$8,500** |
| **16** | **Shibuya Crossing 3D Wave Screen** | Tokyo, Japan | `139.7005, 35.6595`| Naked-Eye 3D Curved LED (88 × 36 ft) | 520,000+ | **$17,800** |
| **17** | **Marina Bay Sands Holographic Display** | Singapore | `103.8591, 1.2838` | Waterfront Architectural Display (70 × 26 ft) | 240,000+ | **$13,400** |
| **18** | **Bandra-Worli Coastal Spectacular** | Mumbai, India | `72.8190, 19.0330` | Coastal Highway Gantry (72 × 26 ft) | 275,000+ | **$11,500** |
| **19** | **Sydney Harbour George Street LED** | Sydney, Australia | `151.2153, -33.8568`| Coastal Panoramic LED (65 × 24 ft) | 190,000+ | **$11,200** |
| **20** | **Avenida Paulista Panoramic LED** | São Paulo, Brazil | `-46.6559, -23.5615`| Metropolitan Financial LED (68 × 24 ft) | 260,000+ | **$9,800** |

---

## 6. Atmospheric Lighting Modes Specification

```
Mode: DAYLIGHT [☀️ 12:00 PM]
├── Sun Elevation: 65° High Zenith
├── Color Temperature: 6,500 Kelvin (Crisp Natural Sunlight)
├── Post-Filter: Brightness 1.08 | Contrast 1.04 | Saturation 1.05
└── Display Appearance: High ambient wash with anti-glare matte reflection

Mode: GOLDEN HOUR [🌅 06:30 PM]
├── Sun Elevation: 8° Low Horizon
├── Color Temperature: 3,200 Kelvin (Warm Amber Glow)
├── Post-Filter: Sepia 0.28 | Saturation 1.45 | Brightness 1.08 | Hue -15°
└── Display Appearance: Warm sunset rim lighting and long ground shadows

Mode: NEON CYBER NIGHT [🌃 11:00 PM]
├── Sun Elevation: Below Horizon (Night Ambiance)
├── Color Temperature: Deep Indigo & Cyan Skylight
├── Post-Filter: Contrast 1.30 | Brightness 0.92 | Saturation 1.40 | Hue +10°
└── Display Appearance: High-luminance LED glow (7,500 nits) with emissive bloom

Mode: MOODY RAIN [🌧️ 09:00 PM]
├── Sun Elevation: Overcast Cloud Deck
├── Color Temperature: 5,400 Kelvin (Cool Slate Grey)
├── Post-Filter: Contrast 1.20 | Brightness 0.85 | Saturation 0.75 | Hue 185°
└── Display Appearance: Animated GLSL water ripples, falling droplets, and wet glass sheen
```

---

## 7. Directory & Codebase Structure

```
├── server.ts                     # Express full-stack entry point & in-memory satellite tile caching proxy
├── index.html                    # 3D Earth Globe, MapLibre satellite, in-situ viewer, GLSL ripple shader
├── vite.config.ts                # Vite config (Tailwind v4, React plugin, tile proxy fallback, optimizeDeps)
├── metadata.json                 #  applet specifications & major capabilities
├── package.json                  # Scripts & dependencies (tsx, express, Three.js, MapLibre, React 19, GSAP)
├── tsconfig.json                 # TypeScript strict compiler configuration
│
├── public/
│   └── images/
│       └── campaigns/            # High-resolution billboard photos, campaigns & globe textures
│           ├── earth_globe_texture_*.jpg
│           ├── sky_clouds_texture_*.jpg
│           ├── billboard_times_square.jpg
│           ├── billboard_piccadilly.jpg
│           ├── billboard_shibuya.jpg
│           ├── billboard_dubai.jpg
│           ├── billboard_paris.jpg
│           ├── billboard_sydney.jpg
│           └── ...
│
├── src/
│   ├── App.tsx                   # Main React entry point with 3D virtual metropolis & interactive sections
│   ├── main.tsx                  # React 19 DOM root mounting
│   ├── index.css                 # Global CSS rules with Tailwind v4 `@import "tailwindcss"`
│   │
│   ├── components/               # Modular UI components (Navbar, Drawers, Modals)
│   ├── data/                     # Catalog data & campaign creatives
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Audio synthesis & utility helpers
```

---

## 8. Installation & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Full-Stack Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`, initializing both the Express satellite tile caching proxy and Vite middlewares.

### Step 3: Run TypeScript Linter
```bash
npm run lint
```

---

## 9. Build & Production Deployment Guide (Git, GitHub Pages, Vercel & Netlify)

### ❓ Git پر Push کرنے کے بعد ویب سائٹ ویسی نظر کیوں نہیں آتی؟ (Common Issue Explained)
جب آپ پروجیکٹ کو Git یا GitHub پر Push کرتے ہیں:
1. **GitHub Pages خام سورس کوڈ کو بغیر Build کے نہیں چلا سکتا**: `index.html` میں ماڈرن 3D لائبریریز (`Three.js`, `MapLibre GL`, `GSAP`) ماڈیولز کے طور پر استعمال ہوتی ہیں۔ اگر آپ GitHub Pages کو صرف خام `main` برانچ کی روٹ فائل دکھائیں گے تو براؤزر `Failed to resolve module specifier` ایرر دیتا ہے اور اسکرین بلینک رہ جاتی ہے۔
2. **پاتھس (Relative Paths)**: GitHub Pages پر ویب سائٹ اکثر سب فولڈر (جیسے `https://username.github.io/repo-name/`) میں ہوتی ہے۔ اب ہم نے `vite.config.ts` میں `base: './'` سیٹ کر دیا ہے اور تمام امیجز کو `./images/campaigns/...` کر دیا ہے، جس سے ہر قسم کی ہوسٹنگ پر تمام فائلز پرفیکٹ لوڈ ہوں گی۔

---

### 🚀 طریقہ 1: GitHub Pages پر 1-کلک آٹومیٹک ڈپلائمنٹ (Automated GitHub Actions)
ہم نے پروجیکٹ میں `.github/workflows/deploy.yml` شامل کر دیا ہے۔ آپ کو صرف یہ ایک چھوٹا سا سیٹ اپ GitHub پر کرنا ہے:

1. اپنے GitHub ریپوزیٹری پیج پر جائیں۔
2. اوپر **Settings** ٹیب پر کلک کریں۔
3. بائیں جانب مینو میں **Pages** پر کلک کریں۔
4. **Build and deployment** سیکشن میں:
   - **Source** کے ڈراپ ڈاؤن سے **"GitHub Actions"** منتخب کریں۔
5. بس! اب جب بھی آپ `git push` کریں گے، GitHub Actions خودکار طور پر:
   - پروجیکٹ کو بلڈ کرے گا (`npm run build`)
   - اور `dist/` فولڈر کو چند سیکنڈ میں **GitHub Pages** پر لائیو پبلش کر دے گا!

---

### ⚡ طریقہ 2: Vercel پر فری 1-کلک لائیو ہوسٹنگ (Recommended for Fastest Speed)
Vercel جدید ترین WebGL اور Vite ایپلی کیشنز کے لیے بہترین اور تیز ترین ہوسٹنگ ہے:

1. [Vercel.com](https://vercel.com/) پر لاگ ان کریں۔
2. **"Add New Project"** پر کلک کریں اور اپنا GitHub ریپوزٹری منتخب کریں۔
3. ہم نے پروجیکٹ میں `vercel.json` فائل بنا دی ہے، اس لیے آپ کو کوئی سیٹنگ تبدیل کرنے کی ضرورت نہیں ہے۔
4. **Deploy** پر کلک کریں۔ 30 سیکنڈ میں آپ کی ویب سائٹ پوری دنیا کے لیے لائیو ہو جائے گی!

---

### 🌐 طریقہ 3: Netlify پر لائیو ہوسٹنگ
1. [Netlify.com](https://www.netlify.com/) پر جائیں اور لاگ ان کریں۔
2. **"Import from Git"** پر کلک کریں اور اپنا ریپوزٹری منتخب کریں۔
3. پروجیکٹ میں `netlify.toml` موجود ہے جو خودکار طور پر `npm run build` اور `dist` فولڈر کو پبلش کر دے گا۔

---

### 💻 طریقہ 4: اپنے کمپیوٹر پر لوکل چلانا (Local Machine)
اگر آپ پروجیکٹ کو اپنے لوکل کمپیوٹر پر چلانا چاہتے ہیں:
```bash
# 1. کوڈ کلون کریں
git clone <your-github-repo-url>
cd <repo-name>

# 2. پیکجز انسٹال کریں
npm install

# 3. لوکل سرور اسٹارٹ کریں
npm run dev
```
پھر براؤزر میں کھولیں: **`http://localhost:3000`**

---

### 🛠️ Manual Build Commands:
```bash
# پروڈکشن بنڈل تیار کرنے کے لیے:
npm run build

# فل اسٹیک نوڈ سرور چلانے کے لیے:
npm start
```

---

## 10. Performance Optimizations & Resilience

1. **In-Memory Tile Cache**: The `/api/tiles/satellite/:z/:y/:x` proxy stores requested raster tiles in an in-memory LRU cache, delivering repeat tile requests in `< 1ms` and completely eliminating upstream rate-limiting.
2. **CORS & Ad-Blocker Immune**: Serving tiles from the application origin eliminates `AJAXError: Failed to fetch (0)` caused by browser ad-blockers or cross-origin restrictions on `arcgisonline.com`.
3. **MapLibre Web Worker Optimization**: `maplibre-gl` is explicitly excluded from Vite's `optimizeDeps` to ensure the MapLibre background worker loads cleanly across all environments.
4. **Hardware-Accelerated Viewports**: WebGL canvases and HUD overlays utilize CSS `will-change: transform` for smooth 60fps rendering.
5. **Zero External Audio Assets**: Procedural Web Audio API synthesis eliminates network latency and keeps initial page weight feather-light.

---

*Engineered with precision for global Out-of-Home advertising networks.*
