import type { FontWeightInput } from '../../../../inputs';
import { createFontWeight } from '../../../../primitives';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { FontWeightValue } from '../types';

import { resolveFontWeightValue } from './resolveFontWeightValue';

export const createFontWeightValue = (
    context: ValueContext,
    input?: DeepPartial<FontWeightInput>,
    // options: FontWeightValueOptions = {},
): FontWeightValue => {
    const get = () => {
        const literal = resolveFontWeightValue(context, input);
        return createFontWeight(context.primitiveContext(literal));
    };

    return createBaseValue(context, get);
};
