import { DecisionContextsInput, DecisionUsageInput } from '../primitives';

export type DecisionInput = {
    id?: string;
    type: string;
    name: string;
    description?: string;
    contexts?: DecisionContextsInput;
    usage?: DecisionUsageInput;
    params: Record<string, unknown>;
};
