import type { DecisionModelFactory } from '../../models';

export const castFactory = (factory: unknown): DecisionModelFactory => {
    return factory as DecisionModelFactory;
};
