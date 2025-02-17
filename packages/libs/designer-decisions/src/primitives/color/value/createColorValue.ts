import type { ColorValueInput } from '../../../inputs';
import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import type { ColorValue, ColorValueOptions } from '../../types';
import { createColor } from '../helpers';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (
    context: ValueContext,
    input: ColorValueInput,
    options: ColorValueOptions = {},
): ColorValue => {
    context.consume(input);

    const { quantize = 0.1 } = options;
    const literal = resolveColorValue(context, input).toObject('oklch');
    const value = createColor(literal, { quantize });

    return {
        ...createBaseValue(context),
        get: value.get,
        toObject: value.toObject,
        toString: value.toString,
    };
};
