import { maybeErrorMessage, serializeMaybeError } from '../../errors';
import type { DecisionUnexpectedError } from '../types';

import { UnknownDecisionModelError } from './UnknownDecisionModelError';
import { UnknownDecisionTypeError } from './UnknownDecisionTypeError';

type Attributes = Omit<DecisionUnexpectedError, 'message'>;

export const createDecisionUnexpectedError = (attributes: Attributes): DecisionUnexpectedError => {
    const { context, error } = attributes;

    const isWellKnown = error instanceof UnknownDecisionTypeError || UnknownDecisionModelError;

    const message = () => {
        const ref = context.ref();
        const refStr = JSON.stringify(ref);
        const errStr = !isWellKnown
            ? serializeMaybeError(error, ' {}.')
            : maybeErrorMessage(error, ' {}');
        return `Unexpected error in ${refStr}.${errStr}`;
    };

    return {
        ...attributes,
        message,
    };
};
