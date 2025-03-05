import { type SizeLiteral, type SizeValueInput, isDecisionRef } from '../../../inputs';
import type { DeepPartial } from '../../../private';
import type { ValueContext } from '../../../value';

import { resolveSizeBaseValueRef } from './resolveSizeBaseValueRef';
import type { SizeValueDefinition } from './types';

export const resolveSizeBaseValue = (
    sizeDefinition: SizeValueDefinition,
    context: ValueContext,
    input?: DeepPartial<SizeValueInput>,
): DeepPartial<SizeLiteral> | undefined => {
    if (isDecisionRef(input)) {
        return resolveSizeBaseValueRef(sizeDefinition, context, input);
    }

    return input as DeepPartial<SizeLiteral> | undefined;
};
