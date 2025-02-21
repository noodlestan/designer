import type { TypefaceValueInput } from '../../../inputs';
import type { DeepPartial } from '../../../private';
import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import type { TypefaceValue } from '../../types';

import { resolveTypefaceValue } from './resolveTypefaceValue';

export const createTypefaceValue = (
    context: ValueContext,
    input: DeepPartial<TypefaceValueInput>,
): TypefaceValue => {
    context.consume(input);

    const value = resolveTypefaceValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
    };
};
