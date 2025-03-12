import type { SizeInputTypefaceInput } from '../../../../inputs';
import { createTypeface } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { TypefaceValue } from '../types';

import { resolveTypefaceValue } from './resolveTypefaceValue';

export const createTypefaceValue = (
    context: ValueContext<SizeInputTypefaceInput>,
): TypefaceValue => {
    const get = () => {
        const literal = resolveTypefaceValue(context);
        return createTypeface(context.forPrimitive(literal));
    };

    return createBaseValue(context, get);
};
