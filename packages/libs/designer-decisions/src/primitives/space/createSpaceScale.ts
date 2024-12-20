import type { SpaceInput, SpaceScale, ValueContext } from '../../types';

import { createSpaceValue } from './createSpaceValue';

export const createSpaceScale = (context: ValueContext, input: SpaceInput[]): SpaceScale => {
    return {
        get: () => input.map(item => createSpaceValue(context, item)),
    };
};
