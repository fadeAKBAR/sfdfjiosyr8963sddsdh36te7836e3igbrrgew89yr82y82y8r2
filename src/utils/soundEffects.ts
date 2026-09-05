// Web Audio API sound synthesis for responsive, zero-latency UI sound effects
// Does not require external audio assets and works seamlessly offline & in iframes

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Initialize or retrieve existing AudioContext safely on user interaction
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export const getSoundEnabled = (): boolean => soundEnabled;

export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('tiktok_coinhub_sound_enabled', enabled ? '1' : '0');
    } catch {
      // Ignore storage error
    }
  }
};

// Initialize preference from localStorage if available
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('tiktok_coinhub_sound_enabled');
    if (saved !== null) {
      soundEnabled = saved === '1';
    }
  } catch {
    // Keep default true
  }
}

/**
 * 1. Subtle typing click sound when user types TikTok username, custom coins, or balance.
 * Uses a soft mechanical tap with slight pitch jitter for natural feel.
 */
export const playKeyStrokeSound = (): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Subtle pitch jitter between 450Hz and 650Hz
    const freq = 500 + Math.random() * 150;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.035);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    // Soft volume
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Ignore audio error
  }
};

/**
 * 2. Coin selection / package select sound.
 * Bright, joyful double chime simulating coin pickup / select.
 */
export const playCoinSelectSound = (): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // First high bright chime
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08); // E6
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // Second resonant sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1760, now + 0.05); // A6
    gain2.gain.setValueAtTime(0.08, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.18);
  } catch {
    // Ignore audio error
  }
};

/**
 * 3. General action click sound (buttons, tabs, toggles).
 * Crisp tactile micro-tap.
 */
export const playClickSound = (): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch {
    // Ignore audio error
  }
};

/**
 * 4. User verified sound.
 * Uplifting two-tone positive confirmation chime.
 */
export const playVerifiedSound = (): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Note 1: E5
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.1);

    // Note 2: A5
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.0, now + 0.08);
    gain2.gain.setValueAtTime(0.14, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.28);
  } catch {
    // Ignore audio error
  }
};

/**
 * 5. High-tech biometric Face ID scanning blip.
 */
export const playScanBeepSound = (pitch = 1000): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.065);
  } catch {
    // Ignore audio error
  }
};

/**
 * 6. Transaction Success Sound!
 * Celebratory TikTok coin cascade / fanfare with ascending chords and coin chimes.
 */
export const playTransactionSuccessSound = (): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Major chord arpeggio: C5, E5, G5, C6 + metallic coin harmonics
    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.16 }, // C5
      { freq: 659.25, time: 0.09, dur: 0.18 }, // E5
      { freq: 783.99, time: 0.18, dur: 0.22 }, // G5
      { freq: 1046.5, time: 0.28, dur: 0.45 }, // C6
      { freq: 1318.5, time: 0.36, dur: 0.55 }, // E6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.14, now + time);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });

    // Metallic shimmer coin jingling in background
    for (let i = 0; i < 4; i++) {
      const coinTime = now + 0.3 + i * 0.08;
      const coinOsc = ctx.createOscillator();
      const coinGain = ctx.createGain();

      coinOsc.type = 'triangle';
      coinOsc.frequency.setValueAtTime(1800 + i * 220, coinTime);

      coinGain.gain.setValueAtTime(0.06, coinTime);
      coinGain.gain.exponentialRampToValueAtTime(0.001, coinTime + 0.12);

      coinOsc.connect(coinGain);
      coinGain.connect(ctx.destination);

      coinOsc.start(coinTime);
      coinOsc.stop(coinTime + 0.12);
    }
  } catch {
    // Ignore audio error
  }
};

/**
 * 7. Soft warning / alert sound
 */
export const playWarningSound = (): void => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch {
    // Ignore audio error
  }
};
