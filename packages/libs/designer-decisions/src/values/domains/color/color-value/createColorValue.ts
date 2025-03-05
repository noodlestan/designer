import type { ColorValueInput } from '../../../../inputs';
import { createColor } from '../../../../primitives';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { ColorValue, ColorValueOptions } from '../types';

import { resolveColorValue } from './resolveColorValue';

export const createColorValue = (
    context: ValueContext,
    input?: DeepPartial<ColorValueInput>,
    options: ColorValueOptions = {},
): ColorValue => {
    const get = () => {
        const literal = resolveColorValue(context, input);
        return createColor(context.primitiveContext(literal), options);
    };

    return createBaseValue(context, get);
};
