# 🎳 Abida — O Jogo

> *"Permanece, reconhece as Dimenúveis, atravessa-as e retorna ao centro."*

**Versão:** 1.2.0  
**APK:** https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abida/releases/tag/v1.2

Brick-breaker cósmico e meditativo com pinos de boliche, Dimenúveis, ondas de choque, power-ups elementais, vogais I-E-O-U-A e mecânica Abide.

## 🗺️ Ecossistema

- 🌐 Landing Page: https://dimenuvel.github.io/Evangelho-das-Dimenuveis-site/
- 📱 Aplicativo Principal: https://github.com/dimenuvel/Evangelho-das-Dimenuveis
- 〰️ Laboratório de Som: https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Som
- 🎳 Abida — O Jogo: https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abida
- 🧘 Abidar — The Cosmic Carpet Ride: https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abidar

## 🧭 Mapa do Jogo

```text
Abida — O Jogo
├── 🎮 Campanha Clássica
│   ├── Turno 1 — Salão de Boliche Cósmico
│   ├── Turno 2 — Tapete Sagrado
│   ├── Turno 3 — Terra
│   ├── Turno 4 — Água
│   ├── Turno 5 — Fogo
│   ├── Turno 6 — Ar
│   ├── Turno 7 — Vazio
│   ├── Turno 8 — Vogais I-E-O-U-A
│   ├── Turno 9 — Matriz da Mente
│   └── Turno X — Retorno ao Centro
├── ♾️ Ondas Infinitas
├── ☀️ Desafio Cósmico Diário
├── 🧘 Meditação
└── 🎧 Laboratório Sonoro
```

## 🌟 Funcionalidades

### 🌀 Turnos
1. Salão de Boliche Cósmico
2. Tapete Sagrado
3. Elemento Terra
4. Elemento Água
5. Elemento Fogo
6. Elemento Ar
7. O Vazio
8. Vogais Sagradas I-E-O-U-A
9. Matriz da Mente
10. Retorno ao Centro

### 🎮 Modos
- **Campanha Clássica:** narrativa com O Cara, O Discípulo e O Estranho.
- **Ondas Infinitas:** dificuldade progressiva e recordes.
- **Desafio Cósmico Diário:** layouts determinísticos e modificadores especiais.

### ⚡ Mecânicas
- Travessia de Camada Sagrada.
- Tremor de tela, laser dourado e ondas de choque.
- **Abide Meter** e **Abide Mode**.
- Sequência `I → E → O → U → A`.
- Partículas, halos, orbes e efeitos hápticos.

### 🧘 Meditação e Som
Laboratório via Web Audio com frequências, drones binaurais, intervalos harmônicos, pads, respiração ritmada e paisagens sonoras.

### 🌍 Personalização
Português/Inglês, temas Dia/Noite, volume, mute e hápticos.

## 🛠️ Tecnologias

- React 19 + Vite
- TypeScript
- HTML5 Canvas, física 60 FPS e partículas
- Web Audio API
- Tailwind CSS 4
- Lucide React
- Motion
- Cinzel, Playfair Display e JetBrains Mono

## 🚀 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- npm, pnpm ou yarn

```bash
git clone https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abida.git
cd Evangelho-das-Dimenuveis-Abida
npm install
npm run dev
```

Abra `http://localhost:3000`.

### Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run cap:build
npm run cap:open
```

## 📱 APK Android / GitHub Actions

O projeto usa **Capacitor 8**.

- Workflow: `.github/workflows/build-apk.yml`
- Java: JDK 21 Temurin
- Android SDK / Build Tools: API 34+ / 35
- Node.js: 24 LTS
- Gradle Wrapper com cache via `gradle/actions/setup-gradle@v4`

O workflow gera `Abida-O-Jogo.apk` em commits, PRs, tags `v*` ou execução manual.

Ícones Android: `resources/android/`, incluindo variantes mipmap e ícones adaptativos.

## 🕹️ Controles

| Ação | Mouse / Toque | Teclado |
|---|---|---|
| Mover raquete | Arrastar horizontalmente | ← / → ou A / D |
| Lançar orbe | Clique / toque | Espaço / ↑ / W |
| Ativar Abide | Botão Abide | Enter / E |
| Pausar / retomar | Botão Pausar | Esc / P |

## 📜 Licença

MIT.
