import type { BaseValueAbstract, ValueContext } from '../../types';

export const createBaseValue = (context: ValueContext): BaseValueAbstract => ({
    context: () => context,
});
