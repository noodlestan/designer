import chroma from 'chroma-js';

import type {
    ColorModifier,
    ColorOkLCHLiteral,
    ColorSRGBHSLiteral,
    ColorValue,
} from '../../../../types';
import { generateNumberSeries } from '../../../number';

export const generateModifierColorList = (
    anchor: ColorValue,
    steps: number,
    modifier?: ColorModifier,
): ColorSRGBHSLiteral[] => {
    if (!modifier) {
        const v = anchor.toObject('oklch');
        return Array(steps).fill(v);
    }

    if (modifier.space === 'hsl') {
        const { h, s, l } = anchor.toObject('hsl') as ColorSRGBHSLiteral;
        const hues = generateNumberSeries(h, steps, modifier.h, [0, 360]);
        const saturations = generateNumberSeries(s, steps, modifier.s, [0, 1]);
        const lightnesses = generateNumberSeries(l, steps, modifier.l, [0, 1]);

        return hues.map((hue, index) => ({
            h: hue,
            s: saturations[index],
            l: lightnesses[index],
        }));
    } else {
        const { l, c, h } = anchor.toObject('oklch') as ColorOkLCHLiteral;
        const lightnesses = generateNumberSeries(l, steps, modifier.l, [0, 1]);
        const chromas = generateNumberSeries(c, steps, modifier.c, [0, 0.5]);
        const hues = generateNumberSeries(h, steps, modifier.h, [0, 360]);

        return lightnesses.map((lightness, index) => {
            const color = chroma.oklch(lightness, chromas[index], hues[index]);
            const [h, s, l] = chroma(color).hsl();
            return { h: h || 0, s: s || 0, l: l || 0 };
        });
    }
};
