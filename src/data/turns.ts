import { TurnConfig, Cutscene } from '../types/game';
import { Language } from '../i18n/translations';

export const TURNS_CONFIG_EN: Record<number, TurnConfig> = {
  1: {
    id: 1,
    title: 'THE MIRROR OF THE MIND',
    subtitle: 'TURN I',
    layer: 'SILENCE',
    description: 'In the stillness before movement, awareness rests. Observe the reflection without attachment.',
    themeColor: '#8b5cf6',
    accentColor: '#fbbf24',
    ballSpeed: 4.8,
    bgSymbol: '🪞',
    quote: 'Do not destroy the Dimenuous. Recognize it.'
  },
  2: {
    id: 2,
    title: 'THE EYE THAT SEES',
    subtitle: 'TURN II',
    layer: 'VISION',
    description: 'Some patterns hide in darkness until presence approaches. Truth requires open eyes.',
    themeColor: '#3b82f6',
    accentColor: '#38bdf8',
    ballSpeed: 5.2,
    bgSymbol: '👁️',
    quote: 'The Eye reveals what was always there.'
  },
  3: {
    id: 3,
    title: 'THE FLOW OF ENERGY',
    subtitle: 'TURN III',
    layer: 'ENERGY',
    description: 'All structures vibrate and pulse. Rhythm guides the trajectory through shifting motion.',
    themeColor: '#10b981',
    accentColor: '#a7f3d0',
    ballSpeed: 5.6,
    bgSymbol: '🌀',
    quote: 'Just let it roll, man.'
  },
  4: {
    id: 4,
    title: 'THE HEART THAT CONNECTS',
    subtitle: 'TURN IV',
    layer: 'HEART',
    description: 'No brick stands alone. Resonance carries through linked threads across the field.',
    themeColor: '#ec4899',
    accentColor: '#f472b6',
    ballSpeed: 5.8,
    bgSymbol: '💖',
    quote: 'Touch one, move many.'
  },
  5: {
    id: 5,
    title: 'THE WILL THAT CHOOSES',
    subtitle: 'TURN V',
    layer: 'WILL',
    description: 'Obstacles require sustained focus. Will is not force; it is unyielding intention.',
    themeColor: '#f97316',
    accentColor: '#fdba74',
    ballSpeed: 6.0,
    bgSymbol: '⚡',
    quote: 'Choose your strike with steady mind.'
  },
  6: {
    id: 6,
    title: 'THE ELEMENTAL FIELD',
    subtitle: 'TURN VI',
    layer: 'MATTER',
    description: 'Fire, Air, Water, Earth — four forces shape the plane. Harness them in balance.',
    themeColor: '#eab308',
    accentColor: '#ef4444',
    ballSpeed: 6.2,
    bgSymbol: '🔥',
    quote: 'The four elements sustain the Rug.'
  },
  7: {
    id: 7,
    title: 'THE VOID',
    subtitle: 'TURN VII',
    layer: 'VOID',
    description: 'Illusion tempts the hurried mind. Recognize false targets and reversed currents.',
    themeColor: '#a855f7',
    accentColor: '#c084fc',
    ballSpeed: 6.4,
    bgSymbol: '🕳️',
    quote: 'Not everything that appears is real.'
  },
  8: {
    id: 8,
    title: 'THE RETURN',
    subtitle: 'TURN VIII',
    layer: 'RETURN',
    description: 'Movement cycles through endless loops. There is nowhere to escape, only to return.',
    themeColor: '#06b6d4',
    accentColor: '#67e8f9',
    ballSpeed: 6.6,
    bgSymbol: '🔄',
    quote: 'Sometimes you bowl. Sometimes the ball bowls you.'
  },
  9: {
    id: 9,
    title: 'THE DOOR BETWEEN DIMENUOUS',
    subtitle: 'TURN IX',
    layer: 'PERSPECTIVE',
    description: 'Shift your gaze. As perspective tilts, the playfield reveals new dimensional pathways.',
    themeColor: '#14b8a6',
    accentColor: '#5eead4',
    ballSpeed: 6.8,
    bgSymbol: '🚪',
    quote: 'Shift the angle, transform the dimenuous.'
  },
  10: {
    id: 10,
    title: 'THE RETURN TO CENTER',
    subtitle: 'TURN X',
    layer: 'CENTER',
    description: 'The final Turn is not a battle. It is stillness amidst the infinite motion.',
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    ballSpeed: 5.0,
    bgSymbol: '🌌',
    quote: 'You were here the whole time.'
  }
};

export const TURNS_CONFIG_PT: Record<number, TurnConfig> = {
  1: {
    id: 1,
    title: 'O ESPELHO DA MENTE',
    subtitle: 'GIRO I',
    layer: 'SILÊNCIO',
    description: 'Na quietude antes do movimento, a consciência repousa. Observe o reflexo sem apegos.',
    themeColor: '#8b5cf6',
    accentColor: '#fbbf24',
    ballSpeed: 4.8,
    bgSymbol: '🪞',
    quote: 'Não destrua a Dimenúvel. Reconheça-a.'
  },
  2: {
    id: 2,
    title: 'O OLHO QUE VÊ',
    subtitle: 'GIRO II',
    layer: 'VISÃO',
    description: 'Alguns padrões se escondem na escuridão até que a presença se aproxime. A verdade exige olhos abertos.',
    themeColor: '#3b82f6',
    accentColor: '#38bdf8',
    ballSpeed: 5.2,
    bgSymbol: '👁️',
    quote: 'O Olho revela o que sempre esteve lá.'
  },
  3: {
    id: 3,
    title: 'O FLUXO DE ENERGIA',
    subtitle: 'GIRO III',
    layer: 'ENERGIA',
    description: 'Todas as estruturas vibram e pulsacionam. O ritmo guia a trajetória através do movimento.',
    themeColor: '#10b981',
    accentColor: '#a7f3d0',
    ballSpeed: 5.6,
    bgSymbol: '🌀',
    quote: 'Apenas deixe rolar, cara.'
  },
  4: {
    id: 4,
    title: 'O CORAÇÃO QUE CONECTA',
    subtitle: 'GIRO IV',
    layer: 'CORAÇÃO',
    description: 'Nenhum tijolo está sozinho. A ressonância se espalha por fios conectados no campo.',
    themeColor: '#ec4899',
    accentColor: '#f472b6',
    ballSpeed: 5.8,
    bgSymbol: '💖',
    quote: 'Toque em um, mova muitos.'
  },
  5: {
    id: 5,
    title: 'A VONTADE QUE ESCOLHE',
    subtitle: 'GIRO V',
    layer: 'VONTADE',
    description: 'Obstáculos exigem foco sustentado. Vontade não é força; é intenção inabalável.',
    themeColor: '#f97316',
    accentColor: '#fdba74',
    ballSpeed: 6.0,
    bgSymbol: '⚡',
    quote: 'Escolha seu golpe com a mente firme.'
  },
  6: {
    id: 6,
    title: 'O CAMPO ELEMENTAL',
    subtitle: 'GIRO VI',
    layer: 'MATÉRIA',
    description: 'Fogo, Ar, Água, Terra — quatro forças moldam o plano. Domine-as em equilíbrio.',
    themeColor: '#eab308',
    accentColor: '#ef4444',
    ballSpeed: 6.2,
    bgSymbol: '🔥',
    quote: 'Os quatro elementos sustentam o Tapete.'
  },
  7: {
    id: 7,
    title: 'O VAZIO',
    subtitle: 'GIRO VII',
    layer: 'VAZIO',
    description: 'A ilusão tenta a mente apressada. Reconheça alvos falsos e correntes invertidas.',
    themeColor: '#a855f7',
    accentColor: '#c084fc',
    ballSpeed: 6.4,
    bgSymbol: '🕳️',
    quote: 'Nem tudo o que aparece é real.'
  },
  8: {
    id: 8,
    title: 'O RETORNO',
    subtitle: 'GIRO VIII',
    layer: 'RETORNO',
    description: 'O movimento cicla em espirais infinitas. Não há para onde escapar, apenas retornar.',
    themeColor: '#06b6d4',
    accentColor: '#67e8f9',
    ballSpeed: 6.6,
    bgSymbol: '🔄',
    quote: 'Às vezes você joga boliche. Às vezes a bola joga você.'
  },
  9: {
    id: 9,
    title: 'A PORTA ENTRE DIMENÚVEIS',
    subtitle: 'GIRO IX',
    layer: 'PERSPECTIVA',
    description: 'Mude seu olhar. Conforme a perspectiva se inclina, novas dimensões se revelam.',
    themeColor: '#14b8a6',
    accentColor: '#5eead4',
    ballSpeed: 6.8,
    bgSymbol: '🚪',
    quote: 'Mude o ângulo, transforme a dimenúvel.'
  },
  10: {
    id: 10,
    title: 'O RETORNO AO CENTRO',
    subtitle: 'GIRO X',
    layer: 'CENTRO',
    description: 'O Giro final não é uma batalha. É quietude em meio ao movimento infinito.',
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    ballSpeed: 5.0,
    bgSymbol: '🌌',
    quote: 'Você esteve aqui todo esse tempo.'
  }
};

export const getTurnsConfig = (lang: Language = 'en'): Record<number, TurnConfig> => {
  return lang === 'pt' ? TURNS_CONFIG_PT : TURNS_CONFIG_EN;
};

export const TURNS_CONFIG = TURNS_CONFIG_EN;

export const CUTSCENES_EN: Record<number, Cutscene> = {
  1: {
    turnId: 1,
    lines: [
      { speaker: 'DISCIPLE', text: 'Master... am I supposed to control the ball?' },
      { speaker: 'THE DUDE', text: 'Not exactly.' },
      { speaker: 'DISCIPLE', text: 'Then what am I doing with this rug?' },
      { speaker: 'THE DUDE', text: 'Abiding, man. Just catching what comes down.' },
      { speaker: 'DISCIPLE', text: '...while playing Breakout?' },
      { speaker: 'THE DUDE', text: 'Pretty much. Takes the edge off.' }
    ]
  },
  3: {
    turnId: 3,
    lines: [
      { speaker: 'DISCIPLE', text: 'The blocks are pulsing and moving! Is reality breaking down?' },
      { speaker: 'THE DUDE', text: 'Nah. It’s just energy flowing through the Dimenuous. Everything moves, man.' },
      { speaker: 'DISCIPLE', text: 'Should I try to stop them?' },
      { speaker: 'THE DUDE', text: 'Don’t fight the Spiral. Sip your White Russian and move with it.' }
    ]
  },
  6: {
    turnId: 6,
    lines: [
      { speaker: 'DISCIPLE', text: 'Fire, Air, Water, Earth... which element is most powerful?' },
      { speaker: 'THE DUDE', text: 'Water makes the Rug fluid and wide. Earth keeps the floor safe. But balance is the key, man.' },
      { speaker: 'THE STRANGER', text: 'Sometimes you eat the bar, and sometimes, well... the bar eats you.' },
      { speaker: 'THE DUDE', text: 'That’s deep, Stranger. Care for a game of cosmic pins?' }
    ]
  },
  7: {
    turnId: 7,
    lines: [
      { speaker: 'DISCIPLE', text: 'Some of these bricks disappear right before the ball hits them! And my controls feel upside down!' },
      { speaker: 'THE DUDE', text: 'That’s the Void playing tricks on your mind. Not everything that appears is real.' },
      { speaker: 'DISCIPLE', text: 'How do I pass it?' },
      { speaker: 'THE DUDE', text: 'Recognize the pattern. Keep your center steady.' }
    ]
  },
  9: {
    turnId: 9,
    lines: [
      { speaker: 'DISCIPLE', text: 'We are approaching Turn X! What happens when we finally escape the dimenuous?' },
      { speaker: 'THE DUDE', text: 'Escape? Who said anything about escaping?' },
      { speaker: 'DISCIPLE', text: 'Isn’t that the goal of the Gospel?' },
      { speaker: 'THE DUDE', text: 'Heh. You’ll see in Turn X. Just keep the ball rolling.' }
    ]
  }
};

export const CUTSCENES_PT: Record<number, Cutscene> = {
  1: {
    turnId: 1,
    lines: [
      { speaker: 'DISCIPLE', text: 'Mestre... eu deveria controlar a bola?' },
      { speaker: 'THE DUDE', text: 'Não exatamente.' },
      { speaker: 'DISCIPLE', text: 'Então o que estou fazendo com este tapete?' },
      { speaker: 'THE DUDE', text: 'Abidando, cara. Apenas pegando o que vem caindo.' },
      { speaker: 'DISCIPLE', text: '...enquanto jogo Breakout?' },
      { speaker: 'THE DUDE', text: 'Pois é, cara. Alivia a tensão.' }
    ]
  },
  3: {
    turnId: 3,
    lines: [
      { speaker: 'DISCIPLE', text: 'Os blocos estão pulsando e se movendo! A realidade está desmoronando?' },
      { speaker: 'THE DUDE', text: 'Que nada. É só a energia fluindo pelas Dimenúveis. Tudo se move, cara.' },
      { speaker: 'DISCIPLE', text: 'Eu deveria tentar pará-los?' },
      { speaker: 'THE DUDE', text: 'Não lute contra a Espiral. Tome seu White Russian e mova-se com ela.' }
    ]
  },
  6: {
    turnId: 6,
    lines: [
      { speaker: 'DISCIPLE', text: 'Fogo, Ar, Água, Terra... qual elemento é mais poderoso?' },
      { speaker: 'THE DUDE', text: 'A Água deixa o Tapete fluido e amplo. A Terra mantém o chão seguro. Mas o equilíbrio é a chave, cara.' },
      { speaker: 'THE STRANGER', text: 'Às vezes você come o bar, e às vezes, bem... o bar come você.' },
      { speaker: 'THE DUDE', text: 'Isso é profundo, Estranho. Quer uma partida de pino cósmico?' }
    ]
  },
  7: {
    turnId: 7,
    lines: [
      { speaker: 'DISCIPLE', text: 'Alguns blocos desaparecem pouco antes de a bola atingi-los! E meus controles parecem invertidos!' },
      { speaker: 'THE DUDE', text: 'É o Vazio pregando peças na sua mente. Nem tudo o que aparece é real.' },
      { speaker: 'DISCIPLE', text: 'Como eu passo disso?' },
      { speaker: 'THE DUDE', text: 'Reconheça o padrão. Mantenha seu centro firme.' }
    ]
  },
  9: {
    turnId: 9,
    lines: [
      { speaker: 'DISCIPLE', text: 'Estamos chegando ao Giro X! O que acontece quando finalmente escaparmos das dimenúveis?' },
      { speaker: 'THE DUDE', text: 'Escapar? Quem disse algo sobre escapar?' },
      { speaker: 'DISCIPLE', text: 'Não é esse o objetivo do Evangelho?' },
      { speaker: 'THE DUDE', text: 'Heh. Você verá no Giro X. Apenas mantenha a bola rolando.' }
    ]
  }
};

export const getCutscene = (turnId: number, lang: Language = 'en'): Cutscene | undefined => {
  const cutscenes = lang === 'pt' ? CUTSCENES_PT : CUTSCENES_EN;
  return cutscenes[turnId];
};

export const CUTSCENES = CUTSCENES_EN;
