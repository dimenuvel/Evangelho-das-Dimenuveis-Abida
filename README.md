# Abide — The Game 🎳✨ `v1.2`

https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abida/releases/tag/v1.2


[![Version](https://img.shields.io/badge/version-1.2.0-gold.svg)](./package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](./LICENSE)

> *"Abide, recognize the layers, cross them, and return to the center."*  
> — *From the Gospel of Dimenuous*

**Abide — The Game** is a cosmic, meditative arcade brick-breaker built with **React**, **HTML5 Canvas**, **Tailwind CSS**, and the **Web Audio API**. Combining classic arcade mechanics with spiritual lore, cosmic bowling pins, layer-crossing laser shockwaves, elemental power-ups, and the harmonic vowel sequence (`I-E-O-U-A`), it guides players through a mystical quest to transcend the layers of existence and reach the Golden Core.

---

## 🌟 Key Features

### 🌀 10 Cosmic Turns & Turn X Golden Core
1. **Turn 1: The Cosmic Bowling Alley** — Classic brick formations with sacred bowling pin targets.
2. **Turn 2: The Sacred Rug** — Intricate tapestry formations and high-value strike opportunities.
3. **Turn 3: Earth Element** — Dense emerald barriers and fortified defensive blocks.
4. **Turn 4: Water Element** — Fluid azure currents and paddle-expanding harmonic drops.
5. **Turn 5: Fire Element** — High-velocity blazing orbs and energized speed trials.
6. **Turn 6: Air Element** — Weightless physics, elusive gusts, and shifting obstacles.
7. **Turn 7: The Void** — Illusions, inverted cosmic controls, and mystery blocks.
8. **Turn 8: The Sacred Vowels (`I-E-O-U-A`)** — Hit vowel runes in harmonic succession for celestial multiplier rewards.
9. **Turn 9: The Mind Matrix** — Multi-orb flow states and dense geometric layers.
10. **Turn X: Return to the Center** — Radial orbital shields protecting the central Golden Core. Pierce all rings and strike the core to achieve transcendence.

### 🎮 Game Modes
- **Classic Campaign (10 Turns)**: Full narrative arc featuring philosophical cutscenes between *The Dude*, *The Disciple*, and *The Stranger*.
- **Endless Wave Mode**: Progressively challenging procedural waves with scaling modifiers, wave clear bonuses, and high score tracking.
- **Daily Cosmic Challenge**: Deterministic daily seeded layouts (Mandala, Temple, Labyrinth, Vortex, Diamond) with special modifiers (Void Mystery, Fast Orbs, Shielded Core) and daily streak tracking.

### ⚡ Game Mechanics & Visual FX
- **Sacred Layer Crossing**: Breaking the last brick in any layer triggers screen-shake feedback, resonant audio cues, a horizontal golden laser beam, and radiant shockwave bursts.
- **The Abide Meter**: Maintain flow and steady paddle movement to charge the meter. Activate **Abide Mode** for temporary invulnerability, expanded paddle width, 2x multiplier, and celestial particle trails.
- **Harmonic Vowel System**: Strike `I → E → O → U → A` in sequence to trigger cosmic chants and massive point surges.
- **Haptic & Visual FX**: Multi-shape particle bursts (stars `✦`, halo rings, glowing orbs), shockwave rings, and screen-shake dynamics.

### 🧘 Meditation & Sound Lab
- **Interactive Sound Lab**: Real-time Web Audio synthesizer console with adjustable frequencies, binaural ambient drones, harmonic intervals, and SFX test pads.
- **Meditate Mode**: Guided breath-pacer and soothing generative ambient soundscapes.

### 🌍 Accessibility & Customization
- **Bilingual**: Seamless instant switching between **English (EN)** and **Portuguese (PT-BR)**.
- **Themes**: **Day Mode (Serene Warm Linen)** & **Night Mode (Deep Obsidian Void)**.
- **Audio & Haptics**: Dedicated volume controls, mute toggles, and vibration feedback switches.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Graphics / Engine**: HTML5 Canvas with custom 60 FPS physics, elastic collision resolution, particle emitter, and screen-shake system
- **Audio Engine**: Pure [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (Subtractive synths, polyphonic oscillators, ambient drones, harmonic resonance)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/), [Motion](https://motion.dev/)
- **Typography**: Cinzel, Playfair Display, JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/abide-the-game.git
   cd abide-the-game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port indicated in your terminal).

### Available Scripts

- `npm run dev` — Starts the development server on port 3000.
- `npm run build` — Builds the production distribution bundle in `dist/`.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs TypeScript compiler checks (`tsc --noEmit`).
- `npm run cap:build` — Builds web assets and syncs with the Capacitor Android project.
- `npm run cap:open` — Opens the native Android project in Android Studio.

---

## 📱 Android APK & GitHub Actions Workflow

This project is packaged with **Capacitor 8** for Android:

- **Automated CI/CD Workflow**: Located at [`.github/workflows/build-apk.yml`](./.github/workflows/build-apk.yml).
- **Environment & Dependencies**:
  - **Java**: JDK 21 (Temurin)
  - **Android SDK & Build Tools**: API 34+ / 35
  - **Node.js**: 24 LTS
  - **Gradle Wrapper**: Automated caching via `gradle/actions/setup-gradle@v4`
- **Output Artifacts**: Generates installable `Abida-O-Jogo.apk` and release APK artifacts automatically upon commits, PRs, version tags (`v*`), or manual `workflow_dispatch` trigger.
- **Spiral App Icon Set**: Full mipmap icon suite in `resources/android/` (`mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`) including square, round (`ic_launcher_round`), adaptive foreground (`ic_launcher_foreground`), and background layers featuring the golden sacred Fibonacci spiral.

---

## 🕹️ Controls

| Action | Mouse / Touch | Keyboard |
| :--- | :--- | :--- |
| **Move Paddle** | Move cursor / drag finger horizontally | Left / Right Arrow or `A` / `D` |
| **Launch Orb** | Click / Tap canvas | `Spacebar` / `Up Arrow` / `W` |
| **Activate Abide Mode** | Tap Abide button when charged | `Enter` / `E` |
| **Pause / Resume** | Tap Pause button | `Escape` / `P` |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.
