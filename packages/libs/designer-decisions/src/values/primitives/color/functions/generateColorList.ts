import type {
    ColorFormat,
    ColorModifier,
    ColorObjectLiteral,
    ColorOkLCHLiteral,
    ColorSRGBHSLiteral,
} from '../../../../inputs';
import type { ColorValue } from '../../../domains';
import { generateNumberSeries } from '../../number';
import { COLOR_FORMAT_HSL, COLOR_FORMAT_OKLCH } from '../constants';
import { createColor } from '../createColor';

export const generateColorList = <T extends ColorObjectLiteral = ColorObjectLiteral>(
    anchor: ColorValue,
    steps: number = 0,
    modifier?: ColorModifier,
    format: ColorFormat = COLOR_FORMAT_OKLCH,
): T[] => {
    if (!modifier || !steps) {
        const v = anchor.toObject(format);
        return Array(steps).fill(v);
    }

    if (modifier.space === COLOR_FORMAT_HSL) {
        const { h, s, l } = anchor.toObject(COLOR_FORMAT_HSL) as ColorSRGBHSLiteral;
        const hues = generateNumberSeries(h, steps, modifier.h, [0, 360]);
        const sats = generateNumberSeries(s, steps, modifier.s, [0, 1]);
        const lightnesses = generateNumberSeries(l, steps, modifier.l, [0, 1]);

        return hues.map((hue, index) => {
            return createColor({ h: hue, s: sats[index], l: lightnesses[index] }).toObject(format);
        }) as T[];
    } else {
        const { l, c, h } = anchor.toObject(COLOR_FORMAT_OKLCH) as ColorOkLCHLiteral;
        const lightnesses = generateNumberSeries(l, steps, modifier.l, [0, 1]);
        const chromas = generateNumberSeries(c, steps, modifier.c, [0, 0.5]);
        const hues = generateNumberSeries(h, steps, modifier.h, [0, 360]);

        return lightnesses.map((lightness, index) =>
            createColor({ l: lightness, c: chromas[index], h: hues[index] }).toObject(format),
        ) as T[];
    }
};
