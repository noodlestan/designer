import type { DecisionInput } from '../types';

export const createStaticInput = (params: object = {}): DecisionInput => {
    return {
        model: '<static>',
        name: '<static>',
        params,
    };
};
