import type {
    ColorFormat,
    ColorInputValue,
    ColorObjectLiteral,
    ColorOkLCHLiteral,
    ColorOkLabLiteral,
    ColorValue,
    DecisionValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';

import { resolveColorValue } from './resolveColorValue';

const round = (value: number, precision: number): number => {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
};

export const createColorValue = (
    context: DecisionValueContext,
    input: ColorInputValue,
): ColorValue => {
    context.consume(input);

    const value = resolveColorValue(context, input);

    const toObject = (format: ColorFormat): ColorObjectLiteral => {
        if (format === 'oklch') {
            const [l, c, h] = value.oklch();
            return { l: l || 0, c: c || 0, h: h || 0 };
        } else if (format === 'oklab') {
            const [l, a, b] = value.oklab();
            return { l, a, b };
        } else if (format === 'hsl') {
            const [h, s, l] = value.hsl();
            return { h, s, l };
        }
        const [r, g, b] = value.rgb();
        return { r, g, b };
    };

    const toString = (format: ColorFormat, precision: number = 2) => {
        const p = precision;
        if (format === 'oklch') {
            const object = toObject(format) as ColorOkLCHLiteral;
            return `oklch(${round(object.l * 100, p)}% ${round(object.c, p)} ${round(object.h || 0, p)}deg)`;
        } else if (format === 'oklab') {
            const object = toObject(format) as ColorOkLabLiteral;
            return `oklab(${object.l * 100}% ${object.a} ${object.b})`;
        } else if (format === 'hsl') {
            return value.css('hsl');
        }
        return value.hex('rgb');
    };

    return {
        ...createBaseValue(context),
        get: () => value,
        toObject,
        toString,
    };
};
