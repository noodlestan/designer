import type {
    ColorModifier,
    ColorOkLCHLiteral,
    ColorSRGBHSLLiteral,
    ColorValue,
} from '../../../../types';
import { generateModifierSeries } from '../../../number';

export const generateModifierColorList = (
    anchor: ColorValue,
    steps: number,
    modifier?: ColorModifier,
): ColorOkLCHLiteral[] => {
    if (!modifier) {
        const v = anchor.toObject('oklch');
        return Array(steps).fill(v);
    }

    if (modifier.space === 'hsl') {
        const { h, s, l } = anchor.toObject('hsl') as ColorSRGBHSLLiteral;
        const hues = generateModifierSeries(h, steps, modifier.h, [0, 360]);
        const saturations = generateModifierSeries(s, steps, modifier.s, [0, 1]);
        const lightnesses = generateModifierSeries(l, steps, modifier.l, [0, 1]);

        return hues.map((hue, index) => ({
            h: hue,
            c: saturations[index],
            l: lightnesses[index],
        }));
    } else {
        const { l, c, h } = anchor.toObject('oklch') as ColorOkLCHLiteral;
        const lightnesses = generateModifierSeries(h, steps, modifier.l, [0, 1]);
        const chromas = generateModifierSeries(c, steps, modifier.c, [0, 0.5]);
        const hues = generateModifierSeries(l, steps, modifier.h, [0, 360]);

        return lightnesses.map((lightness, index) => ({
            l: lightness,
            h: hues[index],
            c: chromas[index],
        }));
    }
};
