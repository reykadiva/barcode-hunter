'use client';

import React from 'react';

export type CatVariantId =
  | 'calico'
  | 'gray'
  | 'cyan'
  | 'pink'
  | 'black'
  | 'tabby'
  | 'guest-smiling'
  | 'arashu-smiling';

export type CatActionId =
  | 'none'
  | 'scan'
  | 'items'
  | 'play'
  | 'missions'
  | 'stats'
  | 'history'
  | 'achievements'
  | 'rewards'
  | 'exit';

interface Palette {
  fur: string;
  dark: string;
  light: string;
  label: string;
}

export const CAT_PALETTES: Record<CatVariantId, Palette> = {
  calico: { fur: '#c8935a', dark: '#7b4f2e', light: '#ffffff', label: 'Calico' },
  gray:   { fur: '#9ca3af', dark: '#4b5563', light: '#f3f4f6', label: 'Gray' },
  cyan:   { fur: '#22d3ee', dark: '#0891b2', light: '#ecfeff', label: 'Teal' },
  pink:   { fur: '#f472b6', dark: '#be185d', light: '#fdf2f8', label: 'Pinky' },
  black:  { fur: '#374151', dark: '#111827', light: '#e5e7eb', label: 'Shadow' },
  tabby:  { fur: '#f97316', dark: '#c2410c', light: '#ffedd5', label: 'Tabby' },
  'guest-smiling': { fur: '#374151', dark: '#111827', light: '#e5e7eb', label: 'Guest' },
  'arashu-smiling': { fur: '#f472b6', dark: '#be185d', light: '#fdf2f8', label: 'Arashu' },
};

// Base Cat (16 wide x 18 high)
// We will place this base cat in a 24x24 canvas at offset x=4, y=6
const BASE_CAT_BITMAP: string[] = [
  '....KK....KK....', // 0
  '...KFFK..KFFK...', // 1
  '...KPPK..KPPK...', // 2
  '.KDDFFFFFFFDDK..', // 3
  '.KFFFFFFFFFFFFK.', // 4
  'KFFFFFFFFFFFFFFK', // 5
  'KFFFFFFFFFFFFFFK', // 6
  'KFFKKFFFFFFKKFFK', // 7 (eyes)
  'KFFKKFFFFFFKKFFK', // 8 (eyes)
  'KFFPPFFFFFFPPFFK', // 9 (cheeks)
  'KFFFFFFKKFFFFFFK', // 10 (nose/mouth)
  '.KFFFFFFFFFFFFK.', // 11
  'KFFFFFFFFFFFFFFK', // 12
  'KFLLLLLLLLLLLLFK', // 13
  'KFLLLLLLLLLLLLFK', // 14
  'KFLLK......KLLFK', // 15
  'KFLLK......KLLFK', // 16
  '.KLLK......KLLK.', // 17
];

interface Pixel {
  x: number;
  y: number;
  color: string;
  className?: string;
}

interface PixelCatProps {
  variant?: CatVariantId;
  action?: CatActionId;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export function PixelCat({
  variant = 'calico',
  action = 'none',
  size = 64,
  className,
  'aria-label': ariaLabel,
}: PixelCatProps) {
  const palette = CAT_PALETTES[variant] || CAT_PALETTES.calico;
  const pixels: Pixel[] = [];

  // Helper to safely set pixel color
  const setPixel = (x: number, y: number, color: string, pixelClassName?: string) => {
    if (x >= 0 && x < 24 && y >= 0 && y < 24) {
      pixels.push({ x, y, color, className: pixelClassName });
    }
  };

  // 1. Draw Base Cat (shifted x=4, y=6)
  const catOffsetX = 4;
  const catOffsetY = 6;

  BASE_CAT_BITMAP.forEach((row, rIdx) => {
    row.split('').forEach((char, cIdx) => {
      const px = catOffsetX + cIdx;
      const py = catOffsetY + rIdx;

      let color: string | null = null;
      let isEye = false;
      let isEar = false;

      // 1. Overrides for arashu-smiling (princess pink cat)
      if (variant === 'arashu-smiling') {
        // Crown peaks
        if (rIdx === 1 && (cIdx === 6 || cIdx === 8 || cIdx === 10)) char = 'C';
        // Crown base
        else if (rIdx === 2 && (cIdx >= 6 && cIdx <= 10)) char = 'C';
        
        // Smiling arch eyes: Left eye
        else if (rIdx === 6 && cIdx === 3) char = 'K';
        else if (rIdx === 7 && (cIdx === 2 || cIdx === 4)) char = 'K';
        // Smiling arch eyes: Right eye
        else if (rIdx === 6 && cIdx === 12) char = 'K';
        else if (rIdx === 7 && (cIdx === 11 || cIdx === 13)) char = 'K';
        // Clear default eyes (turn them into fur color)
        else if ((rIdx === 7 || rIdx === 8) && (cIdx === 3 || cIdx === 4 || cIdx === 11 || cIdx === 12)) char = 'F';

        // Smiling mouth
        else if (rIdx === 11 && (cIdx === 6 || cIdx === 9)) char = 'K';
      }

      if (char === 'K') color = '#1a1a1a';
      else if (char === 'F') color = palette.fur;
      else if (char === 'D') color = palette.dark;
      else if (char === 'P') color = '#f9a8d4'; // pink inner ear / cheek
      else if (char === 'L') color = palette.light;
      else if (char === 'C') color = '#eab308'; // Gold crown

      // Class classifications for CSS keyframe target animations
      if (char === 'K' && (rIdx === 7 || rIdx === 8) && (cIdx === 3 || cIdx === 4 || cIdx === 11 || cIdx === 12)) {
        isEye = true;
      }
      if (rIdx < 3) {
        isEar = true;
      }

      // Handle smiling faces (Guest/Arashu)
      if ((variant === 'guest-smiling' || variant === 'arashu-smiling') && rIdx === 10 && (cIdx === 7 || cIdx === 8)) {
        // change nose/mouth to sweet pink smile
        color = '#f472b6';
      }

      if (color) {
        setPixel(
          px,
          py,
          color,
          isEye ? 'cat-eye' : isEar ? 'cat-ear' : undefined
        );
      }
    });
  });

  // 2. Draw Actions / Accessories Overlay
  if (action === 'scan') {
    // Laser scanner gun (x=16..22, y=14..20)
    const scanGunColors: Record<string, string> = {
      G: '#4b5563', // Gun metal
      Y: '#f59e0b', // Yellow body
      R: '#ef4444', // Laser emitter
    };
    const gunGrid = [
      '..YYY.',
      '.YGGGY',
      'YGGGGY',
      'YGRRGY',
      '.YGGY.',
      '..YY..',
    ];
    gunGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(16 + c, 14 + r, scanGunColors[char]);
        }
      });
    });
    // Red laser scanning beam (horizontal laser line)
    for (let lx = 1; lx < 17; lx++) {
      setPixel(lx, 17, '#ef4444', 'scan-laser');
    }
  } else if (action === 'items') {
    // Shopping basket (x=2..21, y=16..23)
    // Brown basket body with pink details
    const basketColors: Record<string, string> = {
      B: '#78350f', // dark brown
      L: '#d97706', // light brown
      H: '#9ca3af', // handle gray
    };
    const basketGrid = [
      'H..................H',
      '.H................H.',
      '..HHHHHHHHHHHHHHHH..',
      '..BBBBBBBBBBBBBBBB..',
      '..BLLLLLLLLLLLLLLB..',
      '...BLLLLLLLLLLLLB...',
      '...BBBBBBBBBBBBBB...',
    ];
    basketGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(2 + c, 17 + r, basketColors[char]);
        }
      });
    });
  } else if (action === 'play') {
    // Gamepad controller held by cat
    const padColors: Record<string, string> = {
      C: '#1f2937', // gamepad body
      R: '#ef4444', // red button
      B: '#3b82f6', // blue button
      G: '#10b981', // green dpad
    };
    const padGrid = [
      '..CCCCCC..',
      '.CGCCCCBC.',
      'CGGCCCCRBC',
      '.CCCCCCBC.',
      '..CCCCCC..',
    ];
    padGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(7 + c, 15 + r, padColors[char]);
        }
      });
    });
  } else if (action === 'missions') {
    // Scroll / Checklist parchment (x=3..20, y=15..22)
    const paperColors: Record<string, string> = {
      P: '#fef08a', // yellow parchment
      W: '#ffffff', // bright paper
      B: '#1e293b', // scroll rollers/lines
      C: '#22c55e', // checkmark green
    };
    const scrollGrid = [
      'BBBBBBBBBBBBBBBB',
      'BPPPPPPPPPPPPPPB',
      'BPWCCWWWWWWWWWWB',
      'BPWWWWWWWWWWWWWB',
      'BPWCCWWWWWWWWWWB',
      'BPWWWWWWWWWWWWWB',
      'BPPPPPPPPPPPPPPB',
      'BBBBBBBBBBBBBBBB',
    ];
    scrollGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(4 + c, 15 + r, paperColors[char]);
        }
      });
    });
  } else if (action === 'stats') {
    // Glasses (black rectangles on eyes)
    for (let gx = 6; gx <= 9; gx++) setPixel(gx, 13, '#111827');
    for (let gx = 14; gx <= 17; gx++) setPixel(gx, 13, '#111827');
    setPixel(10, 13, '#111827');
    setPixel(11, 13, '#111827');
    setPixel(12, 13, '#111827');
    setPixel(13, 13, '#111827');

    // Bar chart on side (x=17..22, y=13..22)
    const chartColors: Record<string, string> = {
      G: '#22c55e', // Green bar
      Y: '#eab308', // Yellow bar
      P: '#ec4899', // Pink bar
      B: '#1e293b', // border
    };
    const chartGrid = [
      '....P.',
      '....P.',
      '..Y.P.',
      '..Y.P.',
      'G.Y.P.',
      'G.Y.P.',
      'G.Y.P.',
      'BBBBBB',
    ];
    chartGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(17 + c, 14 + r, chartColors[char]);
        }
      });
    });
  } else if (action === 'history') {
    // Retro Pocket-watch / Clock face
    const clockColors: Record<string, string> = {
      G: '#eab308', // Gold rim
      W: '#ffffff', // Clock face
      H: '#1e293b', // Hands
    };
    const clockGrid = [
      '...GG...',
      '.GGWGGG.',
      'GGWWWHGG',
      'GWWWHHwG',
      'GGWWWWGG',
      '.GGGGGG.',
    ];
    clockGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(15 + c, 15 + r, clockColors[char]);
        }
      });
    });
  } else if (action === 'achievements') {
    // Shiny Crown on top of head (x=7..16, y=1..5)
    const crownColors: Record<string, string> = {
      G: '#eab308', // Gold
      Y: '#facc15', // Yellow highlight
      R: '#ef4444', // Red gem
      B: '#3b82f6', // Blue gem
    };
    const crownGrid = [
      'R...B...R',
      'G...G...G',
      'GG.GGG.GG',
      'GYYYYYYYG',
      'GGGGGGGGG',
    ];
    crownGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(7 + c, 1 + r, crownColors[char]);
        }
      });
    });

    // Gold Trophy around cat bottom
    const trophyColors: Record<string, string> = {
      T: '#d97706', // Gold shadow
      G: '#facc15', // Trophy main gold
      W: '#ffffff', // Shine
    };
    const trophyGrid = [
      'GG.......GG',
      'GG.......GG',
      '.GGGGGGGGG.',
      '..TGGGGGT..',
      '...TGGGT...',
      '....GGG....',
      '...TGGGT...',
      '..GGGGGGG..',
    ];
    trophyGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(6 + c, 16 + r, trophyColors[char]);
        }
      });
    });
  } else if (action === 'rewards') {
    // Red gift box with yellow ribbon wrapping the cat body
    const giftColors: Record<string, string> = {
      R: '#ef4444', // Red box
      Y: '#facc15', // Yellow ribbon
      W: '#ffffff', // shine
    };
    const giftGrid = [
      'YYYY..YYYY',
      'RRRR..RRRR',
      'RRYY..YYRR',
      'RRYY..YYRR',
      'RRYY..YYRR',
      'RRYY..YYRR',
      'RRYY..YYRR',
    ];
    giftGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(7 + c, 17 + r, giftColors[char]);
        }
      });
    });
  } else if (action === 'exit') {
    // Retro wooden door frame on left side
    const doorColors: Record<string, string> = {
      D: '#78350f', // Door frame
      W: '#fcd34d', // Golden inside light
      K: '#1e293b', // Knob
    };
    const doorGrid = [
      'DDDDDDD',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWDKW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DWWWWW',
      'DDDDDD',
    ];
    doorGrid.forEach((row, r) => {
      row.split('').forEach((char, c) => {
        if (char !== '.') {
          setPixel(1 + c, 8 + r, doorColors[char]);
        }
      });
    });
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className || ''} pixel-cat-svg`}
      style={{ imageRendering: 'pixelated' }}
      aria-label={ariaLabel ?? `${palette.label} pixel cat`}
      role="img"
    >
      <style>{`
        .pixel-cat-svg {
          display: inline-block;
          overflow: visible;
        }
        /* Ears twitching animation */
        .cat-ear {
          transform-origin: 12px 10px;
          animation: earTwitch 4s steps(1) infinite;
        }
        @keyframes earTwitch {
          0%, 90%, 94%, 100% { transform: translateY(0); }
          92% { transform: translateY(1px); }
          96% { transform: translateY(-1px); }
        }
        /* Eyes blinking animation */
        .cat-eye {
          animation: eyeBlink 5s steps(1) infinite;
        }
        @keyframes eyeBlink {
          0%, 96%, 100% { opacity: 1; }
          98% { opacity: 0.1; }
        }
        /* Scanning laser pulse animation */
        .scan-laser {
          animation: laserPulse 1.5s ease-in-out infinite;
        }
        @keyframes laserPulse {
          0%, 100% { opacity: 0.3; fill: #ef4444; }
          50% { opacity: 1; fill: #f87171; }
        }
      `}</style>
      {pixels.map((p, idx) => (
        <rect
          key={idx}
          x={p.x}
          y={p.y}
          width={1}
          height={1}
          fill={p.color}
          className={p.className}
        />
      ))}
    </svg>
  );
}
