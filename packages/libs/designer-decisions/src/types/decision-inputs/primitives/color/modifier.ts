import type { NumberModifier } from '../numbers';

export type ColorModifierHSL = {
    space: 'hsl';
    h?: NumberModifier;
    s?: NumberModifier;
    l?: NumberModifier;
};

export type ColorModifierLCH = {
    space: 'oklch';
    l?: NumberModifier;
    c?: NumberModifier;
    h?: NumberModifier;
};

export type ColorModifier = ColorModifierLCH | ColorModifierHSL;

export type AnchoredColorListParams = {
    before?: {
        modifier: ColorModifier;
        steps: number;
    };
    after?: {
        modifier: ColorModifier;
        steps: number;
    };
    precision?: number;
};
