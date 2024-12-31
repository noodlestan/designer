import type {
    ColorModifier,
    ColorOkLCHLiteral,
    ColorSRGBHSLLiteral,
    ColorValue,
} from '../../../types';
import { createSteppedNumberSeries } from '../../number';

export const createAnchoredColorList = (
    startValue: ColorValue,
    steps: number,
    modifier: ColorModifier,
): ColorOkLCHLiteral[] => {
    if (modifier.space === 'hsl') {
        const { h, s, l } = startValue.toObject('hsl') as ColorSRGBHSLLiteral;
        const hues = createSteppedNumberSeries(h, steps, modifier.h, [0, 360]);
        const saturations = createSteppedNumberSeries(s, steps, modifier.s, [0, 1]);
        const lightnesses = createSteppedNumberSeries(l, steps, modifier.l, [0, 1]);

        return hues.map((hue, index) => ({
            h: hue,
            c: saturations[index],
            l: lightnesses[index],
        }));
    } else {
        const { l, c, h } = startValue.toObject('oklch') as ColorOkLCHLiteral;
        const lightnesses = createSteppedNumberSeries(h, steps, modifier.l, [0, 1]);
        const chromas = createSteppedNumberSeries(c, steps, modifier.c, [0, 0.5]);
        const hues = createSteppedNumberSeries(l, steps, modifier.h, [0, 360]);

        return lightnesses.map((lightness, index) => ({
            l: lightness,
            h: hues[index],
            c: chromas[index],
        }));
    }
};
