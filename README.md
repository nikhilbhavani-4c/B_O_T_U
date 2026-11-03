# ⚡ B.O.T.U. – Bhains of the Universe | Multi-Page Quantum Recharge Station
## Critical Update: Perfect Viewport Fit & Zero Scrollbar Design

An elite, multi-page, interactive, and mobile-responsive static web experience designed for live event activities featuring **B.O.T.U.** (**Bhains of the Universe**).

---

## 🎯 6-Page Futuristic Architecture

Each page is an independent, dedicated HTML document designed with **strict zero-scrollbar viewport fit** across all devices (320px mobile to 4K desktop displays):

1. **`index.html`** – **Welcome & Mandatory Sound Activation**
   - Animated B.O.T.U. mecha hovering in standby mode with levitation exhaust flame.
   - Glowing Arc Reactor energy core and ambient audio oscilloscope HUD.
   - Prominent **ALLOW SOUND & START EXPERIENCE** button.
   - Unlocks Web Audio API and smoothly transitions into the recharge sequence.

2. **`identity-verification.html`** – **Biometric Clearance Gateway**
   - High-tech biometric reticle with rotating concentric cyber rings.
   - Animated scanning laser sweep bar across neural signature.
   - Real-time authentication progress (0% → 100%) with telemetry chirp audio.
   - Clearance status confirmation and **CONTINUE TO TOKEN SCAN** navigation.

3. **`token-detection.html`** – **Quantum Token Receptacle**
   - Floating 3D holographic token coin with orbiting gyro rings.
   - Embossed B.O.T.U. crest horn insignia with pulsing runes.
   - Token authentication telemetry: 500 Mega-Cores, 99.98% Harmonic Lock.
   - **CONTINUE TO REACTOR PREP** navigation.

4. **`energy-preparation.html`** – **Reactor Spool & Containment Priming**
   - Counter-rotating plasma containment rings with central fusion orb.
   - Canvas electric spark emitters with real-time chamber temperature and flux monitoring.
   - Rising reactor whine audio synthesizer as excitation reaches 100%.
   - **INITIATE TOKEN TRANSFER** navigation.

5. **`token-loading.html`** – **Quantum Plasma Injection into B.O.T.U.**
   - Complete B.O.T.U. vector robot illustration.
   - Upper emitter channeling high-energy plasma laser stream into the chest core.
   - Dual-oscillator rising charging hum climbing from 110Hz to 520Hz.
   - Real-time voltage (12.4V → 480V), core flux (18% → 100%), and capacity (0.1 → 25 kW/h) telemetry.
   - 100% full-screen flash impact, shockwave discharge, sonic boom, and celebratory fanfare.
   - **COMPLETE RECHARGE** navigation.

6. **`congratulations.html`** – **Full System Restoration & Victory Fanfare**
   - Fully restored B.O.T.U. in maximum cosmic brilliance (eyes gleaming, horns glowing, gyro core spinning).
   - Real-time 360° cyber confetti and celebration particle explosion.
   - Official mission gratitude briefing from Cosmic Fleet Command.
   - **⚡ RECHARGE AGAIN** button to seamlessly replay the sequence.

---

## 📱 Zero Scrollbar & Viewport-Fit Technology

- **Dynamic Viewport Units**: Implements `100dvh` combined with `overscroll-behavior: none` and `overflow: hidden`.
- **Flex-Shrink Protection**: Headers, progress indicators, and action buttons are locked with `flex-shrink: 0`.
- **Adaptive Illustration Stage**: The visual illustration area uses `flex: 1 1 0; min-height: 0; min-width: 0;`, allowing SVGs to scale automatically to fill available screen height without pushing content out of view.
- **Responsive Typography**: All headings, telemetry, and buttons use mathematical `clamp()` functions.
- **Landscape & Small Device Media Queries**: Built-in layout tightening for compact screens (320px width, 568px height) and landscape orientations.

---

## 📁 Project Structure

```text
BOTU/
├── index.html                   # Page 01: Welcome & Sound Activation
├── identity-verification.html   # Page 02: Biometric Clearance Gateway
├── token-detection.html         # Page 03: Holographic Token Detection
├── energy-preparation.html      # Page 04: Reactor Spool & Plasma Chamber
├── token-loading.html           # Page 05: Quantum Energy Injection & Shockwave
├── congratulations.html         # Page 06: Full Restoration & Confetti Celebration
├── style.css                    # Unified Cyberpunk Stylesheet & Viewport Fit
├── botu-core.js                 # Web Audio API Synthesizer, Nav & Particles
└── README.md                    # System architecture and documentation
```

---

## 🛠️ Testing & Live Deployment

- **Local Preview**: Open [`index.html`](file:///c:/Users/nikhil.bhavani/Downloads/_Delete/BOTU/index.html) in your browser.
- **Automated Validation**: Open the browser Developer Console on any page to inspect the automated overflow check (`window.BOTU.checkOverflow()`), which verifies `horizontalOverflow: false` and `verticalOverflow: false`.
