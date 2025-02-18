import type { DecisionContextsInput } from './contexts';
import type { DecisionUsageInput } from './usage';

export type DecisionId = string;
export type DecisionName = string;
export type DecisionModelName = string;

export type InputRecord = {
    uuid?: DecisionId;
    model: DecisionModelName;
    name: DecisionName;
    description?: string;
    contexts?: DecisionContextsInput;
    usage?: DecisionUsageInput;
    params: object;
};
