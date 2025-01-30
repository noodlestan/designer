import type { ColorValue, ColorValueInput, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (context: ValueContext, input: ColorValueInput): ColorValue => {
    context.consume(input);

    const value = resolveColorValue(context, input);

    return {
        ...createBaseValue(context),
        get: value.get,
        toObject: value.toObject,
        toString: value.toString,
    };
};
