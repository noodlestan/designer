import type { ValueContext } from '../../../value';

import type { BaseValueAbstract } from './types';

export const createBaseValue = (context: ValueContext): BaseValueAbstract => ({
    context: () => context,
});
