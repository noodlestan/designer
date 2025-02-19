import type { DecisionInputError, LoadedRecord } from '@noodlestan/designer-decisions';

import { isNonEmptyString } from '../../../private';
import { createDecisionNormalizeError } from '../../errors';

export const FALLBACK_MODEL = 'unknown/unknown';

export function applyModelFallback(
    loaded: LoadedRecord,
    errors: DecisionInputError[],
    maybeModel: unknown | undefined,
    fallback: { name: string },
): string {
    const errorAttributes = {
        loaded,
        path: '/model',
        schema: 'DecisionInput#-model',
        value: maybeModel,
        model: FALLBACK_MODEL,
        ...fallback,
    };

    if (!isNonEmptyString(maybeModel)) {
        const error = createDecisionNormalizeError({
            ...errorAttributes,
            reason: 'Must be a non-empty string.',
        });
        errors.push(error);
        return FALLBACK_MODEL;
    }

    return maybeModel;
}
