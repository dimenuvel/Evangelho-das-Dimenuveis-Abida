/**
 * Web Audio API Procedural Sound Engine for Abida - O Jogo
 * High-fidelity, subtle, atmospheric soundscapes for all 10 Turns,
 * IEOUA vowel formant synthesis, dynamic sequence modulation, and gameplay FX.
 */

export type TurnId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Vowel = 'I' | 'E' | 'O' | 'U' | 'A';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPausedState: boolean = false;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  // Ambient Drone State
  private currentTurnId: number = 0;
  private ambientGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private activeNodes: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private activeLfos: OscillatorNode[] = [];
  private ieouaProgress: number = 0; // 0 to 5
  private isHarmonyElevated: boolean = false;
  private harmonyTimeout: number | null = null;

  constructor() {
    // Lazy initialization on first user gesture
  }

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Compressor to keep sounds subtle and polished
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.01, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      // Ambient Drone Bus
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(1000, this.ctx.currentTime);

      this.ambientGain.connect(this.ambientFilter);
      this.ambientFilter.connect(this.masterGain);
    } catch (e) {
      console.warn("Web Audio API not supported in this environment", e);
    }
  }

  public pause() {
    this.isPausedState = true;
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  public resume() {
    this.init();
    this.isPausedState = false;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPaused(): boolean {
    return this.isPausedState;
  }

  public getCurrentTurnId(): number {
    return this.currentTurnId;
  }

  // --- GAMEPLAY SOUND EFFECTS --- //

  // 1. Paddle / Rug Bounce
  public playPaddleHit(velocityRatio: number = 1.0) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    // Deep warm rug thud + golden chime
    osc.frequency.setValueAtTime(130 + velocityRatio * 45, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.2);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.22);

    // Harmonic golden chime accent
    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.setValueAtTime(523.25, now); // C5
    chime.frequency.exponentialRampToValueAtTime(261.63, now + 0.25);

    chimeGain.gain.setValueAtTime(0.08, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    chime.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    chime.start(now);
    chime.stop(now + 0.25);
  }

  // 2. Block Hit
  public playBlockHit(pitchMultiplier: number = 1.0) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const index = Math.floor((pitchMultiplier % 1) * scale.length);
    const baseFreq = scale[index] || 440;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.14);
  }

  // 3. Bowling Pin Strike
  public playPinStrike() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    // Pin crash noise + golden bells
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(2.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);

    // Harmonic bell crash
    [432, 528, 639, 852].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.02);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.4);

      gain.gain.setValueAtTime(0.12, now + idx * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.02);
      osc.stop(now + 0.4);
    });
  }

  // 4. IEOUA Formant Vowel Synthesis
  public playIEOUAVowel(vowel: Vowel, stepIndex?: number) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const vowelConfigs: Record<Vowel, { f1: number; f2: number; base: number }> = {
      I: { f1: 270, f2: 2290, base: 523.25 }, // High C5
      E: { f1: 530, f2: 1840, base: 440.00 }, // A4
      O: { f1: 570, f2: 840,  base: 329.63 }, // E4
      U: { f1: 300, f2: 870,  base: 220.00 }, // A3
      A: { f1: 850, f2: 1220, base: 659.25 }  // E5
    };

    const config = vowelConfigs[vowel] || vowelConfigs.I;

    // Dual-formant vocal synth
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(config.base, now);

    const f1Filter = this.ctx.createBiquadFilter();
    f1Filter.type = 'bandpass';
    f1Filter.frequency.setValueAtTime(config.f1, now);
    f1Filter.Q.setValueAtTime(6, now);

    const f2Filter = this.ctx.createBiquadFilter();
    f2Filter.type = 'bandpass';
    f2Filter.frequency.setValueAtTime(config.f2, now);
    f2Filter.Q.setValueAtTime(6, now);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(f1Filter);
    osc.connect(f2Filter);
    f1Filter.connect(gain);
    f2Filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.55);

    // Update sequence progress state & modulate ambient soundscape!
    if (typeof stepIndex === 'number') {
      this.setIEOUAProgress(stepIndex);
    }
  }

  // Modulate active ambient drone brightness based on IEOUA progress (0 to 5)
  public setIEOUAProgress(progress: number) {
    this.ieouaProgress = Math.max(0, Math.min(5, progress));
    if (!this.ctx || !this.ambientFilter) return;
    const now = this.ctx.currentTime;
    // As sequence advances (0 -> 5), filter cutoff opens smoothly and adds golden brightness
    const baseCutoff = 600 + this.currentTurnId * 80;
    const targetCutoff = baseCutoff + this.ieouaProgress * 300;
    this.ambientFilter.frequency.setTargetAtTime(targetCutoff, now, 0.3);
  }

  // Trigger Full IEOUA Sequence Completion Harmony
  public playIEOUASequenceComplete() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const vowelFreqs = [220, 329.63, 440, 523.25, 659.25]; // U, O, E, I, A pentatonic cascade

    // Arpeggiated cascade
    vowelFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.2);
    });

    // Elevate ambient drone into a golden harmonic glow
    this.isHarmonyElevated = true;
    if (this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(0.3, now, 0.4);
    }

    if (this.harmonyTimeout) window.clearTimeout(this.harmonyTimeout);
    this.harmonyTimeout = window.setTimeout(() => {
      this.isHarmonyElevated = false;
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 1.0);
      }
    }, 8000);
  }

  // 5. PowerUp Pickup
  public playPowerUp(type: string) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    const startFreq = type === 'FIRE' ? 320 : type === 'AIR' ? 640 : type === 'WATER' ? 420 : 210;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 6. Abide Mode Activation Chord
  public playAbideActivation() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const chord = [216, 432, 528, 639, 852]; // Solfeggio meditative frequencies
    chord.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  // 7. Void Hazard Illusion Trigger
  public playVoidTrigger() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 8. Ball Lost
  public playBallLost() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(216, now);
    osc.frequency.exponentialRampToValueAtTime(54, now + 0.45);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // --- PROCEDURAL AMBIENT SOUNDSCAPES FOR THE TEN TURNS --- //

  public startAmbientDrone(turnId: number) {
    if (this.currentTurnId === turnId && this.activeNodes.length > 0) return;
    this.stopAmbientDrone();
    this.resume();
    if (!this.ctx || !this.ambientGain) return;

    this.currentTurnId = turnId;
    this.ieouaProgress = 0;
    const now = this.ctx.currentTime;

    // Reset base filter cutoff frequency according to Turn
    if (this.ambientFilter) {
      const cutoffs: Record<number, number> = {
        1: 350,   // Silence (deep, low-pass crystalline)
        2: 600,   // Vision (opening filter)
        3: 800,   // Energy (pulsing)
        4: 700,   // Heart (warm triad)
        5: 500,   // Will (focused low saw)
        6: 900,   // Matter (elemental rumble)
        7: 450,   // Void (detuned cluster)
        8: 650,   // Return (Shepherd cycle)
        9: 850,   // Perspective (stereo shimmer)
        10: 1200  // Center (radiant Solfeggio 432Hz)
      };
      this.ambientFilter.frequency.setValueAtTime(cutoffs[turnId] || 600, now);
    }

    switch (turnId) {
      case 1:
        this.createTurn1Silence(now);
        break;
      case 2:
        this.createTurn2Vision(now);
        break;
      case 3:
        this.createTurn3Energy(now);
        break;
      case 4:
        this.createTurn4Heart(now);
        break;
      case 5:
        this.createTurn5Will(now);
        break;
      case 6:
        this.createTurn6Matter(now);
        break;
      case 7:
        this.createTurn7Void(now);
        break;
      case 8:
        this.createTurn8Return(now);
        break;
      case 9:
        this.createTurn9Perspective(now);
        break;
      case 10:
        this.createTurn10Center(now);
        break;
      default:
        this.createTurn1Silence(now);
        break;
    }
  }

  // TURN I: SILENCE ("THE MIRROR OF THE MIND")
  private createTurn1Silence(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const freqs = [108, 216, 432];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (idx === 2 ? 0.5 : 0), now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05 / (idx + 1), now + 2.0);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      this.activeNodes.push(osc);
    });

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.02;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(180, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.1, now); // 10 second breath cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.015, now);

    lfo.connect(lfoGain);
    lfoGain.connect(noiseGain.gain);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ambientGain);

    noise.start(now);
    lfo.start(now);
    this.activeNodes.push(noise);
    this.activeLfos.push(lfo);
  }

  // TURN II: VISION ("THE EYE THAT SEES")
  private createTurn2Vision(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const freqs = [128, 256, 384];
    freqs.forEach((freq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.4, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 1.5);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      lfo.start(now);
      this.activeNodes.push(osc);
      this.activeLfos.push(lfo);
    });

    const eyeOsc = this.ctx.createOscillator();
    const eyeGain = this.ctx.createGain();
    eyeOsc.type = 'sine';
    eyeOsc.frequency.setValueAtTime(768, now);
    eyeGain.gain.setValueAtTime(0.001, now);
    eyeGain.gain.linearRampToValueAtTime(0.015, now + 3.0);
    eyeOsc.connect(eyeGain);
    eyeGain.connect(this.ambientGain);
    eyeOsc.start(now);
    this.activeNodes.push(eyeOsc);
  }

  // TURN III: ENERGY ("THE FLOW OF ENERGY")
  private createTurn3Energy(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(144, now);
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(72, now);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2.0, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.035, now);

    gain.gain.setValueAtTime(0.03, now);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ambientGain);

    osc.start(now);
    subOsc.start(now);
    lfo.start(now);
    this.activeNodes.push(osc, subOsc);
    this.activeLfos.push(lfo);
  }

  // TURN IV: HEART ("THE HEART THAT CONNECTS")
  private createTurn4Heart(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const fMaj7 = [174.61, 220.00, 261.63, 329.63]; // F3, A3, C4, E4
    fMaj7.forEach((freq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 2.0);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      this.activeNodes.push(osc);
    });

    const heartLfo = this.ctx.createOscillator();
    heartLfo.frequency.setValueAtTime(1.0, now);
    const heartGain = this.ctx.createGain();
    heartGain.gain.setValueAtTime(0.02, now);
    heartLfo.connect(heartGain);
    if (this.ambientGain) {
      heartGain.connect(this.ambientGain.gain);
    }
    heartLfo.start(now);
    this.activeLfos.push(heartLfo);
  }

  // TURN V: WILL ("THE WILL THAT CHOOSES")
  private createTurn5Will(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const root = 162; // E3
    const fifth = 243; // B3
    [root, fifth].forEach((freq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 1.5);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      this.activeNodes.push(osc);
    });
  }

  // TURN VI: MATTER / ELEMENTAL FIELD ("THE ELEMENTAL FIELD")
  private createTurn6Matter(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    // 1. Earth: Deep sub drone (54Hz & 108Hz)
    const earthSub = this.ctx.createOscillator();
    const earthGain = this.ctx.createGain();
    earthSub.type = 'sine';
    earthSub.frequency.setValueAtTime(54, now);
    earthGain.gain.setValueAtTime(0.05, now);
    earthSub.connect(earthGain);
    earthGain.connect(this.ambientGain);
    earthSub.start(now);
    this.activeNodes.push(earthSub);

    // 2. Water: Liquid sine wave with 3.5Hz pitch waver
    const waterOsc = this.ctx.createOscillator();
    const waterGain = this.ctx.createGain();
    waterOsc.type = 'sine';
    waterOsc.frequency.setValueAtTime(216, now);
    const waterLfo = this.ctx.createOscillator();
    waterLfo.frequency.setValueAtTime(3.5, now);
    const waterLfoGain = this.ctx.createGain();
    waterLfoGain.gain.setValueAtTime(4.0, now);
    waterLfo.connect(waterLfoGain);
    waterLfoGain.connect(waterOsc.frequency);
    waterGain.gain.setValueAtTime(0.03, now);
    waterOsc.connect(waterGain);
    waterGain.connect(this.ambientGain);
    waterOsc.start(now);
    waterLfo.start(now);
    this.activeNodes.push(waterOsc);
    this.activeLfos.push(waterLfo);

    // 3. Air: High resonant filter sweep
    const airOsc = this.ctx.createOscillator();
    const airGain = this.ctx.createGain();
    airOsc.type = 'triangle';
    airOsc.frequency.setValueAtTime(432, now);
    airGain.gain.setValueAtTime(0.02, now);
    airOsc.connect(airGain);
    airGain.connect(this.ambientGain);
    airOsc.start(now);
    this.activeNodes.push(airOsc);
  }

  // TURN VII: VOID ("THE VOID")
  private createTurn7Void(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const freqs = [111, 114.5, 157];
    freqs.forEach((freq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 1.5);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      this.activeNodes.push(osc);
    });
  }

  // TURN VIII: RETURN ("THE RETURN")
  private createTurn8Return(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const octaveFreqs = [75, 150, 300, 600];
    octaveFreqs.forEach((baseFreq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);

      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.05, now); // 20 second cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(15, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.02, now);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      lfo.start(now);
      this.activeNodes.push(osc);
      this.activeLfos.push(lfo);
    });
  }

  // TURN IX: PERSPECTIVE / DOOR ("THE DOOR BETWEEN LAYERS")
  private createTurn9Perspective(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const oscL = this.ctx.createOscillator();
    const oscR = this.ctx.createOscillator();
    const gainL = this.ctx.createGain();
    const gainR = this.ctx.createGain();

    oscL.type = 'triangle';
    oscL.frequency.setValueAtTime(180, now);
    oscR.type = 'triangle';
    oscR.frequency.setValueAtTime(184, now); // 4Hz binaural theta gap

    gainL.gain.setValueAtTime(0.03, now);
    gainR.gain.setValueAtTime(0.03, now);

    if ('createStereoPanner' in this.ctx) {
      const pannerL = this.ctx.createStereoPanner();
      const pannerR = this.ctx.createStereoPanner();
      pannerL.pan.setValueAtTime(-0.7, now);
      pannerR.pan.setValueAtTime(0.7, now);

      oscL.connect(gainL);
      gainL.connect(pannerL);
      pannerL.connect(this.ambientGain);

      oscR.connect(gainR);
      gainR.connect(pannerR);
      pannerR.connect(this.ambientGain);
    } else {
      oscL.connect(gainL);
      gainL.connect(this.ambientGain);
      oscR.connect(gainR);
      gainR.connect(this.ambientGain);
    }

    oscL.start(now);
    oscR.start(now);
    this.activeNodes.push(oscL, oscR);
  }

  // TURN X: CENTER / RETURN TO CENTER ("THE RETURN TO CENTER")
  private createTurn10Center(now: number) {
    if (!this.ctx || !this.ambientGain) return;
    const solfeggio = [108, 216, 432, 528, 639, 852];
    solfeggio.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      const targetGain = 0.05 / (idx > 2 ? idx * 0.8 : 1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 2.5);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      this.activeNodes.push(osc);
    });
  }

  // Stop current ambient soundscape cleanly
  public stopAmbientDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.activeNodes.forEach(node => {
      try {
        node.stop(now + 0.3);
      } catch {
        // Ignore if already stopped
      }
    });
    this.activeLfos.forEach(lfo => {
      try {
        lfo.stop(now + 0.3);
      } catch {
        // Ignore
      }
    });
    this.activeNodes = [];
    this.activeLfos = [];
    this.currentTurnId = 0;
  }
}

export const soundEngine = new SoundEngine();
