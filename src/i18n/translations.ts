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
  meditate: string;
  soundLab: string;
  theGospel: string;
  backToHome: string;
  bestScore: string;
  tenTurnsTitle: string;
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

  // Vowel Descriptions
  vowelDescI: string;
  vowelDescE: string;
  vowelDescO: string;
  vowelDescU: string;
  vowelDescA: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    appTitle: "ABIDE",
    appSubtitle: "THE TEN TURNS",
    subHeader: "O EVANGELHO DAS DIMENÚVEIS",
    tagline: "\"Recognition is the game.\"",
    dudeQuote: "\"Just let it roll, man. The Rug abides.\"",

    playTurn: "PLAY TURN",
    selectTurn: "SELECT FROM TEN TURNS",
    meditate: "MEDITATE",
    soundLab: "SOUND LAB",
    theGospel: "THE GOSPEL",
    backToHome: "BACK TO HOME",
    bestScore: "BEST SCORE",
    tenTurnsTitle: "THE TEN TURNS OF THE SPIRAL",
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

    gospelTitle: "THE GOSPEL OF THE DIMENUOUS",
    gospelCoreQuote: "\"Do not destroy the Dimenuous. Recognize it. Cross it. Return to the center.\"",
    gospelIntro: "The Gospel of the Dimenuous reveals that existence unfolds in ten spiraling turns across distinct dimenuous of consciousness.",
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

    vowelDescI: "Beginning (523Hz)",
    vowelDescE: "Opening (440Hz)",
    vowelDescO: "Organizing (329Hz)",
    vowelDescU: "Connecting (220Hz)",
    vowelDescA: "Manifesting (659Hz)"
  },

  pt: {
    appTitle: "ABIDA",
    appSubtitle: "OS DEZ GIROS",
    subHeader: "O EVANGELHO DAS DIMENÚVEIS",
    tagline: "\"Reconhecimento é o jogo.\"",
    dudeQuote: "\"Apenas deixe rolar, cara. O Tapete abida.\"",

    playTurn: "JOGAR GIRO",
    selectTurn: "SELECIONAR DOS DEZ GIROS",
    meditate: "MEDITAR",
    soundLab: "LABORATÓRIO DE SOM",
    theGospel: "O EVANGELHO",
    backToHome: "VOLTAR AO INÍCIO",
    bestScore: "MELHOR PONTUAÇÃO",
    tenTurnsTitle: "OS DEZ GIROS DA ESPIRAL",
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

    gameOverTitle: "A BOLA DESCANCOU",
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

    gospelTitle: "O EVANGELHO DAS DIMENÚVEIS",
    gospelCoreQuote: "\"Não destrua a Dimenúvel. Reconheça-a. Atravesse-a. Retorne ao centro.\"",
    gospelIntro: "O Evangelho das Dimenúveis revela que a existência se desdobra em dez giros em espiral através de diferentes dimenúveis de consciência.",
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

    vowelDescI: "Início (523Hz)",
    vowelDescE: "Abertura (440Hz)",
    vowelDescO: "Organização (329Hz)",
    vowelDescU: "Conexão (220Hz)",
    vowelDescA: "Manifestação (659Hz)"
  }
};
