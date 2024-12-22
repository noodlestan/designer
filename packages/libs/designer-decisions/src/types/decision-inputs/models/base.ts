import type { DecisionContextsInput, DecisionUsageInput } from '../primitives';

export type DecisionId = string;
export type DecisionName = string;
export type DecisionModelName = string;

export type DecisionInputBase = {
    uuid?: DecisionId;
    model: DecisionModelName;
    name: DecisionName;
    description?: string;
    contexts?: DecisionContextsInput;
    usage?: DecisionUsageInput;
    params: object;
};
