/**
 * B.O.T.U. (Bhains of the Universe) - Quantum Token Recharge Experience
 * Core System: High-Loudness Audio Synthesizer, Smooth Multi-Page Navigation,
 * Canvas Particle Engine, and Viewport Zero-Overflow Validator.
 */

// ===================================================================
// 1. High-Loudness Web Audio API Synthesizer
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
    this.isMuted = false;

    // Check saved audio preference
    if (sessionStorage.getItem('botu_sound_enabled') === 'true') {
      this.init();
    }
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

      // Multi-stage loudness maximization: High-ratio dynamics compressor
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(16, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.001, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.08, this.ctx.currentTime);

      // Pre-Master Gain Stage for High Volume Output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 2.4, this.ctx.currentTime);

      // Post-Compressor Output Booster Gain Stage
      this.boosterGain = this.ctx.createGain();
      this.boosterGain.gain.setValueAtTime(1.85, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.boosterGain);
      this.boosterGain.connect(this.ctx.destination);

      this.isInitialized = true;
      sessionStorage.setItem('botu_sound_enabled', 'true');

      // Auto-trigger fullscreen along with sound permission
      if (window.BOTU && window.BOTU.fullscreen && !window.BOTU.fullscreen.isFullscreen()) {
        window.BOTU.fullscreen.enterFullscreen().catch(() => {});
      }
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

    // Auto-trigger fullscreen along with sound permission
    if (window.BOTU && window.BOTU.fullscreen && !window.BOTU.fullscreen.isFullscreen()) {
      window.BOTU.fullscreen.enterFullscreen().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 2.4, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Deep Futuristic System Boot Chime
  playBootSound() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
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
      subGain.gain.linearRampToValueAtTime(1.4, now + 0.12);
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
        gain.gain.linearRampToValueAtTime(0.85, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.65);
      });
    } catch (e) {
      console.warn('playBootSound error:', e);
    }
  }

  // High-Tech Telemetry Chirps & Biometric Blips
  playBlip(freq = 920, duration = 0.065, type = 'sine') {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration + 0.015);
    } catch (e) {}
  }

  // Biometric Laser Scanner Sweep Sound
  playScannerSound() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(840, now + 0.25);
      osc.frequency.linearRampToValueAtTime(280, now + 0.5);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.85, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  }

  // Token Resonance Harmonic Lock Ping
  playLockSound() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      [880, 1320, 1760].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.85, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch (e) {}
  }

  // Reactor Core Spool Whine
  playReactorSpool() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(1.2, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch (e) {}
  }

  // Dual-Oscillator Continuous High-Energy Charging Hum
  startChargingHum() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
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
      this.chargingHumGain.linearRampToValueAtTime(1.35, now + 0.25);

      this.chargingHumOsc1.connect(this.chargingFilter);
      this.chargingHumOsc2.connect(this.chargingFilter);
      this.chargingFilter.connect(this.chargingHumGain);
      this.chargingHumGain.connect(this.masterGain);

      this.chargingHumOsc1.start(now);
      this.chargingHumOsc2.start(now);
    } catch (e) {
      console.warn('startChargingHum error:', e);
    }
  }

  updateChargingHum(progressRatio) {
    try {
      if (!this.isChargingSoundActive || !this.ctx || !this.chargingHumOsc1 || !this.chargingFilter) return;
      const now = this.ctx.currentTime;
      const targetFreq = 110 + progressRatio * 410;
      const filterFreq = 320 + progressRatio * 1100;

      this.chargingHumOsc1.frequency.setTargetAtTime(targetFreq, now, 0.04);
      this.chargingHumOsc2.frequency.setTargetAtTime(targetFreq * 1.015, now, 0.04);
      this.chargingFilter.frequency.setTargetAtTime(filterFreq, now, 0.04);
    } catch (e) {}
  }

  stopChargingHum() {
    try {
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
    } catch (e) {}
  }

  // Loud Electrical Spark Crackle
  playSparkCrackle() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
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
      gain.gain.setValueAtTime(0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch (e) {}
  }

  // Massive Energy Burst Sonic Boom & Shockwave
  playCompletionSound() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;

      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.75);

      subGain.gain.setValueAtTime(1.6, now);
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

      laserGain.gain.setValueAtTime(1.25, now);
      laserGain.gain.exponentialRampToValueAtTime(0.001, now + 0.72);

      laserOsc.connect(laserFilter);
      laserFilter.connect(laserGain);
      laserGain.connect(this.masterGain);

      laserOsc.start(now);
      laserOsc.stop(now + 0.75);
    } catch (e) {}
  }

  // Cosmic Victory Arpeggio Fanfare
  playCelebrationFanfare() {
    try {
      this.ensureContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];

      chord.forEach((note, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + 0.12 + i * 0.075;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(1.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.85);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(startTime);
        osc.stop(startTime + 0.9);
      });

      setTimeout(() => {
        try {
          if (!this.ctx || !this.masterGain || this.isMuted) return;
          const resNow = this.ctx.currentTime;
          [1046.5, 1318.51, 1567.98].forEach(f => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, resNow);
            gain.gain.setValueAtTime(0.9, resNow);
            gain.gain.exponentialRampToValueAtTime(0.0001, resNow + 1.35);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(resNow);
            osc.stop(resNow + 1.4);
          });
        } catch (e) {}
      }, 550);
    } catch (e) {}
  }
}

// ===================================================================
// 2. High-Performance Particle Engine (Sparks & Confetti)
// ===================================================================
class ParticleEngine {
  constructor(canvas) {
    if (!canvas) return;
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
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    if (this.ctx) {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
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
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  emitChargingSparks(targetX, targetY) {
    if (this.particles.length > 95) return;
    const colors = ['#00f0ff', '#38bdf8', '#c084fc', '#ffffff'];
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 90;
      this.particles.push({
        x: targetX + Math.cos(angle) * distance,
        y: targetY - 70 + Math.sin(angle) * (distance * 0.4),
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 2.0 + Math.random() * 2.8,
        size: 1.6 + Math.random() * 2.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.024 + Math.random() * 0.03
      });
    }
  }

  explode(centerX, centerY) {
    const colors = ['#00f0ff', '#0077ff', '#9d4edd', '#ff0055', '#00f59b', '#ffb703', '#ffffff'];
    const count = 130;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 14;
      this.confetti.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.0,
        gravity: 0.18,
        drag: 0.965,
        size: 3.5 + Math.random() * 6.0,
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
    if (!this.isRunning || !this.ctx) return;
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
      this.ctx.shadowBlur = 8;
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
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = c.color;
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate(c.rotation);

      if (c.shape === 'rect') {
        this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.5);
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
// 3. Smooth Page Navigation Controller
// ===================================================================
class BotuNavigator {
  constructor(soundInstance) {
    this.sound = soundInstance;
    this.overlay = document.getElementById('transition-overlay');
    this.content = document.querySelector('.page-content');
    this.isNavigating = false;
  }

  navigateTo(targetUrl, delay = 400) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    // Persist fullscreen intent & request during active user gesture
    if (window.BOTU && window.BOTU.fullscreen) {
      if (!window.BOTU.fullscreen.isFullscreen()) {
        window.BOTU.fullscreen.enterFullscreen().catch(() => {});
      }
      sessionStorage.setItem('botu_fullscreen_active', 'true');
    }

    // Disable all buttons to prevent duplicate clicks
    document.querySelectorAll('button').forEach(btn => {
      btn.disabled = true;
    });

    // Sound effect for page transition
    if (this.sound) {
      this.sound.playBlip(1200, 0.08);
    }

    // Trigger page exit animation
    if (this.content) {
      this.content.classList.add('page-exit');
    }

    // Show futuristic transition portal overlay
    if (this.overlay) {
      this.overlay.classList.add('active');
    }

    // Attempt seamless SPA navigation on HTTP/HTTPS to preserve fullscreen continuously!
    if (window.location.protocol.startsWith('http') && typeof fetch === 'function') {
      setTimeout(() => {
        this.seamlessNavigate(targetUrl);
      }, delay);
    } else {
      // Fallback for file:// protocol or standard MPA
      setTimeout(() => {
        window.location.href = targetUrl;
      }, delay);
    }
  }

  async seamlessNavigate(targetUrl) {
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Fetch failed: ' + response.status);
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Update document title
      if (doc.title) {
        document.title = doc.title;
      }

      // Replace page container
      const newContainer = doc.querySelector('.page-container');
      const currentContainer = document.querySelector('.page-container');
      if (newContainer && currentContainer) {
        currentContainer.innerHTML = newContainer.innerHTML;
        this.content = currentContainer.querySelector('.page-content');
      }

      // Update browser history
      try {
        window.history.pushState({ url: targetUrl }, doc.title || '', targetUrl);
      } catch (e) {}

      // Execute target page inline scripts (except botu-core.js)
      const scripts = doc.querySelectorAll('script');
      scripts.forEach(s => {
        if (!s.src || !s.src.includes('botu-core.js')) {
          const newScript = document.createElement('script');
          newScript.textContent = s.textContent;
          document.body.appendChild(newScript);
        }
      });

      // Viewport overflow check
      if (window.BOTU && window.BOTU.checkOverflow) {
        window.BOTU.checkOverflow();
      }

      // Hide transition portal
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.classList.remove('active');
        }
        this.isNavigating = false;
      }, 150);
    } catch (err) {
      console.warn('Seamless navigation failed, falling back to direct location.href:', err);
      window.location.href = targetUrl;
    }
  }
}

// Handle Browser Back / Forward buttons in SPA mode
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.url) {
    window.location.href = e.state.url;
  }
});

// ===================================================================
// 4. Universal Fullscreen Manager (PC & Mobile Auto-Fullscreen Engine)
// ===================================================================
class BotuFullscreenManager {
  constructor() {
    this.isSupported = !!(
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.msRequestFullscreen
    );
    this.isListening = false;
  }

  isFullscreen() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  async enterFullscreen() {
    if (this.isFullscreen()) return true;
    const docEl = document.documentElement;

    try {
      if (docEl.requestFullscreen) {
        try {
          await docEl.requestFullscreen({ navigationUI: 'hide' });
        } catch (subErr) {
          await docEl.requestFullscreen();
        }
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        await docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        await docEl.msRequestFullscreen();
      }

      sessionStorage.setItem('botu_fullscreen_active', 'true');

      // Mobile address bar hide & orientation lock
      if (window.innerWidth <= 768) {
        window.scrollTo(0, 1);
        try {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('any').catch(() => {});
          }
        } catch (e) {}
      }
      return true;
    } catch (err) {
      // Browser rejected due to lack of user gesture in strict environments
      return false;
    }
  }

  async exitFullscreen() {
    if (!this.isFullscreen()) return true;
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      sessionStorage.setItem('botu_fullscreen_active', 'false');
      return true;
    } catch (err) {
      return false;
    }
  }

  toggleFullscreen() {
    if (this.isFullscreen()) {
      return this.exitFullscreen();
    } else {
      return this.enterFullscreen();
    }
  }

  setupAutoFullscreen() {
    // 1. Immediate zero-gesture attempt on load (works in kiosk, PWA, or trusted modes)
    this.enterFullscreen().catch(() => {});

    // 2. Couple Sound Permission and Fullscreen:
    // If direct zero-gesture fullscreen is blocked by browser policy,
    // the very first user interaction (granting sound permission / starting audio / tapping anywhere)
    // simultaneously grants sound permission AND sets fullscreen!
    const triggerSoundAndFullscreen = () => {
      if (window.BOTU && window.BOTU.sound) {
        window.BOTU.sound.ensureContext();
      }
      if (!this.isFullscreen()) {
        this.enterFullscreen().catch(() => {});
      }
    };

    if (!this.isListening) {
      this.isListening = true;
      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evtType => {
        window.addEventListener(evtType, triggerSoundAndFullscreen, { passive: true, capture: true });
      });
    }

    // 3. Keep state synchronized
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evtName => {
      document.addEventListener(evtName, () => {
        if (this.isFullscreen()) {
          sessionStorage.setItem('botu_fullscreen_active', 'true');
        }
      });
    });
  }
}

// ===================================================================
// 5. Automated Zero-Overflow Viewport Validator
// ===================================================================
function checkViewportOverflow() {
  const docEl = document.documentElement;
  const hasHorizontalOverflow = docEl.scrollWidth > docEl.clientWidth;
  const hasVerticalOverflow = docEl.scrollHeight > docEl.clientHeight;

  const report = {
    horizontalOverflow: hasHorizontalOverflow,
    verticalOverflow: hasVerticalOverflow,
    viewportWidth: docEl.clientWidth,
    viewportHeight: docEl.clientHeight,
    documentWidth: docEl.scrollWidth,
    documentHeight: docEl.scrollHeight
  };

  if (hasHorizontalOverflow || hasVerticalOverflow) {
    console.warn('⚠️ [BOTU OVERFLOW ALERT]', report);
  } else {
    console.log('✅ [BOTU PERFECT VIEWPORT FIT]', `${report.viewportWidth}x${report.viewportHeight}`);
  }

  return report;
}

// ===================================================================
// 6. Global Instance & Initialization
// ===================================================================
window.BOTU = {
  sound: new LoudSoundSynthesizer(),
  particleEngine: null,
  navigator: null,
  fullscreen: new BotuFullscreenManager(),
  checkOverflow: checkViewportOverflow
};

document.addEventListener('DOMContentLoaded', () => {
  // Setup Particles if canvas exists
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    window.BOTU.particleEngine = new ParticleEngine(canvas);
    window.BOTU.particleEngine.start();
  }

  // Setup Navigator
  window.BOTU.navigator = new BotuNavigator(window.BOTU.sound);

  // Setup Auto Fullscreen Engine (zero UI buttons or banners)
  window.BOTU.fullscreen.setupAutoFullscreen();

  // Setup Mute Toggle Button in HUD if present
  const muteBtn = document.getElementById('hud-sound-toggle');
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const muted = window.BOTU.sound.toggleMute();
      muteBtn.textContent = muted ? '🔇 MUTED' : '🔊 SOUND';
    });
  }

  // Oscilloscope Animation in HUD (queries dynamically for continuous multi-page support)
  setInterval(() => {
    const bars = document.querySelectorAll('.osc-bar');
    bars.forEach(bar => {
      const h = Math.floor(3 + Math.random() * 9);
      bar.style.height = `${h}px`;
    });
  }, 110);

  // Interactive 3D Parallax Tilt for Desktop Stage
  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const stageCard = document.querySelector('.robot-stage-card');
    if (stageCard) {
      const x = (e.clientX / window.innerWidth - 0.5) * 5;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      stageCard.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    }
  });

  // Auto-run Viewport Overflow Validation
  checkViewportOverflow();
});

window.addEventListener('load', () => {
  checkViewportOverflow();
  if (window.BOTU && window.BOTU.fullscreen) {
    window.BOTU.fullscreen.enterFullscreen().catch(() => {});
  }
});
window.addEventListener('resize', checkViewportOverflow);
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    checkViewportOverflow();
    if (window.innerWidth <= 768) {
      window.scrollTo(0, 1);
    }
  }, 150);
});

