import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabChromaScale, OklabChromaValue } from '../types';

export const createOklabChromaScale = (
    context: ValueContext,
    input: OklabChromaValue[],
): OklabChromaScale => {
    return createBaseSet(context, input);
};
