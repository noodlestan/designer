import type { SizeInput } from '../../../inputs';
import { createSize } from '../../../primitives';
import type { ValueContext } from '../../../value';
import { createBaseValue } from '../base-value';

import { resolveSizeBaseValue } from './resolveSizeBaseValue';
import type { SizeBaseOptions, SizeBaseValue, SizeValueDefinition } from './types';

export const createSizeBaseValue = (
    sizeDefinition: SizeValueDefinition,
    context: ValueContext<SizeInput>,
    options?: SizeBaseOptions,
): SizeBaseValue => {
    const get = () => {
        const literal = resolveSizeBaseValue(sizeDefinition, context);
        return createSize(sizeDefinition, context.forPrimitive(literal), options);
    };

    return createBaseValue(context, get);
};
