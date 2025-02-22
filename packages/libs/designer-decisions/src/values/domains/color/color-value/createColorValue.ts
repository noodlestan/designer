import type { ColorValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import { type ColorValue, type ColorValueOptions, createColor } from '../../../primitives';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (
    context: ValueContext,
    input: ColorValueInput,
    options: ColorValueOptions = {},
): ColorValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = 0.1 } = options;
    const literal = resolveColorValue(context, input).toObject('oklch');
    const value = createColor(literal, { quantize });

    return {
        ...baseValue,
        get: value.get,
        toObject: value.toObject,
        toString: value.toString,
    };
};
