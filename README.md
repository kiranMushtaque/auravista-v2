# 🏙️ AURA VISTA | 3D Billboard Advertising Network & Virtual Digital Twin

> **Next-Generation Geospatial Digital Twin & In-Situ 3D Out-of-Home (OOH) Advertising Simulation Platform**

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
- [3. Core Feature Breakdown (Feature-by-Feature)](#3-core-feature-breakdown-feature-by-feature)
  - [3.1 High-Altitude Stratosphere to Street Cinematic Flight](#31-high-altitude-stratosphere-to-street-cinematic-flight)
  - [3.2 3D Geospatial Satellite Flight Navigation (MapLibre GL)](#32-3d-geospatial-satellite-flight-navigation-maplibre-gl)
  - [3.3 7 Real Landmark Billboard Sites (GPS & Demographics)](#33-7-real-landmark-billboard-sites-gps--demographics)
  - [3.4 In-Situ Street-Level View & 4K Photography Frame](#34-in-situ-street-level-view--4k-photography-frame)
  - [3.5 360° Spherical Panoramic Virtual Environment](#35-360-spherical-panoramic-virtual-environment)
  - [3.6 In-Situ Live Video Playback & Sound Simulator](#36-in-situ-live-video-playback--sound-simulator)
  - [3.7 Real-Time Atmosphere & Photorealistic Lighting Simulation](#37-real-time-atmosphere--photorealistic-lighting-simulation)
  - [3.8 GLSL Billboard Screen Water Accumulation & Ripple Shader](#38-glsl-billboard-screen-water-accumulation--ripple-shader)
  - [3.9 Sightline Distance Simulator (Close, Medium, Far)](#39-sightline-distance-simulator-close-medium-far)
  - [3.10 Interactive Campaign Studio & Instant Creative Upload](#310-interactive-campaign-studio--instant-creative-upload)
  - [3.11 3D Procedural Metropolis & Traffic Simulation (Three.js)](#311-3d-procedural-metropolis--traffic-simulation-threejs)
  - [3.12 Real-Time Telemetry HUD & Circular Radar Mini-Map](#312-real-time-telemetry-hud--circular-radar-mini-map)
  - [3.13 Procedural Web Audio Soundscape & FX Synthesizer](#313-procedural-web-audio-soundscape--fx-synthesizer)
  - [3.14 Booking, Inquiries & Lead Reference Number Generator](#314-booking-inquiries--lead-reference-number-generator)
- [4. Detailed Catalog of 7 Prime Billboard Sites](#4-detailed-catalog-of-7-prime-billboard-sites)
- [5. Atmospheric Lighting Modes Specification](#5-atmospheric-lighting-modes-specification)
- [6. Directory & Codebase Structure](#6-directory--codebase-structure)
- [7. Installation & Local Development](#7-installation--local-development)
- [8. Build & Production Deployment](#8-build--production-deployment)
- [9. Performance Optimizations & Troubleshooting](#9-performance-optimizations--troubleshooting)

---

## 1. Executive Overview

**AURA VISTA** is an enterprise-grade 3D Out-of-Home (OOH) digital twin application engineered for media agencies, brand directors, outdoor advertisers, and media buyers.

Traditional billboard buying relies on static pitch decks, flat mockups, and disjointed traffic statistics. **AURA VISTA replaces traditional mockups with a live, photorealistic 3D virtual environment**:
1. **Fly dynamically** from satellite altitude down into urban street canyons.
2. **Inspect physical and digital LED billboards** from true driver and pedestrian sightlines.
3. **Simulate real-world conditions** such as blazing noon sun, golden-hour sunset, neon cyber nighttime, and moody rainstorms.
4. **Experience animated screen water accumulation** with procedural ripples and chromatic refraction on the billboard glass.
5. **Drag and drop live brand artwork or video commercials** onto any display board with instantaneous perspective scaling and luminance mapping.
6. **Book inventory and request quotes** with verified daily impression metrics and automated reference dispatch.

---

## 2. System Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                              AURA VISTA                                │
├──────────────────────────────────┬─────────────────────────────────────┤
│  Geospatial Digital Twin Engine  │   Procedural 3D Virtual City Engine │
│  (MapLibre GL v6 + Three.js)     │   (Three.js r186 + React 19)        │
├──────────────────────────────────┼─────────────────────────────────────┤
│ • 3D Terrain Pitch & Bearing     │ • Procedural Skyscraper Geometries  │
│ • Stratosphere Orbital Flight    │ • Dynamic Multi-Lane Vehicle Flow   │
│ • Real GPS Coordinate Plotting   │ • Day/Night Sun & Sky Interpolation │
│ • 360° Spherical Panoramic Mesh  │ • Billboard Mesh Target Beacons     │
│ • Custom GLSL Rain Ripple Shader │ • Orbit Camera Yaw/Pitch/Zoom       │
├──────────────────────────────────┴─────────────────────────────────────┤
│                           Shared Core Modules                          │
├────────────────────────────────────────────────────────────────────────┤
│ • Web Audio API Synthesizer (Atmospheric Jet Hum, Servo & Click FX)    │
│ • Ad Creative Studio (Live Image/Video Ingestion & Aspect Fit)         │
│ • Interactive Telemetry HUD & Circular Radar Compass                   │
│ • Booking Inquiries & Automated Reference Code Dispatch Engine         │
└────────────────────────────────────────────────────────────────────────┘
```

### Technology Highlights
- **Vite 8.3 & React 19**: Lightning-fast compilation, native ES modules, and instantaneous hot reloads.
- **Three.js r186**: Modern WebGL rendering engine utilizing `performance.now()` precision timing, procedural geometries, and custom GLSL shader hooks via `onBeforeCompile`.
- **MapLibre GL v6.11**: High-performance vector tile and satellite map rendering with 3D camera pitch, bearing control, and custom HTML marker elements.
- **GSAP (GreenSock Animation Platform) v3.15**: Smooth, bezier-curved camera transitions, atmospheric fade ramps, and micro-interactions.
- **Tailwind CSS v4.3**: Ultra-clean styling system without messy stylesheets or inline layout hacks.
- **Lucide React Icons**: Cohesive iconography across telemetry, controls, and media drawer panels.
- **Web Audio API**: 100% procedural sound synthesis engine generating audio without external MP3/WAV dependencies.

---

## 3. Core Feature Breakdown (Feature-by-Feature)

### 3.1 High-Altitude Stratosphere to Street Cinematic Flight
- **Initial Orbit**: The application launches in a high-stratosphere orbital camera state (Zoom: 11.2, Pitch: 68°, Bearing: -15°, Altitude: ~38,000m) over the metropolis.
- **Cinematic Letterbox**: Top and bottom cinematic black letterbox bars (`#letterbox-top`, `#letterbox-bottom`) frame the viewport.
- **HUD Reticle & Telemetry Readouts**: Live coordinates, altitude counter, and local time ticker animate in real-time.
- **Smooth Descent**: Clicking **"INITIALIZE DESCENT"** triggers a multi-stage bezier camera swoop down through the cloud deck straight to the flagship billboard location on Shahrah-e-Faisal.
- **Replay & Skip Options**: Users can skip the intro anytime or replay the stratosphere swoop using the top HUD replay icon.

### 3.2 3D Geospatial Satellite Flight Navigation (MapLibre GL)
- **Real-World Coordinate Accuracy**: Every billboard is pinned to precise latitude/longitude coordinates on actual arterial roadways.
- **3D Camera Articulation**: Map camera supports up to 75° pitch, 360° bearing rotation, smooth zooming, and high-DPI antialiased rendering.
- **Pulsating Radar Markers**: Interactive billboard beacons with outer radar pulse rings, numerical site codes (`01` through `07`), and hover preview badges.
- **Interactive Map Controls**: Full compass rose with pitch tilt visualization and smooth pan/zoom gesture handling.

### 3.3 7 Real Landmark Billboard Sites (GPS & Demographics)
The system catalogs 7 prime Out-of-Home sites across Karachi's busiest economic corridors:
1. `01` **Shahrah-e-Faisal Grand Digital** (Digital LED · 4K Display)
2. `02` **Clifton Coastal Mega Rooftop** (Illuminated Static Mega Board)
3. `03` **I.I. Chundrigar Financial Monolith** (Dual-Sided Digital Totem)
4. `04` **Gulshan Expo Interchange Arch** (Curved LED Gateway Arch)
5. `05` **DHA Phase 6 Commercial Avenue** (Front-Lit Premium Monolith)
6. `06` **Seaview Marine Drive Digital Gantry** (Solar-Assisted 4K Gantry)
7. `07` **Karsaz Flyover Arterial Horizon** (Dual Mega Unipole)

*(See [Section 4](#4-detailed-catalog-of-7-prime-billboard-sites) for full metrics and demographic details).*

### 3.4 In-Situ Street-Level View & 4K Photography Frame
- Clicking any billboard smoothly activates the **Media Inspection Panel** (`#media-panel`), presenting high-resolution in-situ photography.
- Accurately captures the surrounding architecture, overhead street lamps, road pavement, and flyover structures.
- Supports instant switching between sites via next/previous buttons or the bottom filmstrip carousel.

### 3.5 360° Spherical Panoramic Virtual Environment
- **True 360° Street View**: Switching to the **`360° VIEW`** tab engages a Three.js spherical geometry (`THREE.SphereGeometry(500, 60, 40)`) mapped with high-resolution equirectangular panorama textures.
- **Drag-to-Look Orbit**: Full mouse and touch drag navigation allowing advertisers to look up at the billboard, pan across oncoming traffic, and inspect surrounding commercial landmarks.
- **Smooth Inertia**: Damped camera rotation provides smooth viewing with no jarring snaps.

### 3.6 In-Situ Live Video Playback & Sound Simulator
- **Digital Motion Commercials**: The **`LIVE VIDEO`** tab switches the billboard face from static print to an active 60fps digital video loop.
- **Custom Player Controls**: Floating glass control bar featuring Play/Pause, Mute/Unmute, and status indicators.
- **Realistic Glare & Frame Integration**: Video maintains realistic perspective cropping within the physical billboard frame.

### 3.7 Real-Time Atmosphere & Photorealistic Lighting Simulation
Advertisers can toggle 4 distinct atmospheric and solar illumination states with one click:
- ☀️ **Daylight (`day`)**: 12:00 PM high sun angle with crisp 6500K daylight, clean ambient exposure, and balanced screen luminance.
- 🌅 **Golden Hour Sunset (`sunset`)**: 6:30 PM low-horizon solar elevation, warm amber 3200K grading, warm backlight, and dusk bloom.
- 🌃 **Neon Cyber Night (`neon`)**: 11:00 PM dark ambient street canyon, intense LED digital screen bloom, vibrant emissive neon reflections, and high-contrast night grading.
- 🌧️ **Moody Rain (`rain`)**: 9:00 PM overcast rainstorm with cool blue-grey desaturation, glossy asphalt reflections, rain mist haze, and animated billboard screen water ripples.

### 3.8 GLSL Billboard Screen Water Accumulation & Ripple Shader
When **Moody Rain** is selected, a custom WebGL/Three.js GLSL fragment shader overlays the digital billboard face:
- **Procedural Rain Ripples**: Calculates expanding concentric wave rings with realistic sinusoidal decay across pseudo-random droplet impact coordinates.
- **Vertical Water Rivulets**: Gravity-driven downward trickles and moisture streaks running down the digital glass surface.
- **Specular Refraction & Chromatic Fringe**: Water droplets reflect LED highlights with realistic emerald/cyan refraction typical of wet digital displays.
- **Smooth Interpolation**: GSAP smoothly fades the ripple intensity in and out when toggling atmospheric modes.

### 3.9 Sightline Distance Simulator (Close, Medium, Far)
Simulates the human visual perception and scale of the advertisement from 3 critical distances:
- 📍 **Close (15m)**: Near sightline simulating pedestrians waiting at pedestrian crossings or front-row vehicle queue.
- 📍 **Medium (45m)**: Standard driver approach zone simulating signal stop lines and vehicle deceleration lanes.
- 📍 **Far (120m)**: Extended highway sightline simulating high-speed approach from 100+ meters down the arterial corridor.

### 3.10 Interactive Campaign Studio & Instant Creative Upload
- **Pre-Loaded Brand Campaigns**: Includes 5 ready-to-test brand creatives:
  - 🏎️ *Hyperion EV6 Electric Supercar* (Automotive)
  - ⌚ *Vanguard Horizon Chronograph* (Luxury Watchmaking)
  - ⚡ *Volt Neon Ultra Energy* (Beverage & Lifestyle)
  - 👗 *Aura Minimalist Autumn Haute Couture* (Fashion)
  - 🤖 *Omni Neural Quantum Computing* (Technology)
- **Live User Upload**: Advertisers can click **"UPLOAD AD"** and upload any `.png`, `.jpg`, or `.webp` file from their local machine.
- **Instant Texture Update**: The custom artwork is instantly projected onto the physical billboard face in both 2D in-situ view and 3D virtual city meshes!

### 3.11 3D Procedural Metropolis & Traffic Simulation (Three.js)
In the interactive 3D virtual city mode:
- **Procedural Architecture**: Generates dozens of varied skyscraper meshes with multi-tiered geometries, metallic façade materials, rooftop communication masts, and emissive window grids.
- **Dynamic Vehicle Flow**: Procedurally spawns vehicles traveling both directions along multi-lane central avenues, complete with illuminated forward headlights and red rear taillights.
- **Rotational Billboard Beacons**: Each billboard site is equipped with an animated targeting beacon ring that scales and pulses when selected or hovered.
- **Smooth Day/Night Lighting Ramp**: Toggling the Day/Night switch triggers a smooth interpolation of directional sun color, sky background, and building material emissive intensity.

### 3.12 Real-Time Telemetry HUD & Circular Radar Mini-Map
- **Circular Radar Scanner**: Bottom-left radar display showing compass orientation, vehicle heading, and glowing green blips representing the active billboard sites.
- **Telemetry HUD**: Displays live GPS coordinates, altitude above ground level, camera pitch, bearing, and carrier satellite signal status.
- **Sites Filmstrip**: Bottom carousel showcasing all 7 sites with instant fly-to triggers and thumbnail previews.

### 3.13 Procedural Web Audio Soundscape & FX Synthesizer
Built with the HTML5 **Web Audio API** (`AudioContext`), requiring zero external audio assets:
- **Sub-Bass Drone**: Low-frequency oscillator simulating ambient city hum and jet engine reverberation.
- **UI Affirmation Chirps**: High-frequency dual-sine arpeggios on button clicks and site selections.
- **Atmospheric Transition Sweeps**: White-noise frequency sweeps when shifting between Daylight, Sunset, Neon Night, and Rain.
- **Global Audio Mute Toggle**: Header sound button allows users to toggle audio effects at any moment.

### 3.14 Booking, Inquiries & Lead Reference Number Generator
- Clicking **"RESERVE SITE"** opens the **Quick Booking Drawer** with real-time site specs, rates, and audience estimates.
- Captures company name, contact email, intended flight start date, and campaign notes.
- Upon dispatch, automatically generates a verified inquiry tracking reference code (e.g., `#AV-8924`) and displays a confirmation toast.

---

## 4. Detailed Catalog of 7 Prime Billboard Sites

| Site Code | Name | District & Location | Format | Daily Traffic | Sightline | Dwell Time | Weekly Rate |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **01** | **Shahrah-e-Faisal Grand Digital** | Nursery Junction Arterial Corridor | Digital LED · 4K Display (48 × 14 ft) | 142,000+ | 380m | 85s | **$4,800** |
| **02** | **Clifton Coastal Mega Rooftop** | Do Talwar / Clifton Block 4 Commercial | Mega Rooftop · Illuminated (60 × 20 ft) | 195,000+ | 450m | 70s | **$6,200** |
| **03** | **I.I. Chundrigar Financial Monolith** | Central Banking & Stock Exchange Hub | Double-Sided Digital Totem (36 × 12 ft) | 118,000+ | 280m | 95s | **$4,100** |
| **04** | **Gulshan Expo Interchange Arch** | NIPA / Expo Centre Arterial Crossing | Curved Overhead Arch LED (52 × 16 ft) | 165,000+ | 520m | 110s | **$5,500** |
| **05** | **DHA Phase 6 Commercial Avenue** | Khayaban-e-Shahbaz Executive Sector | Front-Lit Mega Billboard (40 × 15 ft) | 92,000+ | 310m | 60s | **$3,600** |
| **06** | **Seaview Marine Drive Digital Gantry** | Clifton Beach Coastal Promenade | Solar 4K Digital Gantry (50 × 14 ft) | 134,000+ | 600m | 45s | **$4,900** |
| **07** | **Karsaz Flyover Arterial Horizon** | Airport Executive Expressway Concourse | Dual Facing Mega Unipole (45 × 18 ft) | 188,000+ | 650m | 75s | **$5,900** |

---

## 5. Atmospheric Lighting Modes Specification

```
Mode: DAYLIGHT [☀️ 12:00 PM]
├── Sun Elevation: 65° High Zenith
├── Color Temperature: 6,500 Kelvin (Crisp White)
├── Image Post-Filter: Brightness 1.08 | Contrast 1.04 | Saturation 1.05
└── Display Appearance: High ambient wash with anti-glare matte reflection

Mode: GOLDEN HOUR [🌅 06:30 PM]
├── Sun Elevation: 8° Low Horizon
├── Color Temperature: 3,200 Kelvin (Warm Amber Glow)
├── Image Post-Filter: Brightness 1.05 | Contrast 1.12 | Saturation 1.25 | Sepia 0.20 | Hue -8°
└── Display Appearance: Warm sunset rim lighting and long ground shadows

Mode: NEON CYBER NIGHT [🌃 11:00 PM]
├── Sun Elevation: Below Horizon (Night Ambiance)
├── Color Temperature: Deep Indigo & Cyan Skylight
├── Image Post-Filter: Brightness 0.96 | Contrast 1.24 | Saturation 1.35 | Hue 5°
└── Display Appearance: High-luminance LED glow (7,500 nits) with emissive bloom

Mode: MOODY RAIN [🌧️ 09:00 PM]
├── Sun Elevation: Overcast Cloud Deck
├── Color Temperature: 5,400 Kelvin (Muted Steel Slate)
├── Image Post-Filter: Brightness 0.88 | Contrast 1.15 | Saturation 0.85 | Hue 188°
└── Display Appearance: Animated GLSL water ripples, falling droplets, and wet glass sheen
```

---

## 6. Directory & Codebase Structure

```
├── index.html                    # High-altitude flight, MapLibre GL 3D satellite, in-situ viewer, GLSL ripple shader
├── vite.config.ts                # Vite config (Tailwind v4, React plugin, optimizeDeps exclusion for maplibre-gl)
├── metadata.json                 # AI Studio applet specifications & major capabilities
├── package.json                  # Dependencies (Three.js, MapLibre, React 19, GSAP, Tailwind v4)
├── tsconfig.json                 # TypeScript strict compiler configuration
│
├── src/
│   ├── App.tsx                   # Main React entry point with 3D virtual metropolis & interactive sections
│   ├── main.tsx                  # React 19 DOM root mounting
│   ├── index.css                 # Global CSS rules with Tailwind v4 `@import "tailwindcss"`
│   │
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CityCanvas.tsx    # Three.js animation loop, orbit camera controls, beacon animations, day/night transitions
│   │   │   └── cityBuilder.ts    # Procedural city building generator, road markings, traffic cars, custom screen shaders
│   │   │
│   │   └── ui/
│   │       ├── Navbar.tsx                # Brand header with audio toggle, Day/Night toggle, and quick CTAs
│   │       ├── HeroOverlay.tsx           # Floating hero HUD with metrics, live time ticker, and explore buttons
│   │       ├── BillboardDrawer.tsx       # Detailed site inspection drawer with specs, impressions, and booking form
│   │       ├── AdStudioModal.tsx         # Creative upload studio with preset campaigns and batch broadcast
│   │       ├── QuoteModal.tsx            # Full proposal and quotation request modal
│   │       ├── LocationsSection.tsx      # Comprehensive site gallery filterable by format, district, and impressions
│   │       ├── CampaignShowcaseSection.tsx # Interactive brand campaign showcase carousel
│   │       ├── WhyAdvertiseSection.tsx   # OOH ROI, dwell times, and 4K digital advantages breakdown
│   │       └── Footer.tsx                # Enterprise footer with network coverage and contact details
│   │
│   ├── data/
│   │   ├── billboards.ts         # Complete metadata for all 7 billboard locations
│   │   └── campaigns.ts          # Ready-to-deploy sample campaign creatives
│   │
│   ├── types/
│   │   └── billboard.ts          # TypeScript interfaces for Billboard, Campaign, and Filter criteria
│   │
│   └── utils/
│       └── audio.ts              # Web Audio API sound synthesis engine for UI soundscapes
```

---

## 7. Installation & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### Step 3: Verify TypeScript Code Quality
```bash
npm run lint
```

---

## 8. Build & Production Deployment

To generate an optimized production bundle:
```bash
npm run build
```

This compiles all TypeScript files, bundles MapLibre GL, Three.js shaders, and Tailwind CSS into the optimized `/dist` directory ready for deployment on any static host, CDN, or containerized service.

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 9. Performance Optimizations & Troubleshooting

### Optimization Highlights
1. **MapLibre Worker Optimization**: `maplibre-gl` is explicitly configured in `vite.config.ts` under `optimizeDeps.exclude` to ensure the MapLibre background web worker loads cleanly without bundling issues.
2. **Modern Three.js Timing**: Removed deprecated `THREE.Clock` in favor of high-precision `performance.now()` deltas clamped to 0.1s max to eliminate frame skips.
3. **Hardware Acceleration**: All 3D canvases, HUD radar elements, and video containers utilize CSS `will-change: transform` and hardware-accelerated WebGL viewports.
4. **Procedural Web Audio**: Zero external audio files reduces initial bundle size and provides instant response times with no network latency.

---

*Engineered with precision for next-generation Out-of-Home advertising networks.*
