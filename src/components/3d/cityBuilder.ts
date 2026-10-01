import * as THREE from 'three';
import { Billboard } from '../../types/billboard';

export interface Vehicle {
  mesh: THREE.Group;
  speed: number;
  direction: number; // 1 or -1 along z
  minZ: number;
  maxZ: number;
  headlightMat: THREE.MeshBasicMaterial;
  taillightMat: THREE.MeshBasicMaterial;
}

export interface CityEnvironment {
  scene: THREE.Scene;
  buildings: THREE.Mesh[];
  windowMaterials: THREE.MeshStandardMaterial[];
  streetLights: THREE.SpotLight[];
  streetLightBulbs: THREE.MeshBasicMaterial[];
  billboardMeshes: Map<string, {
    screenMesh: THREE.Mesh;
    screenMaterial: THREE.MeshStandardMaterial;
    glowLight: THREE.PointLight;
    frameGroup: THREE.Group;
  }>;
  vehicles: Vehicle[];
  sunLight: THREE.DirectionalLight;
  moonLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
  hemiLight: THREE.HemisphereLight;
  fog: THREE.FogExp2;
}

// Generate a procedural building window texture for high performance and architectural realism
function createBuildingTexture(isNight: boolean = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark slate concrete facade
  ctx.fillStyle = '#141820';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const rows = 32;
  const cols = 8;
  const padX = 6;
  const padY = 5;
  const w = (canvas.width - (cols + 1) * padX) / cols;
  const h = (canvas.height - (rows + 1) * padY) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padX + c * (w + padX);
      const y = padY + r * (h + padY);

      // Random window illumination pattern
      const isLit = Math.random() > 0.45;
      if (isLit) {
        const warmLight = Math.random() > 0.3;
        ctx.fillStyle = warmLight ? 'rgba(255, 236, 180, 0.9)' : 'rgba(180, 220, 255, 0.85)';
      } else {
        ctx.fillStyle = 'rgba(25, 32, 42, 0.95)';
      }
      ctx.fillRect(x, y, w, h);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Procedural asphalt road texture with lane markings
function createRoadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Asphalt base
  ctx.fillStyle = '#121417';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle road grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Double yellow center divider line
  ctx.fillStyle = '#eab308';
  ctx.fillRect(canvas.width / 2 - 5, 0, 3, canvas.height);
  ctx.fillRect(canvas.width / 2 + 2, 0, 3, canvas.height);

  // White lane dashes
  ctx.fillStyle = '#e2e8f0';
  const lane1X = canvas.width * 0.25;
  const lane2X = canvas.width * 0.75;
  const dashLength = 40;
  const gapLength = 30;

  for (let y = 0; y < canvas.height; y += dashLength + gapLength) {
    ctx.fillRect(lane1X - 2, y, 4, dashLength);
    ctx.fillRect(lane2X - 2, y, 4, dashLength);
  }

  // Road boundary solid lines
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 0, 4, canvas.height);
  ctx.fillRect(canvas.width - 24, 0, 4, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 12);
  return texture;
}

export function buildCityScene(scene: THREE.Scene, billboards: Billboard[]): CityEnvironment {
  // 1. Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x112233, 0.5);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  // Sunlight (Warm directional)
  const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
  sunLight.position.set(35, 60, 25);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 150;
  sunLight.shadow.camera.left = -40;
  sunLight.shadow.camera.right = 40;
  sunLight.shadow.camera.top = 40;
  sunLight.shadow.camera.bottom = -40;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  // Moonlight (Cool midnight directional)
  const moonLight = new THREE.DirectionalLight(0x7da4d4, 0.0);
  moonLight.position.set(-30, 50, -25);
  scene.add(moonLight);

  // Atmospheric Fog
  const fog = new THREE.FogExp2(0x0e131d, 0.014);
  scene.fog = fog;

  // 2. City Grounds & Avenues
  const groundGeo = new THREE.PlaneGeometry(240, 240);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0a0c10,
    roughness: 0.9,
    metalness: 0.1
  });
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Main Avenue (North-South running through the billboard vista)
  const roadTexture = createRoadTexture();
  const roadGeo = new THREE.PlaneGeometry(22, 240);
  const roadMat = new THREE.MeshStandardMaterial({
    map: roadTexture,
    roughness: 0.6,
    metalness: 0.2
  });
  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.y = 0.02;
  roadMesh.receiveShadow = true;
  scene.add(roadMesh);

  // Sidewalks (West and East)
  const sidewalkMat = new THREE.MeshStandardMaterial({
    color: 0x22262d,
    roughness: 0.85,
    metalness: 0.05
  });
  const sidewalkGeo = new THREE.BoxGeometry(6, 0.25, 240);

  const westSidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
  westSidewalk.position.set(-14, 0.125, 0);
  westSidewalk.receiveShadow = true;
  scene.add(westSidewalk);

  const eastSidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
  eastSidewalk.position.set(14, 0.125, 0);
  eastSidewalk.receiveShadow = true;
  scene.add(eastSidewalk);

  // 3. Modern Architectural Skyline Buildings
  const buildings: THREE.Mesh[] = [];
  const windowMaterials: THREE.MeshStandardMaterial[] = [];
  const bldgTex = createBuildingTexture();

  // Create architectural towers bordering the avenue and background skyline
  const buildingConfigs = [
    // West Avenue Frontline
    { x: -28, z: -18, w: 16, d: 20, h: 42, color: 0x1b202a },
    { x: -26, z: -46, w: 18, d: 24, h: 58, color: 0x151921 },
    { x: -27, z: 12, w: 15, d: 18, h: 36, color: 0x1e2430 },
    { x: -30, z: 42, w: 18, d: 22, h: 52, color: 0x181d27 },

    // East Avenue Frontline
    { x: 28, z: -26, w: 18, d: 22, h: 64, color: 0x141820 },
    { x: 26, z: -4, w: 16, d: 18, h: 38, color: 0x1e2430 },
    { x: 28, z: 24, w: 18, d: 20, h: 48, color: 0x181d27 },
    { x: 29, z: 54, w: 20, d: 22, h: 60, color: 0x13171f },

    // Background Skyline Towers
    { x: -55, z: -35, w: 24, d: 24, h: 76, color: 0x10131a },
    { x: -52, z: 10, w: 22, d: 22, h: 68, color: 0x12161e },
    { x: 55, z: -40, w: 26, d: 26, h: 84, color: 0x0f1218 },
    { x: 52, z: 15, w: 22, d: 22, h: 72, color: 0x12151c },
    { x: 0, z: -90, w: 34, d: 26, h: 90, color: 0x0d1015 },
    { x: -35, z: -85, w: 26, d: 26, h: 78, color: 0x10141b },
    { x: 35, z: -88, w: 28, d: 28, h: 82, color: 0x11151d }
  ];

  buildingConfigs.forEach((cfg) => {
    const bGeo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d);
    const bMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      map: bldgTex,
      roughness: 0.35,
      metalness: 0.65,
      emissive: new THREE.Color(0xffe29a),
      emissiveIntensity: 0.15,
      emissiveMap: bldgTex
    });
    windowMaterials.push(bMat);

    const bMesh = new THREE.Mesh(bGeo, bMat);
    bMesh.position.set(cfg.x, cfg.h / 2, cfg.z);
    bMesh.castShadow = true;
    bMesh.receiveShadow = true;
    scene.add(bMesh);
    buildings.push(bMesh);

    // Architectural Rooftop Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.3, 0.3, 3, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3344 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(cfg.x, cfg.h + 1.5, cfg.z);
    scene.add(beacon);
  });

  // 4. Street Lights along Sidewalks
  const streetLights: THREE.SpotLight[] = [];
  const streetLightBulbs: THREE.MeshBasicMaterial[] = [];

  const poleGeo = new THREE.CylinderGeometry(0.08, 0.12, 6, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x333a44, metalness: 0.8, roughness: 0.3 });
  const bulbGeo = new THREE.SphereGeometry(0.2, 12, 8);

  const lightZPositions = [-70, -50, -30, -10, 10, 30, 50, 70];
  lightZPositions.forEach((z) => {
    // West pole
    const westPole = new THREE.Mesh(poleGeo, poleMat);
    westPole.position.set(-11.5, 3, z);
    scene.add(westPole);

    // West lamp arm
    const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8);
    const westArm = new THREE.Mesh(armGeo, poleMat);
    westArm.position.set(-10.8, 5.8, z);
    westArm.rotation.z = Math.PI / 3;
    scene.add(westArm);

    // West bulb
    const bulbMatWest = new THREE.MeshBasicMaterial({ color: 0xffeedd });
    streetLightBulbs.push(bulbMatWest);
    const westBulb = new THREE.Mesh(bulbGeo, bulbMatWest);
    westBulb.position.set(-10.2, 5.8, z);
    scene.add(westBulb);

    const westSpot = new THREE.SpotLight(0xfffaed, 1.8, 22, Math.PI / 4, 0.4, 1.2);
    westSpot.position.set(-10.2, 5.8, z);
    westSpot.target.position.set(-8, 0, z);
    scene.add(westSpot);
    scene.add(westSpot.target);
    streetLights.push(westSpot);

    // East pole
    const eastPole = new THREE.Mesh(poleGeo, poleMat);
    eastPole.position.set(11.5, 3, z);
    scene.add(eastPole);

    const eastArm = new THREE.Mesh(armGeo, poleMat);
    eastArm.position.set(10.8, 5.8, z);
    eastArm.rotation.z = -Math.PI / 3;
    scene.add(eastArm);

    const bulbMatEast = new THREE.MeshBasicMaterial({ color: 0xffeedd });
    streetLightBulbs.push(bulbMatEast);
    const eastBulb = new THREE.Mesh(bulbGeo, bulbMatEast);
    eastBulb.position.set(10.2, 5.8, z);
    scene.add(eastBulb);

    const eastSpot = new THREE.SpotLight(0xfffaed, 1.8, 22, Math.PI / 4, 0.4, 1.2);
    eastSpot.position.set(10.2, 5.8, z);
    eastSpot.target.position.set(8, 0, z);
    scene.add(eastSpot);
    scene.add(eastSpot.target);
    streetLights.push(eastSpot);
  });

  // 5. Urban Trees along Sidewalk
  const trunkGeo = new THREE.CylinderGeometry(0.15, 0.22, 3.5, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9 });
  const leavesGeo = new THREE.DodecahedronGeometry(1.6, 1);
  const leavesMat = new THREE.MeshStandardMaterial({ color: 0x1f3d24, roughness: 0.8 });

  [-60, -40, -20, 0, 20, 40, 60].forEach((tz) => {
    // West tree
    const wTrunk = new THREE.Mesh(trunkGeo, trunkMat);
    wTrunk.position.set(-15.5, 1.75, tz);
    const wLeaves = new THREE.Mesh(leavesGeo, leavesMat);
    wLeaves.position.set(-15.5, 4.2, tz);
    wLeaves.castShadow = true;
    scene.add(wTrunk);
    scene.add(wLeaves);

    // East tree
    const eTrunk = new THREE.Mesh(trunkGeo, trunkMat);
    eTrunk.position.set(15.5, 1.75, tz);
    const eLeaves = new THREE.Mesh(leavesGeo, leavesMat);
    eLeaves.position.set(15.5, 4.2, tz);
    eLeaves.castShadow = true;
    scene.add(eTrunk);
    scene.add(eLeaves);
  });

  // 6. Interactive Billboards Generation
  const billboardMeshes = new Map<string, {
    screenMesh: THREE.Mesh;
    screenMaterial: THREE.MeshStandardMaterial;
    glowLight: THREE.PointLight;
    frameGroup: THREE.Group;
  }>();

  const textureLoader = new THREE.TextureLoader();

  billboards.forEach((b) => {
    const frameGroup = new THREE.Group();
    frameGroup.position.set(b.position[0], b.position[1], b.position[2]);
    frameGroup.rotation.set(b.rotation[0], b.rotation[1], b.rotation[2]);

    const w = b.dimensions.width;
    const h = b.dimensions.height;
    const depth = 0.5;

    // Outer Heavy Metal Bevel Frame
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      roughness: 0.4,
      metalness: 0.85
    });

    const frameOuterGeo = new THREE.BoxGeometry(w + 0.6, h + 0.6, depth);
    const frameOuterMesh = new THREE.Mesh(frameOuterGeo, frameMat);
    frameOuterMesh.castShadow = true;
    frameGroup.add(frameOuterMesh);

    // Display Screen Face
    const screenGeo = new THREE.PlaneGeometry(w, h);
    const initialTexture = textureLoader.load(b.currentAdUrl);
    initialTexture.colorSpace = THREE.SRGBColorSpace;
    initialTexture.anisotropy = 8;

    const screenMat = new THREE.MeshStandardMaterial({
      map: initialTexture,
      roughness: 0.2,
      metalness: 0.1,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.35,
      emissiveMap: initialTexture
    });

    // Custom animated water accumulation and ripple shader on digital screen surface
    screenMat.userData.uRainIntensity = { value: 0.0 };
    screenMat.userData.uTime = { value: 0.0 };
    screenMat.onBeforeCompile = (shader) => {
      shader.uniforms.uRainIntensity = screenMat.userData.uRainIntensity;
      shader.uniforms.uTime = screenMat.userData.uTime;

      shader.fragmentShader = `
        uniform float uRainIntensity;
        uniform float uTime;

        vec3 calculateWaterRipples(vec2 uv, float time, float intensity) {
          if (intensity <= 0.001) return vec3(0.0);
          vec2 p = uv * 7.0;
          float ripple = 0.0;
          for (int i = 0; i < 5; i++) {
            float fi = float(i);
            vec2 center = vec2(
              fract(sin(fi * 78.233 + 12.9898) * 43758.5453),
              fract(cos(fi * 93.989 + 34.1234) * 23421.631)
            ) * 7.0;
            float dropTime = fract(time * 0.7 + fi * 0.2);
            float radius = dropTime * 2.2;
            float dist = length(p - center);
            float wave = sin((dist - radius) * 24.0) * exp(-abs(dist - radius) * 6.0);
            float fade = (1.0 - dropTime) * smoothstep(0.0, 0.15, dropTime);
            ripple += wave * fade;
          }
          float streaks = sin(uv.x * 40.0 + sin(uv.y * 20.0 + time * 1.5)) * 0.5 + 0.5;
          streaks *= smoothstep(0.75, 0.98, fract(uv.y * 5.0 - time * 0.6));
          float highlight = (ripple * 0.2 + streaks * 0.25) * intensity;
          return vec3(highlight * 0.8, highlight * 0.95, highlight * 1.2);
        }
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #include <map_fragment>
        #if defined( USE_UV )
          vec3 waterEffect = calculateWaterRipples(vUv, uTime, uRainIntensity);
          diffuseColor.rgb += waterEffect;
          roughnessFactor = mix(roughnessFactor, 0.05, uRainIntensity * 0.6);
        #elif defined( USE_MAP )
          vec3 waterEffect = calculateWaterRipples(vMapUv, uTime, uRainIntensity);
          diffuseColor.rgb += waterEffect;
          roughnessFactor = mix(roughnessFactor, 0.05, uRainIntensity * 0.6);
        #endif
        `
      );
    };

    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = depth / 2 + 0.02;
    screenMesh.name = `screen-${b.id}`;
    // Attach billboard ID for click raycasting
    screenMesh.userData = { billboardId: b.id };
    frameGroup.add(screenMesh);

    // Support Structure Based on Billboard Type
    if (b.type === 'Highway Gantry') {
      // Massive Overhead Arch spanning the road
      const gantryPillarMat = new THREE.MeshStandardMaterial({ color: 0x2d3440, metalness: 0.85, roughness: 0.3 });
      const pillarGeo = new THREE.BoxGeometry(1.2, 8.5, 1.2);

      const pLeft = new THREE.Mesh(pillarGeo, gantryPillarMat);
      pLeft.position.set(-w / 2 - 1.2, -4.25, 0);
      frameGroup.add(pLeft);

      const pRight = new THREE.Mesh(pillarGeo, gantryPillarMat);
      pRight.position.set(w / 2 + 1.2, -4.25, 0);
      frameGroup.add(pRight);
    } else if (b.type === 'Mega Rooftop') {
      // Heavy structural base mounting legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x262c36, metalness: 0.9, roughness: 0.3 });
      const legGeo = new THREE.CylinderGeometry(0.35, 0.45, 4.5, 8);

      const l1 = new THREE.Mesh(legGeo, legMat);
      l1.position.set(-w * 0.35, -2.5, -0.6);
      frameGroup.add(l1);

      const l2 = new THREE.Mesh(legGeo, legMat);
      l2.position.set(w * 0.35, -2.5, -0.6);
      frameGroup.add(l2);
    } else if (b.type === 'Monolith Totem') {
      // Ground monolith architectural pedestal
      const totemGeo = new THREE.BoxGeometry(w + 0.8, 3.8, depth + 0.4);
      const totemMat = new THREE.MeshStandardMaterial({ color: 0x1b1f28, metalness: 0.6, roughness: 0.4 });
      const totem = new THREE.Mesh(totemGeo, totemMat);
      totem.position.set(0, -h / 2 - 1.9, 0);
      frameGroup.add(totem);
    } else {
      // Classic Heavy Central Column with truss struts
      const poleGeo = new THREE.CylinderGeometry(0.65, 0.75, b.position[1], 12);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x2a303b, metalness: 0.85, roughness: 0.35 });
      const mainPole = new THREE.Mesh(poleGeo, poleMat);
      mainPole.position.set(0, -b.position[1] / 2, -0.4);
      mainPole.castShadow = true;
      frameGroup.add(mainPole);

      // Catwalk maintenance balcony underneath screen
      const catwalkGeo = new THREE.BoxGeometry(w + 0.4, 0.15, 1.2);
      const catwalkMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, metalness: 0.9, roughness: 0.4 });
      const catwalk = new THREE.Mesh(catwalkGeo, catwalkMat);
      catwalk.position.set(0, -h / 2 - 0.2, 0.5);
      frameGroup.add(catwalk);

      // Safety guardrail
      const railGeo = new THREE.BoxGeometry(w + 0.4, 0.6, 0.05);
      const railMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(0, -h / 2 + 0.15, 1.1);
      frameGroup.add(rail);
    }

    // Overhead Illuminating LED Spotlights
    const lightBarGeo = new THREE.BoxGeometry(w * 0.9, 0.12, 0.12);
    const lightBarMat = new THREE.MeshStandardMaterial({ color: 0x333b47, metalness: 0.8 });
    const lightBar = new THREE.Mesh(lightBarGeo, lightBarMat);
    lightBar.position.set(0, h / 2 + 0.6, 0.8);
    frameGroup.add(lightBar);

    // Cast Point Light onto the street/surrounding environment
    const glowLight = new THREE.PointLight(0xffffff, 1.2, 28, 1.4);
    glowLight.position.set(0, 0, 2.5);
    frameGroup.add(glowLight);

    // 3D Interactive Beacon / Target Ring above Billboard
    const beaconGroup = new THREE.Group();
    beaconGroup.position.set(0, h / 2 + 1.2, 0);

    const ringGeo = new THREE.RingGeometry(0.4, 0.65, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.name = `beacon-${b.id}`;
    ringMesh.userData = { billboardId: b.id };
    beaconGroup.add(ringMesh);

    const dotGeo = new THREE.CircleGeometry(0.2, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.z = 0.01;
    beaconGroup.add(dotMesh);

    frameGroup.add(beaconGroup);

    scene.add(frameGroup);

    billboardMeshes.set(b.id, {
      screenMesh,
      screenMaterial: screenMat,
      glowLight,
      frameGroup
    });
  });

  // 7. Dynamic Moving Vehicles along Avenue
  const vehicles: Vehicle[] = [];
  const carColors = [0x1e293b, 0xd97706, 0x0284c7, 0xe11d48, 0x475569, 0xf8fafc];

  const createCar = (laneX: number, dir: number, initialZ: number, isBus: boolean = false): Vehicle => {
    const vGroup = new THREE.Group();
    const l = isBus ? 8.5 : 4.4;
    const w = isBus ? 2.5 : 1.9;
    const h = isBus ? 2.8 : 1.4;

    const bodyMat = new THREE.MeshStandardMaterial({
      color: isBus ? 0x0f766e : carColors[Math.floor(Math.random() * carColors.length)],
      roughness: 0.3,
      metalness: 0.7
    });

    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, l), bodyMat);
    bodyMesh.position.y = h / 2 + 0.2;
    bodyMesh.castShadow = true;
    vGroup.add(bodyMesh);

    // Windshield & Windows
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.9 });
    const cabMesh = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, h * 0.6, l * 0.5), glassMat);
    cabMesh.position.y = h + 0.15;
    cabMesh.position.z = dir > 0 ? -0.2 : 0.2;
    vGroup.add(cabMesh);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const wheelPositions = [
      [-w / 2 - 0.05, 0.35, l * 0.3],
      [w / 2 + 0.05, 0.35, l * 0.3],
      [-w / 2 - 0.05, 0.35, -l * 0.3],
      [w / 2 + 0.05, 0.35, -l * 0.3]
    ];
    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      vGroup.add(wheel);
    });

    // Headlights (Warm White)
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.18, 0.08), headlightMat);
    hl1.position.set(-w * 0.35, h * 0.45, (l / 2 + 0.05) * dir);
    const hl2 = hl1.clone();
    hl2.position.x = w * 0.35;
    vGroup.add(hl1);
    vGroup.add(hl2);

    // Taillights (Red)
    const taillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.18, 0.08), taillightMat);
    tl1.position.set(-w * 0.35, h * 0.45, -(l / 2 + 0.05) * dir);
    const tl2 = tl1.clone();
    tl2.position.x = w * 0.35;
    vGroup.add(tl1);
    vGroup.add(tl2);

    vGroup.position.set(laneX, 0, initialZ);
    if (dir < 0) {
      vGroup.rotation.y = Math.PI;
    }
    scene.add(vGroup);

    return {
      mesh: vGroup,
      speed: (isBus ? 0.22 : 0.32) + Math.random() * 0.12,
      direction: dir,
      minZ: -110,
      maxZ: 110,
      headlightMat,
      taillightMat
    };
  };

  // Populate multiple lanes
  // Southbound lanes (left side: x = -6, x = -2.5)
  vehicles.push(createCar(-6.2, 1, -80));
  vehicles.push(createCar(-6.2, 1, -25));
  vehicles.push(createCar(-6.2, 1, 40));
  vehicles.push(createCar(-2.8, 1, -50, true));
  vehicles.push(createCar(-2.8, 1, 15));
  vehicles.push(createCar(-2.8, 1, 75));

  // Northbound lanes (right side: x = 2.8, x = 6.2)
  vehicles.push(createCar(2.8, -1, -65));
  vehicles.push(createCar(2.8, -1, 5));
  vehicles.push(createCar(2.8, -1, 60));
  vehicles.push(createCar(6.2, -1, -30, true));
  vehicles.push(createCar(6.2, -1, 35));
  vehicles.push(createCar(6.2, -1, -95));

  return {
    scene,
    buildings,
    windowMaterials,
    streetLights,
    streetLightBulbs,
    billboardMeshes,
    vehicles,
    sunLight,
    moonLight,
    ambientLight,
    hemiLight,
    fog
  };
}

export function updateCityLighting(env: CityEnvironment, isNight: boolean, progress: number = 1.0) {
  // progress: 0 is full Day, 1 is full Night
  const t = Math.max(0, Math.min(1, progress));

  // Background / Fog Color: Azure daylight (0x96b6d8) to deep midnight (0x070a10)
  const dayBg = new THREE.Color(0x94b3d6);
  const nightBg = new THREE.Color(0x06090f);
  const currentBg = dayBg.clone().lerp(nightBg, t);
  env.scene.background = currentBg;
  env.fog.color = currentBg;
  env.fog.density = 0.009 + t * 0.007;

  // Sunlight: 2.2 in Day, 0.05 in Night
  env.sunLight.intensity = THREE.MathUtils.lerp(2.2, 0.02, t);
  env.moonLight.intensity = THREE.MathUtils.lerp(0.0, 1.4, t);

  // Ambient & Hemisphere
  env.ambientLight.intensity = THREE.MathUtils.lerp(0.85, 0.22, t);
  env.ambientLight.color = new THREE.Color(0xffffff).lerp(new THREE.Color(0x5a7090), t);

  env.hemiLight.intensity = THREE.MathUtils.lerp(0.6, 0.2, t);

  // Streetlights
  env.streetLights.forEach((sl) => {
    sl.intensity = THREE.MathUtils.lerp(0.0, 2.8, t);
  });
  env.streetLightBulbs.forEach((bulb) => {
    bulb.color = new THREE.Color(0x555555).lerp(new THREE.Color(0xffeedd), t);
  });

  // Building Windows Glow
  env.windowMaterials.forEach((wm) => {
    wm.emissiveIntensity = THREE.MathUtils.lerp(0.08, 0.85, t);
  });

  // Billboards Screen Emission Glow
  env.billboardMeshes.forEach(({ screenMaterial, glowLight }) => {
    screenMaterial.emissiveIntensity = THREE.MathUtils.lerp(0.25, 1.35, t);
    glowLight.intensity = THREE.MathUtils.lerp(0.3, 2.4, t);
  });
}
