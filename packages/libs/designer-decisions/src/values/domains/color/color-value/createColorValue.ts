import type { ColorValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import { COLOR_FORMAT_OKLCH, createColor } from '../../../primitives';
import type { ColorValue, ColorValueOptions } from '../types';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (
    context: ValueContext,
    input: ColorValueInput,
    options: ColorValueOptions = {},
): ColorValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = 0.1 } = options;
    const literal = resolveColorValue(context, input).toObject(COLOR_FORMAT_OKLCH);
    const value = createColor(literal, { quantize });

    return {
        ...baseValue,
        get: value.get,
        toObject: value.toObject,
        toString: value.toString,
    };
};
