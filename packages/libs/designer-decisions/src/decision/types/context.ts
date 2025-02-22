import type {
    DecisionInput,
    DecisionInputError,
    DecisionRef,
    DecisionRefResolver,
} from '../../inputs';

import type { DecisionError } from './errors';

export type DecisionContext = {
    resolve: DecisionRefResolver;
    decisionType: () => string;
    ref: () => DecisionRef;
    inputs: () => DecisionInput[];
    hasErrors: () => boolean;
    errors: () => (DecisionError | DecisionInputError)[];
    addError: (error: DecisionError) => void;
};
