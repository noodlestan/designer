import type { BaseValueAbstract, DecisionValueContext } from '../../types';

export const createBaseValue = (context: DecisionValueContext): BaseValueAbstract => ({
    context: () => context,
});
