export type ColorInput =
    | string
    | number
    | { h: number; s: number; l: number }
    | { h: number; s: number; v: number }
    | { ref: string };

export type ColorSpaceName = 'rgb' | 'hsl' | 'hsv';
