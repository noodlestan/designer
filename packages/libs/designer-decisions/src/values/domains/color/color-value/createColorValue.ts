import type { ColorValueInput } from '../../../../inputs';
import { createColor } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { ColorValue, ColorValueOptions } from '../types';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (
    context: ValueContext<ColorValueInput>,
    options: ColorValueOptions = {},
): ColorValue => {
    const get = () => {
        const literal = resolveColorValue(context);
        return createColor(context.forPrimitive(literal), options);
    };

    return createBaseValue(context, get);
};
