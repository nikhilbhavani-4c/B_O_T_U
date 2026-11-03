/**
 * B.O.T.U. (Bhains of the Universe) - Quantum Token Recharge Experience
 * High-Loudness Web Audio API Synthesizer, Canvas Particle Engine & Modal Controller
 */

// ===================================================================
// 1. High-Loudness Web Audio API Sound Synthesizer
// ===================================================================
class LoudSoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isInitialized = false;
    this.masterGain = null;
    this.compressor = null;
    this.chargingHumOsc1 = null;
    this.chargingHumOsc2 = null;
    this.chargingHumGain = null;
    this.chargingFilter = null;
    this.isChargingSoundActive = false;
  }

  init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        console.warn('Web Audio API not supported.');
        return;
      }
      this.ctx = new AudioCtx();

      // Multi-stage loudness maximization: Compressor with fast response
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(10, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.1, this.ctx.currentTime);

      // Maximum Master Gain for Loud Event Sound Output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext initialization error:', e);
    }
  }

  ensureContext() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Deep Futuristic System Boot Chime
  playBootSound() {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(55, now);
    subOsc.frequency.exponentialRampToValueAtTime(180, now + 0.65);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(180, now);
    subFilter.frequency.exponentialRampToValueAtTime(380, now + 0.65);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.9, now + 0.12);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(now);
    subOsc.stop(now + 0.9);

    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.5, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.65);
    });
  }

  // High-Tech Telemetry Chirps
  playBlip(freq = 920, duration = 0.065, type = 'sine') {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + duration);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.015);
  }

  // Dual-Oscillator High-Energy Charging Hum
  startChargingHum() {
    this.ensureContext();
    if (!this.ctx) return;
    this.stopChargingHum();

    const now = this.ctx.currentTime;
    this.isChargingSoundActive = true;

    this.chargingHumOsc1 = this.ctx.createOscillator();
    this.chargingHumOsc1.type = 'sawtooth';
    this.chargingHumOsc1.frequency.setValueAtTime(110, now);

    this.chargingHumOsc2 = this.ctx.createOscillator();
    this.chargingHumOsc2.type = 'triangle';
    this.chargingHumOsc2.frequency.setValueAtTime(112.5, now);

    this.chargingFilter = this.ctx.createBiquadFilter();
    this.chargingFilter.type = 'bandpass';
    this.chargingFilter.frequency.setValueAtTime(320, now);
    this.chargingFilter.Q.setValueAtTime(4.2, now);

    this.chargingHumGain = this.ctx.createGain();
    this.chargingHumGain.gain.setValueAtTime(0.001, now);
    this.chargingHumGain.linearRampToValueAtTime(0.65, now + 0.25);

    this.chargingHumOsc1.connect(this.chargingFilter);
    this.chargingHumOsc2.connect(this.chargingFilter);
    this.chargingFilter.connect(this.chargingHumGain);
    this.chargingHumGain.connect(this.masterGain);

    this.chargingHumOsc1.start(now);
    this.chargingHumOsc2.start(now);
  }

  updateChargingHum(progressRatio) {
    if (!this.isChargingSoundActive || !this.ctx || !this.chargingHumOsc1) return;
    const now = this.ctx.currentTime;
    const targetFreq = 110 + progressRatio * 410;
    const filterFreq = 320 + progressRatio * 1100;

    this.chargingHumOsc1.frequency.setTargetAtTime(targetFreq, now, 0.04);
    this.chargingHumOsc2.frequency.setTargetAtTime(targetFreq * 1.015, now, 0.04);
    this.chargingFilter.frequency.setTargetAtTime(filterFreq, now, 0.04);
  }

  stopChargingHum() {
    this.isChargingSoundActive = false;
    if (this.chargingHumGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.chargingHumGain.gain.cancelScheduledValues(now);
      this.chargingHumGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
      setTimeout(() => {
        if (this.chargingHumOsc1) {
          try {
            this.chargingHumOsc1.stop();
            this.chargingHumOsc1.disconnect();
          } catch (e) {}
          this.chargingHumOsc1 = null;
        }
        if (this.chargingHumOsc2) {
          try {
            this.chargingHumOsc2.stop();
            this.chargingHumOsc2.disconnect();
          } catch (e) {}
          this.chargingHumOsc2 = null;
        }
      }, 140);
    }
  }

  // Loud Electrical Spark Crackle
  playSparkCrackle() {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.045;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1600, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  // Massive Energy Burst Sonic Boom & Shockwave
  playCompletionSound() {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.75);

    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.9);

    const laserOsc = this.ctx.createOscillator();
    const laserFilter = this.ctx.createBiquadFilter();
    const laserGain = this.ctx.createGain();

    laserOsc.type = 'sawtooth';
    laserOsc.frequency.setValueAtTime(260, now);
    laserOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.22);
    laserOsc.frequency.exponentialRampToValueAtTime(500, now + 0.65);

    laserFilter.type = 'lowpass';
    laserFilter.frequency.setValueAtTime(350, now);
    laserFilter.frequency.exponentialRampToValueAtTime(3600, now + 0.22);
    laserFilter.frequency.exponentialRampToValueAtTime(250, now + 0.7);

    laserGain.gain.setValueAtTime(0.85, now);
    laserGain.gain.exponentialRampToValueAtTime(0.001, now + 0.72);

    laserOsc.connect(laserFilter);
    laserFilter.connect(laserGain);
    laserGain.connect(this.masterGain);

    laserOsc.start(now);
    laserOsc.stop(now + 0.75);
  }

  // Cosmic Victory Arpeggio Fanfare
  playCelebrationFanfare() {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];

    chord.forEach((note, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + 0.12 + i * 0.075;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.7, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.85);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.9);
    });

    setTimeout(() => {
      if (!this.ctx) return;
      const resNow = this.ctx.currentTime;
      [1046.5, 1318.51, 1567.98].forEach(f => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, resNow);
        gain.gain.setValueAtTime(0.5, resNow);
        gain.gain.exponentialRampToValueAtTime(0.0001, resNow + 1.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(resNow);
        osc.stop(resNow + 1.4);
      });
    }, 550);
  }
}

// ===================================================================
// 2. High-Performance Particle Engine (Sparks & Confetti)
// ===================================================================
class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.confetti = [];
    this.isRunning = false;
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.render);
    }
  }

  stop() {
    this.isRunning = false;
    this.particles = [];
    this.confetti = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  emitChargingSparks(targetX, targetY) {
    if (this.particles.length > 95) return;
    const colors = ['#00f0ff', '#38bdf8', '#c084fc', '#ffffff'];
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 110;
      this.particles.push({
        x: targetX + Math.cos(angle) * distance,
        y: targetY - 120 + Math.sin(angle) * (distance * 0.5),
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 2.2 + Math.random() * 3.2,
        size: 1.6 + Math.random() * 2.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.022 + Math.random() * 0.03
      });
    }
  }

  explode(centerX, centerY) {
    const colors = ['#00f0ff', '#0077ff', '#9d4edd', '#ff0055', '#00f59b', '#ffb703', '#ffffff'];
    const count = 130;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4.5 + Math.random() * 15;
      this.confetti.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.2,
        gravity: 0.2,
        drag: 0.965,
        size: 3.5 + Math.random() * 6.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        life: 1,
        decay: 0.007 + Math.random() * 0.012
      });
    }
  }

  render() {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      p.x += dx * 0.085 + p.vx;
      p.y += dy * 0.085 + p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.vx *= c.drag;
      c.vy = c.vy * c.drag + c.gravity;
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += c.vRot;
      c.life -= c.decay;

      if (c.life <= 0) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = c.life;
      this.ctx.fillStyle = c.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = c.color;
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate(c.rotation);

      if (c.shape === 'rect') {
        this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.6);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    requestAnimationFrame(this.render);
  }
}

// ===================================================================
// 3. Main Experience Controller (Single-Screen + Popup Modal)
// ===================================================================
class BotuMasterExperience {
  constructor() {
    this.sound = new LoudSoundSynthesizer();
    this.particleEngine = null;

    // DOM Elements
    this.bootTerminal = document.getElementById('boot-terminal-overlay');
    this.bootLogs = document.querySelectorAll('.log-item');
    this.bootFill = document.getElementById('boot-bar-fill');
    this.robotStage = document.getElementById('robot-stage');
    this.energyBeam = document.getElementById('energy-beam');
    this.energyPercent = document.getElementById('energy-percent');
    this.progressFill = document.getElementById('progress-fill');
    this.shockwaveRing = document.getElementById('shockwave-ring');
    this.screenFlash = document.getElementById('screen-flash');
    this.hudStatus = document.getElementById('hud-status-text');
    this.hudDot = document.getElementById('hud-dot');

    // Popup Modal Elements
    this.modalOverlay = document.getElementById('congrats-modal-overlay');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.rechargeAgainBtn = document.getElementById('recharge-again-btn');

    // Telemetry Elements
    this.statVoltage = document.getElementById('stat-voltage');
    this.statFlux = document.getElementById('stat-flux');
    this.statCapacity = document.getElementById('stat-capacity');

    // Robot Elements
    this.robotEyes = document.querySelectorAll('.robot-visor-eye');
    this.robotCoreGlow = document.getElementById('robot-core-glow');
    this.mechaHorns = document.querySelectorAll('.mecha-horn');

    // Visualizer Bars
    this.oscBars = document.querySelectorAll('.osc-bar');

    // State
    this.isRecharging = false;
    this.currentPercent = 0;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
      this.particleEngine = new ParticleEngine(canvas);
      this.particleEngine.start();
    }

    // Auto-start Sound on first gesture / touch / scroll if browser blocked immediate autoplay
    const unlockAndSyncAudio = () => {
      this.sound.ensureContext();
      if (this.isRecharging && !this.sound.isChargingSoundActive) {
        this.sound.startChargingHum();
      }
      window.removeEventListener('pointerdown', unlockAndSyncAudio);
      window.removeEventListener('touchstart', unlockAndSyncAudio);
      window.removeEventListener('keydown', unlockAndSyncAudio);
    };

    window.addEventListener('pointerdown', unlockAndSyncAudio, { passive: true });
    window.addEventListener('touchstart', unlockAndSyncAudio, { passive: true });
    window.addEventListener('keydown', unlockAndSyncAudio, { passive: true });

    // Interactive 3D Parallax Tilt for Desktop
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      if (this.robotStage) {
        this.robotStage.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    });

    // Modal Close Button
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.modalOverlay.classList.remove('active');
      });
    }

    // Modal Backdrop Click Dismiss
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.modalOverlay.classList.remove('active');
        }
      });
    }

    // Replay Button
    this.rechargeAgainBtn.addEventListener('click', () => {
      this.modalOverlay.classList.remove('active');
      setTimeout(() => {
        this.restart();
      }, 250);
    });

    this.startOscilloscopeWave();
    this.startBootSequence();
  }

  startOscilloscopeWave() {
    setInterval(() => {
      const active = this.isRecharging || !this.bootTerminal || !this.bootTerminal.classList.contains('hidden');
      this.oscBars.forEach(bar => {
        const h = active ? Math.floor(3 + Math.random() * 10) : 3;
        bar.style.height = `${h}px`;
      });
    }, 90);
  }

  // Phase 1: Boot Terminal Simulation
  startBootSequence() {
    this.hudStatus.textContent = 'SYSTEM: BOOTING...';
    this.hudDot.classList.remove('online');

    this.bootLogs.forEach(log => {
      log.classList.remove('active', 'success');
    });
    this.bootFill.style.width = '0%';
    this.bootTerminal.classList.remove('hidden');
    this.energyBeam.classList.remove('active');
    if (this.modalOverlay) this.modalOverlay.classList.remove('active');

    // Auto-trigger Boot Chime
    this.sound.ensureContext();
    this.sound.playBootSound();

    const steps = [
      { delay: 350, logIdx: 0, progress: 25, freq: 880 },
      { delay: 950, logIdx: 1, progress: 50, freq: 1080 },
      { delay: 1550, logIdx: 2, progress: 75, freq: 1250 },
      { delay: 2150, logIdx: 3, progress: 100, freq: 1450 }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        if (this.bootLogs[step.logIdx]) {
          this.bootLogs[step.logIdx].classList.add('active', 'success');
        }
        this.bootFill.style.width = `${step.progress}%`;
        this.sound.playBlip(step.freq, 0.06);
      }, step.delay);
    });

    setTimeout(() => {
      this.transitionToRecharge();
    }, 2800);
  }

  // Phase 2: Quantum Token Recharge Sequence
  transitionToRecharge() {
    this.bootTerminal.classList.add('hidden');

    this.hudStatus.textContent = 'RECHARGING B.O.T.U.';
    this.energyBeam.classList.add('active');

    // Auto-start Continuous High-Volume Charging Sound
    this.sound.ensureContext();
    this.sound.startChargingHum();

    this.isRecharging = true;
    this.currentPercent = 0;
    const startTime = performance.now();
    const duration = 4800; // 4.8 seconds

    const robotCoreBounds = () => {
      const core = document.querySelector('.robot-core-outer');
      if (core) {
        const rect = core.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };

    let lastSparkTime = 0;

    const animateRecharge = (currentTime) => {
      if (!this.isRecharging) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = Math.sin((progress * Math.PI) / 2);
      this.currentPercent = Math.floor(eased * 100);

      this.energyPercent.textContent = this.currentPercent;
      this.progressFill.style.width = `${this.currentPercent}%`;

      this.sound.updateChargingHum(eased);

      if (currentTime - lastSparkTime > 110 && progress < 0.98) {
        lastSparkTime = currentTime;
        const target = robotCoreBounds();
        if (this.particleEngine) {
          this.particleEngine.emitChargingSparks(target.x, target.y);
        }
        if (Math.random() > 0.35) {
          this.sound.playSparkCrackle();
        }
      }

      // Live Telemetry
      const voltageVal = (12.4 + eased * 467.6).toFixed(1);
      const fluxVal = Math.floor(18 + eased * 81.9);
      const capVal = (0.1 + eased * 24.9).toFixed(1);

      if (this.statVoltage) this.statVoltage.textContent = `${voltageVal} V`;
      if (this.statFlux) this.statFlux.textContent = `${fluxVal}%`;
      if (this.statCapacity) this.statCapacity.textContent = `${capVal} kW/h`;

      // Glowing Aura & Eye Brightness Increase
      const glowIntensity = 8 + eased * 24;
      this.robotEyes.forEach(eye => {
        eye.style.filter = `drop-shadow(0 0 ${glowIntensity}px #00f0ff)`;
      });
      if (this.robotCoreGlow) {
        this.robotCoreGlow.style.opacity = `${0.45 + eased * 0.55}`;
      }
      this.mechaHorns.forEach(horn => {
        horn.style.filter = `drop-shadow(0 0 ${6 + eased * 14}px #00f0ff)`;
      });

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animateRecharge);
      } else {
        this.completeRecharge();
      }
    };

    this.animationFrameId = requestAnimationFrame(animateRecharge);
  }

  // Phase 3: 100% Full Energy & Popup Modal Trigger
  completeRecharge() {
    this.isRecharging = false;
    this.currentPercent = 100;
    this.energyPercent.textContent = '100';
    this.progressFill.style.width = '100%';

    if (this.statVoltage) this.statVoltage.textContent = '480.0 V';
    if (this.statFlux) this.statFlux.textContent = '100%';
    if (this.statCapacity) this.statCapacity.textContent = '25.0 kW/h';

    this.sound.stopChargingHum();

    // Trigger Screen Flash
    if (this.screenFlash) {
      this.screenFlash.classList.remove('flash-active');
      void this.screenFlash.offsetWidth;
      this.screenFlash.classList.add('flash-active');
    }

    // High-Loudness Sonic Completion Boom & Fanfare
    this.sound.playCompletionSound();
    setTimeout(() => {
      this.sound.playCelebrationFanfare();
    }, 160);

    this.hudStatus.textContent = 'SYSTEM: ONLINE';
    this.hudDot.classList.add('online');

    const core = document.querySelector('.robot-core-outer');
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight * 0.42;
    if (core) {
      const rect = core.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
    }

    this.shockwaveRing.classList.remove('animate');
    void this.shockwaveRing.offsetWidth;
    this.shockwaveRing.classList.add('animate');

    if (this.particleEngine) {
      this.particleEngine.explode(cx, cy);
    }

    this.energyBeam.classList.remove('active');

    // OPEN CONGRATULATIONS POPUP MODAL
    setTimeout(() => {
      if (this.modalOverlay) {
        this.modalOverlay.classList.add('active');
      }
    }, 650);
  }

  // Restart Sequence
  restart() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.sound.stopChargingHum();
    if (this.particleEngine) {
      this.particleEngine.particles = [];
      this.particleEngine.confetti = [];
    }

    this.shockwaveRing.classList.remove('animate');
    if (this.screenFlash) this.screenFlash.classList.remove('flash-active');
    if (this.modalOverlay) this.modalOverlay.classList.remove('active');

    this.startBootSequence();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.botuMasterApp = new BotuMasterExperience();
});
