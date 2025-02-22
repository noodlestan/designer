import type { TypefaceValueInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { TypefaceValue } from '../types';

import { resolveTypefaceValue } from './resolveTypefaceValue';

export const createTypefaceValue = (
    context: ValueContext,
    input: DeepPartial<TypefaceValueInput>,
): TypefaceValue => {
    const baseValue = createBaseValue(context, input);

    const value = resolveTypefaceValue(context, input);

    return {
        ...baseValue,
        get: () => value,
    };
};
