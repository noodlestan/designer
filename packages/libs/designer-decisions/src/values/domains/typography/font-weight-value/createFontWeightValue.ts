import type { FontWeightInput } from '../../../../inputs';
import { createFontWeight } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { FontWeightValue } from '../types';

import { resolveFontWeightValue } from './resolveFontWeightValue';

export const createFontWeightValue = (
    context: ValueContext<FontWeightInput>,
    // options: FontWeightValueOptions = {},
): FontWeightValue => {
    const get = () => {
        const literal = resolveFontWeightValue(context);
        return createFontWeight(context.forPrimitive(literal));
    };

    return createBaseValue(context, get);
};
