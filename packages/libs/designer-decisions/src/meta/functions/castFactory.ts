import type { DecisionModelFactory } from '../../types';

export const castFactory = (factory: unknown): DecisionModelFactory => {
    return factory as DecisionModelFactory;
};
