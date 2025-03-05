import type {
    ColorFormat,
    ColorModifier,
    ColorObjectLiteral,
    ColorOkLCHLiteral,
    ColorSRGBHSLiteral,
} from '../../../../inputs';
import { createPrimitiveContext } from '../../../../primitive';
import { generateNumberSeries } from '../../../number';
import { COLOR_FORMAT_HSL, COLOR_FORMAT_OKLCH } from '../../channel/constants';
import { createColor } from '../createColor';
import type { Color } from '../types';

export const generateColorList = <T extends ColorObjectLiteral = ColorObjectLiteral>(
    anchor: Color,
    steps: number = 0,
    modifier?: ColorModifier,
    format: ColorFormat = COLOR_FORMAT_OKLCH,
): T[] => {
    if (!modifier || !steps) {
        const v = anchor.toObject({ format });
        return Array(steps).fill(v);
    }

    if (modifier.space === COLOR_FORMAT_HSL) {
        const { h, s, l } = anchor.toObject({ format: COLOR_FORMAT_HSL }) as ColorSRGBHSLiteral;
        const hues = generateNumberSeries(h, steps, modifier.h, [0, 360]);
        const sats = generateNumberSeries(s, steps, modifier.s, [0, 1]);
        const lights = generateNumberSeries(l, steps, modifier.l, [0, 1]);

        return hues.map((hue, index) => {
            const context = createPrimitiveContext({ h: hue, s: sats[index], l: lights[index] });
            return createColor(context).toObject({
                format,
            });
        }) as T[];
    } else {
        const { l, c, h } = anchor.toObject({ format: COLOR_FORMAT_OKLCH }) as ColorOkLCHLiteral;
        const lights = generateNumberSeries(l, steps, modifier.l, [0, 1]);
        const chromas = generateNumberSeries(c, steps, modifier.c, [0, 0.5]);
        const hues = generateNumberSeries(h, steps, modifier.h, [0, 360]);

        return lights.map((light, index) => {
            const context = createPrimitiveContext({ l: light, c: chromas[index], h: hues[index] });
            return createColor(context).toObject({ format });
        }) as T[];
    }
};
