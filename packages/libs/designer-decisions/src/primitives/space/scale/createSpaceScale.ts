import type { SpaceInputValue, SpaceScale, ValueContext } from '../../../types';
import { createSpaceValue } from '../value';

export const createSpaceScale = (context: ValueContext, input: SpaceInputValue[]): SpaceScale => {
    return {
        get: () => input.map(item => createSpaceValue(context, item)),
    };
};
