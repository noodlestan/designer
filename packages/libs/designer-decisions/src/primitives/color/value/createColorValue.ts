import type {
    ColorInputValue,
    ColorObjectLiteral,
    ColorOkLCHLiteral,
    ColorOkLabLiteral,
    ColorSpaceName,
    ColorValue,
    DecisionValueContext,
} from '../../../types';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (
    context: DecisionValueContext,
    input: ColorInputValue,
): ColorValue => {
    const value = resolveColorValue(context, input);

    const toObject = (space: ColorSpaceName): ColorObjectLiteral => {
        if (space === 'oklch') {
            const [l, c, h] = value.oklch();
            return { l, c, h };
        } else if (space === 'oklab') {
            const [l, a, b] = value.oklab();
            return { l, a, b };
        } else if (space === 'hsl') {
            const [h, s, l] = value.hsl();
            return { h, s, l };
        }
        const [r, g, b] = value.rgb();
        return { r, g, b };
    };

    const toString = (space: ColorSpaceName) => {
        if (space === 'oklch') {
            const object = toObject(space) as ColorOkLCHLiteral;
            return `oklch(${object.l * 100}% ${object.c} ${object.h})`;
        } else if (space === 'oklab') {
            const object = toObject(space) as ColorOkLabLiteral;
            return `oklab(${object.l * 100}% ${object.a} ${object.b})`;
        } else if (space === 'hsl') {
            return value.css('hsl');
        }
        return value.hex('rgb');
    };

    return {
        get: () => value,
        toObject,
        toString,
    };
};
