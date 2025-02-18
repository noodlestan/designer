import type {
    DecisionInput,
    DecisionInputError,
    DecisionRef,
    DecisionRefResolver,
} from '../../inputs';

import type { DecisionError } from './errors';

export type DecisionContext = {
    ref: () => DecisionRef;
    resolve: DecisionRefResolver;
    inputs: () => DecisionInput[];
    hasErrors: () => boolean;
    errors: () => (DecisionError | DecisionInputError)[];
    addError: (error: DecisionError) => void;
};
