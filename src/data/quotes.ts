export interface QuoteItem {
  id: number;
  en: string;
  pt: string;
  speakerEn?: string;
  speakerPt?: string;
}

export const MAIN_PAGE_QUOTES: QuoteItem[] = [
  {
    id: 1,
    en: '"Just let it roll, man. The Rug abides."',
    pt: '"Apenas deixe rolar, mano. O Tapete abida."'
  },
  {
    id: 2,
    en: '"Do not destroy the Dimenuous. Recognize it."',
    pt: '"Não destrua a Dimenúvel. Reconheça-a."'
  },
  {
    id: 3,
    en: '"Let the motion flow without attachment."',
    pt: '"Deixe o movimento fluir sem apego."'
  },
  {
    id: 4,
    en: '"Observe the rise and fall of tension."',
    pt: '"Observe o erguer e cair da tensão."'
  },
  {
    id: 5,
    en: '"When the heart is quiet, the ball strikes true."',
    pt: '"Quando o coração está quieto, a bola acerta o alvo."'
  },
  {
    id: 6,
    en: '"Intent moves the world without effort."',
    pt: '"A intenção move o mundo sem esforço."'
  },
  {
    id: 7,
    en: '"Form is illusion; direction is real."',
    pt: '"A forma é ilusão; a direção é real."'
  },
  {
    id: 8,
    en: '"In emptiness, every bounce is complete."',
    pt: '"No vazio, cada quique é completo."'
  },
  {
    id: 9,
    en: '"All paths lead back to the center."',
    pt: '"Todos os caminhos levam de volta ao centro."'
  },
  {
    id: 10,
    en: '"Shift the angle, transform the dimenuous."',
    pt: '"Mude o ângulo, transforme a dimenúvel."'
  },
  {
    id: 11,
    en: '"The Rug abides in the center of all Turns."',
    pt: '"O Tapete abida no centro de todos os Giros."'
  },
  {
    id: 12,
    en: '"The ball rests. The Rug abides."',
    pt: '"A bola descansa. O Tapete abida."'
  },
  {
    id: 13,
    en: '"Observe without desire to alter. The Spiral moves; you abide."',
    pt: '"Observe sem desejo de alterar. A Espiral se move; você abida."'
  },
  {
    id: 14,
    en: '"Sometimes you eat the bar, and sometimes... the bar eats you."',
    pt: '"Às vezes você come o bar, e às vezes... o bar come você."'
  },
  {
    id: 15,
    en: '"There\'s no rush in the Spiral, man. Take your time."',
    pt: '"Não há pressa na Espiral, mano. Siga no seu tempo."'
  },
  {
    id: 16,
    en: '"Every turn is just another angle on the same Rug."',
    pt: '"Cada giro é apenas outro ângulo no mesmo Tapete."'
  },
  {
    id: 17,
    en: '"The pins don\'t hate you. They\'re just following geometry."',
    pt: '"Os pinos não te odeiam. Eles apenas seguem a geometria."'
  },
  {
    id: 18,
    en: '"Gutter balls happen. What matters is staying on the alley."',
    pt: '"Valetas acontecem. O importante é continuar na pista."'
  },
  {
    id: 19,
    en: '"Recognition is the game."',
    pt: '"Reconhecimento é o jogo."'
  },
  {
    id: 20,
    en: '"Cross the Dimenuous. Return to the center."',
    pt: '"Atravesse a Dimenúvel. Retorne ao centro."'
  }
];

export function getRandomQuote(language: 'en' | 'pt', currentIndex?: number): { quote: string; index: number } {
  let nextIndex = Math.floor(Math.random() * MAIN_PAGE_QUOTES.length);
  if (currentIndex !== undefined && MAIN_PAGE_QUOTES.length > 1) {
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * MAIN_PAGE_QUOTES.length);
    }
  }
  const item = MAIN_PAGE_QUOTES[nextIndex];
  return {
    quote: language === 'pt' ? item.pt : item.en,
    index: nextIndex
  };
}
