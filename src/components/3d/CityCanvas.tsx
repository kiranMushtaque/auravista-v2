import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { Billboard } from '../../types/billboard';
import { buildCityScene, updateCityLighting, CityEnvironment } from './cityBuilder';
import { soundEngine } from '../../utils/audio';

interface CityCanvasProps {
  billboards: Billboard[];
  selectedBillboardId: string | null;
  onSelectBillboard: (id: string | null) => void;
  isNight: boolean;
  onToggleNight?: () => void;
  hoveredBillboardId: string | null;
  onHoverBillboard: (id: string | null) => void;
}

export const CityCanvas: React.FC<CityCanvasProps> = ({
  billboards,
  selectedBillboardId,
  onSelectBillboard,
  isNight,
  hoveredBillboardId,
  onHoverBillboard
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const envRef = useRef<CityEnvironment | null>(null);

  // Default Overview Camera coordinates
  const defaultCamPos = useRef(new THREE.Vector3(0, 5.5, 18));
  const defaultLookAt = useRef(new THREE.Vector3(0, 5.0, -15));

  // Current animated target states
  const targetCamPos = useRef(new THREE.Vector3(0, 5.5, 18));
  const targetLookAt = useRef(new THREE.Vector3(0, 5.0, -15));
  const currentLookAt = useRef(new THREE.Vector3(0, 5.0, -15));

  // User Orbit / Drag offsets
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const orbitAngles = useRef({ yaw: 0, pitch: 0 });
  const targetOrbitAngles = useRef({ yaw: 0, pitch: 0 });
  const zoomLevel = useRef(1.0);
  const targetZoomLevel = useRef(1.0);

  // Day/Night transition animation
  const nightTransition = useRef({ current: isNight ? 1 : 0, target: isNight ? 1 : 0 });

  // Loaded textures cache
  const textureCache = useRef<Map<string, THREE.Texture>>(new Map());
  const textureLoader = useRef<THREE.TextureLoader>(new THREE.TextureLoader());

  const [hasInteracted, setHasInteracted] = useState(false);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // Update target camera position when selected billboard changes
  useEffect(() => {
    if (selectedBillboardId) {
      const b = billboards.find((item) => item.id === selectedBillboardId);
      if (b) {
        targetCamPos.current.set(...b.cameraFocusPos);
        targetLookAt.current.set(...b.cameraLookAt);
        // Reset orbit offsets when focusing
        targetOrbitAngles.current = { yaw: 0, pitch: 0 };
        orbitAngles.current = { yaw: 0, pitch: 0 };
        targetZoomLevel.current = 1.0;
        zoomLevel.current = 1.0;
        soundEngine.playTransitionChime();
      }
    } else {
      targetCamPos.current.copy(defaultCamPos.current);
      targetLookAt.current.copy(defaultLookAt.current);
    }
  }, [selectedBillboardId, billboards]);

  // Update Day/Night target
  useEffect(() => {
    nightTransition.current.target = isNight ? 1 : 0;
  }, [isNight]);

  // Update billboard textures when creative changes
  useEffect(() => {
    if (!envRef.current) return;
    billboards.forEach((b) => {
      const meshData = envRef.current?.billboardMeshes.get(b.id);
      if (!meshData) return;

      let texture = textureCache.current.get(b.currentAdUrl);
      if (!texture) {
        texture = textureLoader.current.load(b.currentAdUrl, () => {
          if (meshData.screenMaterial) {
            meshData.screenMaterial.needsUpdate = true;
          }
        });
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        textureCache.current.set(b.currentAdUrl, texture);
      }

      if (meshData.screenMaterial.map !== texture) {
        meshData.screenMaterial.map = texture;
        meshData.screenMaterial.emissiveMap = texture;
        meshData.screenMaterial.needsUpdate = true;

        // Flash screen spotlight on texture change
        const origIntensity = meshData.glowLight.intensity;
        meshData.glowLight.intensity = origIntensity * 2.5;
        setTimeout(() => {
          if (meshData.glowLight) {
            meshData.glowLight.intensity = origIntensity;
          }
        }, 400);
      }
    });
  }, [billboards]);

  // Set up Three.js Canvas
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.5,
      450
    );
    // Initialize at high satellite altitude looking down across the urban corridor
    camera.position.set(0, 85, 95);
    camera.lookAt(new THREE.Vector3(0, 2, -10));
    currentLookAt.current.set(0, 2, -10);

    const env = buildCityScene(scene, billboards);
    envRef.current = env;
    updateCityLighting(env, isNight, isNight ? 1 : 0);

    // Setup Post-Processing Pipeline with UnrealBloomPass
    const renderTarget = new THREE.WebGLRenderTarget(
      container.clientWidth,
      container.clientHeight,
      {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        samples: 4
      }
    );
    const composer = new EffectComposer(renderer, renderTarget);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.75, // strength
      0.5,  // radius
      0.18  // threshold (enables luminous emission glow for screens and markers)
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      bloomPass.resolution.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Pointer Interactivity (Mouse & Touch)
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      setHasInteracted(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStart.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging.current) {
        const deltaX = clientX - dragStart.current.x;
        const deltaY = clientY - dragStart.current.y;
        dragStart.current = { x: clientX, y: clientY };

        // Scale drag sensitivity
        const sensitivity = 0.0035;
        targetOrbitAngles.current.yaw -= deltaX * sensitivity;
        targetOrbitAngles.current.pitch = Math.max(
          -0.45,
          Math.min(0.45, targetOrbitAngles.current.pitch + deltaY * sensitivity)
        );
      }

      // Raycasting for billboard hover (mouse only)
      if (!('touches' in e) && container) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersectables: THREE.Object3D[] = [];
        env.billboardMeshes.forEach(({ screenMesh, frameGroup }) => {
          intersectables.push(screenMesh);
          const beacon = frameGroup.getObjectByName(`beacon-${screenMesh.userData.billboardId}`);
          if (beacon) intersectables.push(beacon);
        });

        const hits = raycaster.intersectObjects(intersectables, true);
        if (hits.length > 0) {
          let bId: string | null = null;
          for (const hit of hits) {
            if (hit.object.userData?.billboardId) {
              bId = hit.object.userData.billboardId;
              break;
            }
          }
          if (bId && bId !== hoveredBillboardId) {
            onHoverBillboard(bId);
            container.style.cursor = 'pointer';
          }
        } else {
          if (hoveredBillboardId) {
            onHoverBillboard(null);
            container.style.cursor = 'grab';
          }
        }
      }
    };

    const onPointerUp = () => {
      isDragging.current = false;
      if (container) {
        container.style.cursor = hoveredBillboardId ? 'pointer' : 'grab';
      }
    };

    // Click handler for billboard selection
    const onClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersectables: THREE.Object3D[] = [];
      env.billboardMeshes.forEach(({ screenMesh, frameGroup }) => {
        intersectables.push(screenMesh);
        const beacon = frameGroup.getObjectByName(`beacon-${screenMesh.userData.billboardId}`);
        if (beacon) intersectables.push(beacon);
      });

      const hits = raycaster.intersectObjects(intersectables, true);
      if (hits.length > 0) {
        for (const hit of hits) {
          const bId = hit.object.userData?.billboardId;
          if (bId) {
            onSelectBillboard(bId);
            soundEngine.playTick(560);
            return;
          }
        }
      }
    };

    // Mouse wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setHasInteracted(true);
      const zoomDelta = e.deltaY * 0.001;
      targetZoomLevel.current = Math.max(0.65, Math.min(1.4, targetZoomLevel.current + zoomDelta));
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;
      const time = now * 0.001;

      // Smooth Day / Night transition
      if (Math.abs(nightTransition.current.current - nightTransition.current.target) > 0.002) {
        nightTransition.current.current +=
          (nightTransition.current.target - nightTransition.current.current) * (delta * 2.8);
        updateCityLighting(env, isNight, nightTransition.current.current);
      }

      // Update Moving Traffic along Avenue
      env.vehicles.forEach((v) => {
        v.mesh.position.z += v.speed * v.direction;
        if (v.direction > 0 && v.mesh.position.z > v.maxZ) {
          v.mesh.position.z = v.minZ;
        } else if (v.direction < 0 && v.mesh.position.z < v.minZ) {
          v.mesh.position.z = v.maxZ;
        }
      });

      // Smooth Orbit Angles and Zoom Damping
      orbitAngles.current.yaw += (targetOrbitAngles.current.yaw - orbitAngles.current.yaw) * (delta * 6);
      orbitAngles.current.pitch += (targetOrbitAngles.current.pitch - orbitAngles.current.pitch) * (delta * 6);
      zoomLevel.current += (targetZoomLevel.current - zoomLevel.current) * (delta * 6);

      // Camera Position Lerp towards target
      camera.position.lerp(targetCamPos.current, delta * 3.2);

      // Camera LookAt Lerp
      currentLookAt.current.lerp(targetLookAt.current, delta * 3.8);

      // Depth-based atmospheric haze & dynamic altitude fog
      // As camera descends from high satellite altitude (85) to street level (5.5),
      // atmospheric haze naturally disperses to reveal crisp urban street level clarity
      const camY = camera.position.y;
      const altFactor = THREE.MathUtils.clamp((camY - 5.5) / 75, 0, 1);
      if (env.fog) {
        const baseDensity = isNight ? 0.012 : 0.009;
        const satelliteDensity = isNight ? 0.032 : 0.024;
        env.fog.density = THREE.MathUtils.lerp(baseDensity, satelliteDensity, altFactor);

        const groundColor = isNight ? new THREE.Color(0x06090f) : new THREE.Color(0x94b3d6);
        const hazeColor = isNight ? new THREE.Color(0x0c1728) : new THREE.Color(0xb5d3f2);
        env.fog.color.copy(groundColor).lerp(hazeColor, altFactor);
        env.scene.background = env.fog.color;
      }

      // Apply Orbit Offset to LookAt
      const finalLookAt = currentLookAt.current.clone();
      finalLookAt.x += Math.sin(orbitAngles.current.yaw) * 12;
      finalLookAt.z += (Math.cos(orbitAngles.current.yaw) - 1) * 12;
      finalLookAt.y += orbitAngles.current.pitch * 8;

      camera.lookAt(finalLookAt);
      camera.fov = 52 * zoomLevel.current;
      camera.updateProjectionMatrix();

      // Gentle pulsating rotation on Billboard Target Rings and screen shader animation
      env.billboardMeshes.forEach(({ frameGroup, screenMaterial }, bId) => {
        if (screenMaterial.userData && screenMaterial.userData.uTime) {
          screenMaterial.userData.uTime.value = time;
        }
        const beacon = frameGroup.getObjectByName(`beacon-${bId}`);
        if (beacon) {
          beacon.rotation.z = time * 0.8;
          const isTargeted = bId === selectedBillboardId || bId === hoveredBillboardId;
          const scale = (isTargeted ? 1.4 : 1.0) + Math.sin(time * 3.5) * 0.12;
          beacon.scale.set(scale, scale, 1);
        }
      });

      renderer.render(scene, camera);
      composer.render();
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('wheel', onWheel);

      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      composer.dispose();
      renderer.dispose();
    };
  }, []);

  // WebGL Fallback container if WebGL unavailable
  if (!webGlAvailable) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-300 p-8 text-center">
        <h3 className="text-xl font-display font-semibold mb-2">Interactive 3D Engine Ready</h3>
        <p className="text-sm text-neutral-400 max-w-md mb-6">
          Your browser has hardware acceleration disabled or WebGL is paused. Explore our high-visibility billboard locations below.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-neutral-100 text-neutral-950 font-medium text-xs rounded-lg hover:bg-white transition-colors"
        >
          Reload Experience
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-neutral-950"
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Floating Exploration Helper (auto fades) */}
      {!hasInteracted && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/10 text-xs text-neutral-300 transition-opacity duration-700 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>DRAG TO LOOK AROUND · CLICK BILLBOARDS TO PREVIEW</span>
        </div>
      )}

      {/* Reset Camera View button when billboard is focused */}
      {selectedBillboardId && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectBillboard(null);
            soundEngine.playTick(420);
          }}
          className="absolute top-20 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 backdrop-blur-md border border-white/10 text-xs font-medium text-neutral-200 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to City Overview</span>
        </button>
      )}
    </div>
  );
};
