import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { SpaceScale, SpaceValue } from '../types';

export const createSpaceScale = (context: ValueContext, input: SpaceValue[]): SpaceScale => {
    return createBaseSet(context, input);
};
