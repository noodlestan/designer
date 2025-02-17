import type { DecisionRef, DecisionRefResolver, InputRecord } from '../../inputs';

import type { DecisionError } from './errors';

export type DecisionContext = {
    ref: () => DecisionRef;
    resolve: DecisionRefResolver;
    inputs: () => InputRecord[];
    hasErrors: () => boolean;
    errors: () => DecisionError[];
    addError: (error: DecisionError) => void;
};
