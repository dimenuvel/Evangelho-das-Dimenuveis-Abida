# Abida - O Jogo - Evangelho das Dimenúveis

https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abida/releases/tag/v1.2


[![Version](https://img.shields.io/badge/version-1.2.0-gold.svg)](./package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](./LICENSE)

> *"Permanece, reconhece as Dimenúveis, atravessa-as e retorna ao centro."*  
> — *Do Evangelho das Dimenuíveis*

**Abida - O Jogo** é um brick-breaker arcade cósmico e meditativo, construído com **React**, **HTML5 Canvas**, **Tailwind CSS** e a **Web Audio API**. Combinando mecânicas clássicas de arcade com uma mitologia espiritual, pinos de boliche cósmicos, ondas de choque a laser que atravessam Dimenúveis, power-ups elementais e a sequência harmônica de vogais (`I-E-O-U-A`), o jogo conduz os jogadores em uma jornada mística para transcender as Dimenúveis da existência e alcançar o Núcleo Dourado.

---

## 🌟 Principais Recursos

### 🌀 10 Turnos Cósmicos e o Turno X — Núcleo Dourado
1. **Turno 1: O Salão de Boliche Cósmico** — Formações clássicas de blocos com pinos de boliche sagrados como alvos.
2. **Turno 2: O Tapete Sagrado** — Formações intrincadas em tapeçaria e oportunidades de strike de alto valor.
3. **Turno 3: Elemento Terra** — Barreiras densas em esmeralda e blocos defensivos fortificados.
4. **Turno 4: Elemento Água** — Correntes fluidas em azul e drops harmônicos que expandem a raquete.
5. **Turno 5: Elemento Fogo** — Orbes flamejantes de alta velocidade e desafios de velocidade energizados.
6. **Turno 6: Elemento Ar** — Física sem peso, rajadas evasivas e obstáculos em constante mudança.
7. **Turno 7: O Vazio** — Ilusões, controles cósmicos invertidos e blocos misteriosos.
8. **Turno 8: As Vogais Sagradas (`I-E-O-U-A`)** — Acerte as runas de vogais em sucessão harmônica para recompensas de multiplicador celestial.
9. **Turno 9: A Matriz da Mente** — Estados de fluxo com múltiplos orbes e camadas geométricas densas.
10. **Turno X: Retorno ao Centro** — Escudos orbitais radiais protegendo o Núcleo Dourado central. Atravesse todos os anéis e atinja o núcleo para alcançar a transcendência.

### 🎮 Modos de Jogo
- **Campanha Clássica (10 Turnos)**: Arco narrativo completo com cutscenes filosóficas entre *O Cara*, *O Discípulo* e *O Estranho*.
- **Modo Ondas Infinitas**: Ondas procedurais com dificuldade progressiva, modificadores escalonáveis, bônus de limpeza de onda e registro de pontuação máxima.
- **Desafio Cósmico Diário**: Layouts diários determinísticos e gerados por semente (Mandala, Templo, Labirinto, Vórtice, Diamante), com modificadores especiais (Mistério do Vazio, Orbes Rápidos, Núcleo Blindado) e acompanhamento de sequência diária.

### ⚡ Mecânicas de Jogo e Efeitos Visuais
- **Travessia de Camada Sagrada**: Destruir o último bloco de qualquer camada dispara feedback de tremor de tela, sinais sonoros ressonantes, um feixe de laser dourado horizontal e explosões radiantes de onda de choque.
- **O Medidor de Permanência (Abide Meter)**: Mantenha o fluxo e o movimento constante da raquete para carregar o medidor. Ative o **Modo Abide** para invulnerabilidade temporária, largura de raquete expandida, multiplicador 2x e rastros de partículas celestiais.
- **Sistema Harmônico de Vogais**: Acerte `I → E → O → U → A` em sequência para disparar cânticos cósmicos e grandes surtos de pontuação.
- **Efeitos Hápticos e Visuais**: Explosões de partículas em múltiplos formatos (estrelas `✦`, anéis de halo, orbes brilhantes), anéis de onda de choque e dinâmicas de tremor de tela.

### 🧘 Meditação e Laboratório Sonoro
- **Laboratório Sonoro Interativo**: Console sintetizador em tempo real via Web Audio, com frequências ajustáveis, drones ambientes binaurais, intervalos harmônicos e pads de teste de efeitos sonoros.
- **Modo Meditar**: Guia de respiração ritmada e paisagens sonoras ambientes generativas e relaxantes.

### 🌍 Acessibilidade e Personalização
- **Bilíngue**: Alternância instantânea e fluida entre **Inglês (EN)** e **Português (PT-BR)**.
- **Temas**: **Modo Dia (Linho Quente Sereno)** e **Modo Noite (Vazio Obsidiana Profundo)**.
- **Áudio e Hápticos**: Controles de volume dedicados, alternância de mudo e interruptores de feedback por vibração.

---

## 🛠️ Stack Tecnológica

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Gráficos / Engine**: HTML5 Canvas com física personalizada a 60 FPS, resolução de colisão elástica, emissor de partículas e sistema de tremor de tela
- **Motor de Áudio**: [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) pura (síntese subtrativa, osciladores polifônicos, drones ambientes, ressonância harmônica)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/), [Motion](https://motion.dev/)
- **Tipografia**: Cinzel, Playfair Display, JetBrains Mono

---

## 🚀 Primeiros Passos

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18.0 ou superior recomendada)
- `npm`, `pnpm` ou `yarn`

### Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/dimenuvel/Evangelho-das-Dimenuveis-Abida.git
   cd Evangelho-das-Dimenuveis-Abida 
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento local**:
   ```bash
   npm run dev
   ```

4. **Abra no navegador**:
   Acesse [http://localhost:3000](http://localhost:3000) (ou a porta indicada no seu terminal).

### Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento na porta 3000.
- `npm run build` — Gera o pacote de distribuição de produção em `dist/`.
- `npm run preview` — Pré-visualiza localmente o build de produção.
- `npm run lint` — Executa verificações do compilador TypeScript (`tsc --noEmit`).
- `npm run cap:build` — Compila os recursos web e sincroniza com o projeto Android do Capacitor.
- `npm run cap:open` — Abre o projeto nativo Android no Android Studio.

---

## 📱 APK Android e Workflow do GitHub Actions

Este projeto é empacotado com **Capacitor 8** para Android:

- **Workflow Automatizado de CI/CD**: Localizado em [`.github/workflows/build-apk.yml`](./.github/workflows/build-apk.yml).
- **Ambiente e Dependências**:
  - **Java**: JDK 21 (Temurin)
  - **Android SDK & Build Tools**: API 34+ / 35
  - **Node.js**: 24 LTS
  - **Gradle Wrapper**: Cache automatizado via `gradle/actions/setup-gradle@v4`
- **Artefatos Gerados**: Gera automaticamente o `Abida-O-Jogo.apk` instalável e artefatos de APK de release a cada commit, PR, tag de versão (`v*`) ou disparo manual via `workflow_dispatch`.
- **Conjunto de Ícones em Espiral**: Suíte completa de ícones mipmap em `resources/android/` (`mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`), incluindo versões quadrada, redonda (`ic_launcher_round`), adaptativa em primeiro plano (`ic_launcher_foreground`) e camadas de fundo com a espiral sagrada dourada de Fibonacci.

---

## 🕹️ Controles

| Ação | Mouse / Toque | Teclado |
| :--- | :--- | :--- |
| **Mover Raquete** | Mover o cursor / arrastar o dedo horizontalmente | Seta Esquerda / Direita ou `A` / `D` |
| **Lançar Orbe** | Clicar / Tocar na tela | `Barra de Espaço` / Seta Cima / `W` |
| **Ativar Modo Abide** | Tocar no botão Abide quando carregado | `Enter` / `E` |
| **Pausar / Retomar** | Tocar no botão Pausar | `Esc` / `P` |

---

## 📄 Licença

Distribuído sob a **Licença MIT**. Veja [`LICENSE`](./LICENSE) para mais informações.
