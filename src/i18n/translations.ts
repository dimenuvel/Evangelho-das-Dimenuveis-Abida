export type Language = 'en' | 'pt';

export interface TranslationSchema {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  subHeader: string;
  tagline: string;
  dudeQuote: string;

  // Main Menu Buttons & Badges
  playTurn: string;
  selectTurn: string;
  endlessBtn: string;
  endlessTitle: string;
  endlessSubtitle: string;
  tenTurnsBtn: string;
  dailyChallenge: string;
  dailyChallengeSubtitle: string;
  dailyModifier: string;
  dailyBonusScore: string;
  dailyCompleted: string;
  dailyReady: string;
  dailyStreak: string;
  nextChallengeIn: string;
  playDaily: string;
  replayDaily: string;
  dailyChallengeVictory: string;
  dailyBonusAwarded: string;
  daysStreak: string;
  todayChallenge: string;
  wave: string;
  waveCleared: string;
  dimensionShift: string;
  meditate: string;
  soundLab: string;
  theGospel: string;
  backToHome: string;
  bestScore: string;
  topScores: string;
  topScoresBtn: string;
  sacredLeaderboard: string;
  leaderboardSubtitle: string;
  enterYourName: string;
  namePlaceholder: string;
  saveScore: string;
  savedToLeaderboard: string;
  viewTopScores: string;
  rank: string;
  disciple: string;
  turnReached: string;
  date: string;
  noScoresYet: string;
  newHighScore: string;
  close: string;
  tenTurnsTitle: string;
  tenTurnsHeaderSubtitle: string;
  continueCampaign: string;
  turnStatusCompleted: string;
  turnStatusLocked: string;
  allTurnsCleared: string;
  layerLabel: string;
  turnLabel: string;
  rugAbides: string;
  contact: string;

  // Theme
  dayTheme: string;
  nightTheme: string;
  themeMode: string;

  // HUD
  score: string;
  lives: string;
  abideMeter: string;

  // Pause Modal
  pausedTitle: string;
  pausedQuote: string;
  resumeTurn: string;
  restartTurn: string;
  mainMenu: string;

  // Game Over
  gameOverTitle: string;
  gameOverQuote: string;
  tryAgain: string;
  returnToMenu: string;

  // Meditate Modal
  meditateTitle: string;
  meditateQuote: string;
  droneActive: string;

  // Sound Lab Modal
  soundLabTitle: string;
  soundLabSubtitle: string;
  vowelSynthesisTitle: string;
  vowelStep: string;
  testFullHarmony: string;
  turnsSoundscapesTitle: string;
  gameplaySynthTitle: string;
  rugBounce: string;
  pinStrike: string;
  abideChord: string;
  voidDip: string;
  returnToGame: string;

  // Gospel Lore Modal
  gospelTitle: string;
  gospelCoreQuote: string;
  gospelIntro: string;
  sevenLayersTitle: string;
  sacredSymbolsTitle: string;
  symbolRugTitle: string;
  symbolRugDesc: string;
  symbolBallTitle: string;
  symbolBallDesc: string;
  symbolVowelsTitle: string;
  symbolVowelsDesc: string;
  understoodAndAbide: string;

  // Reflections Cutscenes
  reflectionsTitle: string;
  next: string;
  abideAndContinue: string;
  speakerDude: string;
  speakerDisciple: string;
  speakerStranger: string;

  // Turn X Ending
  endingLine1: string;
  endingLine2: string;
  endingLine3: string;
  endingLine4: string;
  endingLine5: string;
  enterBowlingAlley: string;

  // Canvas Game Overlay / Floating Text
  abideModeActive: string;
  ieouaHarmony: string;
  turnCompleted: string;
  voidIllusion: string;
  pausedText: string;

  // Power-ups & Elements
  powerupsTitle: string;
  elementFire: string;
  elementFireDesc: string;
  elementAir: string;
  elementAirDesc: string;
  elementWater: string;
  elementWaterDesc: string;
  elementEarth: string;
  elementEarthDesc: string;
  earthProtects: string;
  voidTrapWarning: string;

  // Vowel Descriptions
  vowelDescI: string;
  vowelDescE: string;
  vowelDescO: string;
  vowelDescU: string;
  vowelDescA: string;

  // Tour & Tutorial
  tourTitle: string;
  tourSubtitle: string;
  skipTour: string;
  startJourney: string;
  previous: string;
  step: string;
  of: string;
  tourMenuBtn: string;
  tourGospelQuoteTag: string;
  tourMechanicTag: string;

  tourStep1Title: string;
  tourStep1Quote: string;
  tourStep1Desc: string;
  tourStep1Mechanic: string;

  tourStep2Title: string;
  tourStep2Quote: string;
  tourStep2Desc: string;
  tourStep2Mechanic: string;

  tourStep3Title: string;
  tourStep3Quote: string;
  tourStep3Desc: string;
  tourStep3Mechanic: string;

  tourStep4Title: string;
  tourStep4Quote: string;
  tourStep4Desc: string;
  tourStep4Mechanic: string;

  tourStep5Title: string;
  tourStep5Quote: string;
  tourStep5Desc: string;
  tourStep5Mechanic: string;

  tourStep6Title: string;
  tourStep6Quote: string;
  tourStep6Desc: string;
  tourStep6Mechanic: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    appTitle: "ABIDE - THE GAME",
    appSubtitle: "THE TEN TURNS",
    subHeader: "GOSPEL OF DIMENUOUS",
    tagline: "\"Recognition is the game.\"",
    dudeQuote: "\"Just let it roll, man. The Rug abides.\"",

    playTurn: "PLAY TURN",
    selectTurn: "SELECT FROM TEN TURNS",
    endlessBtn: "INFINITE",
    endlessTitle: "INFINITE MODE",
    endlessSubtitle: "Endless waves & random dimensions",
    tenTurnsBtn: "10 TURNS",
    dailyChallenge: "DAILY CHALLENGE",
    dailyChallengeSubtitle: "SACRED DAILY CONFIGURATION",
    dailyModifier: "DAILY BLESSING",
    dailyBonusScore: "DAILY BONUS",
    dailyCompleted: "COMPLETED",
    dailyReady: "READY TO PLAY",
    dailyStreak: "STREAK",
    nextChallengeIn: "Next challenge in",
    playDaily: "PLAY DAILY",
    replayDaily: "REPLAY DAILY",
    dailyChallengeVictory: "DAILY CHALLENGE CLEARED!",
    dailyBonusAwarded: "+2,500 DAILY BONUS POINTS!",
    daysStreak: "Days",
    todayChallenge: "TODAY'S CHALLENGE",
    wave: "WAVE",
    waveCleared: "WAVE CLEARED!",
    dimensionShift: "DIMENSION SHIFT",
    meditate: "MEDITATE",
    soundLab: "SOUND LAB",
    theGospel: "GOSPEL",
    backToHome: "BACK TO HOME",
    bestScore: "BEST SCORE",
    topScores: "TOP 10 SCORES",
    topScoresBtn: "TOP 10",
    sacredLeaderboard: "SACRED RECORD OF SCORES",
    leaderboardSubtitle: "The highest achievements across the Ten Turns",
    enterYourName: "Enter your name for the record:",
    namePlaceholder: "Your name / Disciple",
    saveScore: "SAVE SCORE",
    savedToLeaderboard: "RECORDED IN TOP 10!",
    viewTopScores: "VIEW TOP 10",
    rank: "RANK",
    disciple: "DISCIPLE",
    turnReached: "TURN",
    date: "DATE",
    noScoresYet: "No sacred scores recorded yet.",
    newHighScore: "NEW HIGH SCORE!",
    close: "CLOSE",
    tenTurnsTitle: "THE TEN TURNS OF THE SPIRAL",
    tenTurnsHeaderSubtitle: "MAIN CAMPAIGN • CHOOSE YOUR SACRED TURN",
    continueCampaign: "CONTINUE CAMPAIGN",
    turnStatusCompleted: "COMPLETED",
    turnStatusLocked: "LOCKED",
    allTurnsCleared: "ALL 10 TURNS CLEARED",
    layerLabel: "DIMENUOUS",
    turnLabel: "TURN",
    rugAbides: "\"The Rug abides\"",
    contact: "Contact",

    dayTheme: "DAY",
    nightTheme: "NIGHT",
    themeMode: "THEME",

    score: "SCORE",
    lives: "LIVES",
    abideMeter: "ABIDE METER",

    pausedTitle: "STILLNESS (PAUSED)",
    pausedQuote: "\"The ball rests. The Rug abides.\"",
    resumeTurn: "RESUME TURN",
    restartTurn: "RESTART TURN",
    mainMenu: "MAIN MENU",

    gameOverTitle: "THE BALL HAS RESTED",
    gameOverQuote: "\"Loss is merely a state of motion. Abide and try again.\"",
    tryAgain: "TRY TURN",
    returnToMenu: "RETURN TO MENU",

    meditateTitle: "MEDITATION OF THE SPIRAL",
    meditateQuote: "\"Observe without desire to alter. The Spiral moves; you abide.\"",
    droneActive: "Solfeggio 432Hz Drone Active",

    soundLabTitle: "IEOUA SOUND LAB",
    soundLabSubtitle: "\"The Web Audio engine synthesizes procedural soundscapes for all Ten Turns and the IEOUA vocal sequence without external samples.\"",
    vowelSynthesisTitle: "IEOUA VOWEL FORMANT SYNTHESIS",
    vowelStep: "STEP",
    testFullHarmony: "TEST FULL IEOUA HARMONY CASCADE",
    turnsSoundscapesTitle: "TEN TURNS PROCEDURAL SOUNDSCAPES",
    gameplaySynthTitle: "GAMEPLAY SYNTH FREQUENCIES",
    rugBounce: "Rug Bounce Thud",
    pinStrike: "Pin Strike Crash",
    abideChord: "Abide Mode Chord",
    voidDip: "Void Illusion Dip",
    returnToGame: "RETURN TO GAME",

    gospelTitle: "GOSPEL OF DIMENUOUS",
    gospelCoreQuote: "\"Do not destroy the Dimenuous. Recognize it. Cross it. Return to the center.\"",
    gospelIntro: "Gospel of Dimenuous reveals that existence unfolds in ten spiraling turns across distinct dimenuous of consciousness.",
    sevenLayersTitle: "THE TEN DIMENUOUS OF THE SPIRAL",
    sacredSymbolsTitle: "SACRED SYMBOLS",
    symbolRugTitle: "The Rug",
    symbolRugDesc: "Represents your grounded presence (the Paddle) that receives and redirects experience without tension.",
    symbolBallTitle: "The Bowling Ball",
    symbolBallDesc: "Awareness in motion. It does not destroy; it travels through the Dimenuous.",
    symbolVowelsTitle: "I E O U A",
    symbolVowelsDesc: "The five vowel sequence representing beginning, opening, organizing, connecting, and manifesting.",
    understoodAndAbide: "UNDERSTOOD & ABIDE",

    reflectionsTitle: "REFLECTIONS FROM THE DIMENUOUS",
    next: "NEXT",
    abideAndContinue: "ABIDE & CONTINUE",
    speakerDude: "THE DUDE",
    speakerDisciple: "DISCIPLE",
    speakerStranger: "THE STRANGER",

    endingLine1: "You have traversed the Ten Turns of the Spiral.",
    endingLine2: "The bricks were never obstacles; they were reflections.",
    endingLine3: "The ball never fell; it returned to the floor.",
    endingLine4: "The Rug has always abided.",
    endingLine5: "You are in the Cosmic Bowling Alley of the Center.",
    enterBowlingAlley: "ENTER THE COSMIC BOWLING ALLEY",

    abideModeActive: "ABIDE MODE ACTIVE!",
    ieouaHarmony: "I E O U A HARMONY",
    turnCompleted: "TURN COMPLETED!",
    voidIllusion: "VOID ILLUSION",
    pausedText: "PAUSED",

    powerupsTitle: "ELEMENTAL POWER-UPS",
    elementFire: "FIRE",
    elementFireDesc: "Fire Sphere: Penetrates through all blocks without bouncing.",
    elementAir: "AIR",
    elementAirDesc: "Air Gust: Grants rapid and swift paddle speed.",
    elementWater: "WATER",
    elementWaterDesc: "Water Flow: Expands the Sacred Rug paddle.",
    elementEarth: "EARTH",
    elementEarthDesc: "Earth Barrier: Saves the ball from falling into the void.",
    earthProtects: "EARTH PROTECTS!",
    voidTrapWarning: "RECOGNIZE THE PATTERN",

    vowelDescI: "Beginning (523Hz)",
    vowelDescE: "Opening (440Hz)",
    vowelDescO: "Organizing (329Hz)",
    vowelDescU: "Connecting (220Hz)",
    vowelDescA: "Manifesting (659Hz)",

    // Tour & Tutorial
    tourTitle: "SACRED TOUR & GOSPEL GUIDE",
    tourSubtitle: "The mechanics of the game explained through the Gospel of the Dimenúveis",
    skipTour: "Skip",
    startJourney: "Begin Journey & Abide",
    previous: "Previous",
    step: "Step",
    of: "of",
    tourMenuBtn: "Sacred Tour",
    tourGospelQuoteTag: "GOSPEL DOCTRINE",
    tourMechanicTag: "PLAYFIELD MECHANICS",

    tourStep1Title: "The Gospel & The Sacred Rug",
    tourStep1Quote: "\"The Dude abides in the center of all things. The Rug ties the room and the cosmos together.\"",
    tourStep1Desc: "Existence manifests as ten swirling cloud dimensions ('Dimenúveis'). Your role is not to fight or stress, but to abide in calm awareness.",
    tourStep1Mechanic: "You control the Sacred Rug (paddle) using your mouse, touch dragging, or keyboard arrows (← / →). Move smoothly without panic to receive and redirect every roll.",

    tourStep2Title: "The 10 Turns & Cosmic Bowling Ball",
    tourStep2Quote: "\"The ball is consciousness in continuous motion. It does not destroy the clouds; it travels through them.\"",
    tourStep2Desc: "Each Turn represents a deeper layer of consciousness, progressing from Turn 1 (Physical/Terrestrial) all the way to Turn X (The Divine Center).",
    tourStep2Mechanic: "Bounce the cosmic bowling ball to illuminate and dissolve cloud blocks. Strike golden pins for massive point bonuses. Clear all required blocks to advance to the next Turn.",

    tourStep3Title: "The Abide Meter & Enlightened Flow",
    tourStep3Quote: "\"When the mind is still, the rug broadens, the speed softens, and the universe aligns.\"",
    tourStep3Desc: "Rushing leads to gutters; patience builds divine resonance. Sustaining continuous volleys charges your spiritual flow.",
    tourStep3Mechanic: "Keep the ball in continuous play and hit pins to charge the bottom Abide Meter. At 100%, ABIDE MODE triggers automatically: your paddle expands, glows with golden aura, and multiplies all points for 12 seconds!",

    tourStep4Title: "Sacred Vowels (I • E • O • U • A)",
    tourStep4Quote: "\"From Beginning (I) through Organization (O) to Manifestation (A), harmonic sound restores cosmic order.\"",
    tourStep4Desc: "The five sacred vowels vibrate at Solfeggio frequencies (523Hz, 440Hz, 329Hz, 220Hz, 659Hz).",
    tourStep4Mechanic: "Watch the top header for the vowel sequence. Hit the blocks corresponding to the active letter in order (I → E → O → U → A) to unlock a 500-point Harmony surge and fill your Abide gauge instantly!",

    tourStep5Title: "Elemental Powers & Void Illusions",
    tourStep5Quote: "\"Receive the four elements with gratitude; recognize the deceptive illusions of the void without fear.\"",
    tourStep5Desc: "Falling orbs represent the fundamental cosmic energies that assist your journey through the clouds.",
    tourStep5Mechanic: "Catch glowing orbs: 🔥 FIRE (piercing ball), 💨 AIR (extreme paddle speed), 💧 WATER (expanded rug), and 🛡️ EARTH (ground barrier saving fallen balls). Beware purple VOID ILLUSIONS that temporarily invert controls!",

    tourStep6Title: "Infinite Mode & Sacred Sound Lab",
    tourStep6Quote: "\"The spiral has no beginning and no end. Wherever you go, there you abide.\"",
    tourStep6Desc: "Beyond the 10-turn campaign awaits an infinite procedural realm and pure meditative frequencies.",
    tourStep6Mechanic: "Explore Infinite Mode for endless score attacks, use the Meditate chamber for breathing exercises, or enter the Sound Lab to synthesize pure 432Hz & 528Hz healing tones."
  },
  pt: {
    appTitle: "ABIDA - O JOGO",
    appSubtitle: "OS DEZ GIROS",
    subHeader: "EVANGELHO DAS DIMENÚVEIS",
    tagline: "\"Reconhecimento é o jogo.\"",
    dudeQuote: "\"Apenas deixe rolar, mano. O Tapete abida.\"",

    playTurn: "JOGAR GIRO",
    selectTurn: "SELECIONAR DOS DEZ GIROS",
    endlessBtn: "INFINITO",
    endlessTitle: "MODO INFINITO",
    endlessSubtitle: "Ondas sem fim e dimensões aleatórias",
    tenTurnsBtn: "10 GIROS",
    dailyChallenge: "DESAFIO DIÁRIO",
    dailyChallengeSubtitle: "CONFIGURAÇÃO SAGRADA DIÁRIA",
    dailyModifier: "BÊNÇÃO DIÁRIA",
    dailyBonusScore: "BÔNUS DIÁRIO",
    dailyCompleted: "CONCLUÍDO",
    dailyReady: "DISPONÍVEL",
    dailyStreak: "SEQUÊNCIA",
    nextChallengeIn: "Próximo desafio em",
    playDaily: "JOGAR DIÁRIO",
    replayDaily: "REJOGAR DIÁRIO",
    dailyChallengeVictory: "DESAFIO DIÁRIO CONCLUÍDO!",
    dailyBonusAwarded: "+2.500 PONTOS DE BÔNUS DIÁRIO!",
    daysStreak: "Dias",
    todayChallenge: "DESAFIO DE HOJE",
    wave: "ONDA",
    waveCleared: "ONDA CONCLUÍDA!",
    dimensionShift: "TRANSIÇÃO DIMENSIONAL",
    meditate: "MEDITAR",
    soundLab: "LABORATÓRIO DE SOM",
    theGospel: "EVANGELHO",
    backToHome: "VOLTAR AO INÍCIO",
    bestScore: "MELHOR PONTUAÇÃO",
    topScores: "TOP 10 PONTUAÇÕES",
    topScoresBtn: "TOP 10",
    sacredLeaderboard: "REGISTRO SAGRADO DE PONTUAÇÕES",
    leaderboardSubtitle: "As maiores conquistas através dos Dez Giros",
    enterYourName: "Digite seu nome para o registro sagrado:",
    namePlaceholder: "Seu nome / Discípulo",
    saveScore: "SALVAR PONTUAÇÃO",
    savedToLeaderboard: "REGISTRADO NO TOP 10!",
    viewTopScores: "VER TOP 10",
    rank: "POS",
    disciple: "DISCÍPULO",
    turnReached: "GIRO",
    date: "DATA",
    noScoresYet: "Nenhuma pontuação sagrada registrada ainda.",
    newHighScore: "NOVA PONTUAÇÃO RECORDE!",
    close: "FECHAR",
    tenTurnsTitle: "OS DEZ GIROS DA ESPIRAL",
    tenTurnsHeaderSubtitle: "JORNADA PRINCIPAL • ESCOLHA SEU GIRO SAGRADO",
    continueCampaign: "CONTINUAR JORNADA",
    turnStatusCompleted: "CONCLUÍDO",
    turnStatusLocked: "BLOQUEADO",
    allTurnsCleared: "TODOS OS 10 GIROS CONCLUÍDOS",
    layerLabel: "DIMENÚVEIS",
    turnLabel: "GIRO",
    rugAbides: "\"O Tapete abida\"",
    contact: "Contato",

    dayTheme: "DIA",
    nightTheme: "NOITE",
    themeMode: "TEMA",

    score: "PONTUAÇÃO",
    lives: "VIDAS",
    abideMeter: "MEDIDOR DE ABIDA",

    pausedTitle: "QUIETUDE (PAUSADO)",
    pausedQuote: "\"A bola descansa. O Tapete abida.\"",
    resumeTurn: "CONTINUAR GIRO",
    restartTurn: "REINICIAR GIRO",
    mainMenu: "MENU PRINCIPAL",

    gameOverTitle: "A BOLA DESCANÇOU",
    gameOverQuote: "\"A perda é apenas um estado de movimento. Abida e tente novamente.\"",
    tryAgain: "TENTAR GIRO",
    returnToMenu: "VOLTAR AO MENU",

    meditateTitle: "MEDITAÇÃO DA ESPIRAL",
    meditateQuote: "\"Observe sem desejo de alterar. A Espiral se move; você abida.\"",
    droneActive: "Tom Solfeggio 432Hz Ativo",

    soundLabTitle: "LABORATÓRIO DE SOM IEOUA",
    soundLabSubtitle: "\"O motor Web Audio sintetiza paisagens sonoras procedurais para todos os Dez Giros e a sequência vocal IEOUA sem amostras externas.\"",
    vowelSynthesisTitle: "SÍNTESE DE FORMANTES VOGAIS IEOUA",
    vowelStep: "PASSO",
    testFullHarmony: "TESTAR CASCATA DE HARMONIA IEOUA",
    turnsSoundscapesTitle: "PAISAGENS SONORAS PROCEDURAIS DOS DEZ GIROS",
    gameplaySynthTitle: "FREQUÊNCIAS SINTETIZADAS DE JOGO",
    rugBounce: "Batida do Tapete",
    pinStrike: "Impacto dos Pinos",
    abideChord: "Acorde do Modo Abida",
    voidDip: "Queda da Ilusão do Vazio",
    returnToGame: "VOLTAR AO JOGO",

    gospelTitle: "EVANGELHO DAS DIMENÚVEIS",
    gospelCoreQuote: "\"Não destrua a Dimenúvel. Reconheça-a. Atravesse-a. Retorne ao centro.\"",
    gospelIntro: "Evangelho das Dimenúveis revela que a existência se desdobra em dez giros em espiral através de diferentes dimenúveis de consciência.",
    sevenLayersTitle: "AS DEZ DIMENÚVEIS DA ESPIRAL",
    sacredSymbolsTitle: "SÍMBOLOS SAGRADOS",
    symbolRugTitle: "O Tapete",
    symbolRugDesc: "Representa sua presença centrada (a Raquete) que recebe e redireciona a experiência sem tensão.",
    symbolBallTitle: "A Bola de Boliche",
    symbolBallDesc: "Consciência em movimento. Ela não destrói; ela viaja pelas Dimenúveis.",
    symbolVowelsTitle: "I E O U A",
    symbolVowelsDesc: "A sequência das cinco vogais representando início, abertura, organização, conexão e manifestação.",
    understoodAndAbide: "ENTENDIDO E ABIDA",

    reflectionsTitle: "REFLEXÕES DAS DIMENÚVEIS",
    next: "PRÓXIMO",
    abideAndContinue: "ABIDA E CONTINUAR",
    speakerDude: "O CARA",
    speakerDisciple: "DISCÍPULO",
    speakerStranger: "O ESTRANHO",

    endingLine1: "Você atravessou os Dez Giros da Espiral.",
    endingLine2: "Os tijolos nunca foram obstáculos; eram reflexos.",
    endingLine3: "A bola nunca caiu; ela retornou ao chão.",
    endingLine4: "O Tapete sempre abida.",
    endingLine5: "Você está na Pista de Boliche Cósmica do Centro.",
    enterBowlingAlley: "ENTRAR NA PISTA DE BOLICHE CÓSMICA",

    abideModeActive: "MODO ABIDA ATIVO!",
    ieouaHarmony: "HARMONIA I E O U A",
    turnCompleted: "GIRO CONCLUÍDO!",
    voidIllusion: "ILUSÃO DO VAZIO",
    pausedText: "PAUSADO",

    powerupsTitle: "PODERES ELEMENTAIS",
    elementFire: "FOGO",
    elementFireDesc: "Esfera de Fogo: Atravessa e incinera todos os blocos sem ricochetear.",
    elementAir: "AR",
    elementAirDesc: "Sopro de Ar: Confere agilidade e velocidade extrema ao Tapete Sagrado.",
    elementWater: "ÁGUA",
    elementWaterDesc: "Fluxo d'Água: Expande a largura do Tapete Sagrado.",
    elementEarth: "TERRA",
    elementEarthDesc: "Barreira da Terra: Cria um escudo inferior que salva a bola do abismo.",
    earthProtects: "A TERRA PROTEGE!",
    voidTrapWarning: "RECONHEÇA O PADRÃO",

    vowelDescI: "Início (523Hz)",
    vowelDescE: "Abertura (440Hz)",
    vowelDescO: "Organização (329Hz)",
    vowelDescU: "Conexão (220Hz)",
    vowelDescA: "Manifestação (659Hz)",

    // Tour & Tutorial
    tourTitle: "TOUR SAGRADO & GUIA DO EVANGELHO",
    tourSubtitle: "As mecânicas do jogo reveladas através da sabedoria das Dimenúveis",
    skipTour: "Pular",
    startJourney: "Iniciar Jornada & Abidar",
    previous: "Anterior",
    step: "Passo",
    of: "de",
    tourMenuBtn: "Tour Sagrado",
    tourGospelQuoteTag: "DOUTRINA DO EVANGELHO",
    tourMechanicTag: "MECÂNICAS DO JOGO",

    tourStep1Title: "O Evangelho & O Tapete Sagrado",
    tourStep1Quote: "\"O Cara abida no centro de todas as coisas. O Tapete une o ambiente e o cosmos em harmonia.\"",
    tourStep1Desc: "A existência se desdobra em dez camadas de nuvens de consciência ('Dimenúveis'). Seu propósito não é o estresse ou a pressa, mas abidar em calma e centramento.",
    tourStep1Mechanic: "Você controla o Tapete Sagrado (raquete) usando o mouse, deslizando o dedo no celular ou através das setas (← / →). Mova-se suavemente para acolher e redirecionar a bola.",

    tourStep2Title: "Os 10 Giros & A Bola de Boliche Cósmica",
    tourStep2Quote: "\"A bola é a consciência em movimento contínuo. Ela não destrói as nuvens; ela viaja através delas.\"",
    tourStep2Desc: "Cada Giro representa um plano mais profundo de evolução, iniciando no Giro 1 (Físico/Terrestre) até o misterioso Giro X (O Centro Cósmico).",
    tourStep2Mechanic: "Rebata a bola cósmica para iluminar e dissolver os blocos de nuvens. Acerte os pinos sagrados para grandes bônus de pontuação. Conclua os blocos para avançar ao próximo Giro.",

    tourStep3Title: "O Medidor de Abida & Estado de Iluminação",
    tourStep3Quote: "\"Quando a mente está serena, o tapete se expande, o ritmo abranda e o universo se alinha.\"",
    tourStep3Desc: "A pressa leva à canaleta; a serenidade constrói ressonância divina. Manter a bola em jogo contínuo carrega sua energia espiritual.",
    tourStep3Mechanic: "Mantenha a bola viva em jogo e acerte pinos para encher a barra de Abida no rodapé. Em 100%, o MODO ABIDA ativa-se automaticamente: o tapete se alarga, ganha aura dourada e multiplica seus pontos por 12 segundos!",

    tourStep4Title: "As Vogais Sagradas (I • E • O • U • A)",
    tourStep4Quote: "\"Do Início (I), passando pela Organização (O) até a Manifestação (A), o som harmônico restaura a ordem cósmica.\"",
    tourStep4Desc: "As cinco vogais sagradas vibram em frequências Solfeggio puras (523Hz, 440Hz, 329Hz, 220Hz, 659Hz).",
    tourStep4Mechanic: "Observe o topo da tela. Acerte os blocos correspondentes à vogal ativa na ordem exata (I → E → O → U → A) para conquistar 500 pontos bônus e encher sua barra de Abida imediatamente!",

    tourStep5Title: "Poderes Elementais & Ilusões do Vazio",
    tourStep5Quote: "\"Acolha os quatro elementos com gratidão; reconheça as ilusões enganosas do vazio sem temor.\"",
    tourStep5Desc: "Esferas cósmicas caem durante o jogo trazendo bênçãos sagradas da natureza.",
    tourStep5Mechanic: "Colete as esferas: 🔥 FOGO (atravessa todos os blocos), 💨 AR (super agilidade da raquete), 💧 ÁGUA (expansão do tapete) e 🛡️ TERRA (barreira inferior que salva a bola do abismo). Cuidado com as ILUSÕES DO VAZIO roxas que invertem seus controles!",

    tourStep6Title: "Modo Infinito & Laboratório de Som Sagrado",
    tourStep6Quote: "\"A espiral não tem começo nem fim. Para onde quer que você vá, lá você abida.\"",
    tourStep6Desc: "Além da jornada dos 10 giros, desfrute do modo infinito sem fim e de frequências sonoras regenerativas.",
    tourStep6Mechanic: "Desafie ondas infinitas de pontuação, pratique respiração guiada no modo Meditar ou sintetize frequências puras de 432Hz e 528Hz no Laboratório de Som."
  }
};
