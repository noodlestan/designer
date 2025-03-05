import type { TypefaceValueInput } from '../../../../inputs';
import { createTypeface } from '../../../../primitives';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { TypefaceValue } from '../types';

import { resolveTypefaceValue } from './resolveTypefaceValue';

export const createTypefaceValue = (
    context: ValueContext,
    input?: DeepPartial<TypefaceValueInput>,
): TypefaceValue => {
    const get = () => {
        const literal = resolveTypefaceValue(context, input);
        return createTypeface(context.primitiveContext(literal));
    };

    return createBaseValue(context, get);
};
