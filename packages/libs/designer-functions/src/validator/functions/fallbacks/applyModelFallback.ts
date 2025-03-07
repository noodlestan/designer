import { isNonEmptyString } from '../../../private';

import type { RecordValidationErrorAttributes } from './types';

export const FALLBACK_MODEL = 'unknown/unknown';

export function applyModelFallback(
    errors: RecordValidationErrorAttributes[],
    maybeModel: unknown | undefined,
): string {
    const errorAttributes = {
        path: '/model',
        schema: 'DecisionInput#-model',
        value: maybeModel,
    };

    if (!isNonEmptyString(maybeModel)) {
        const error = {
            ...errorAttributes,
            reason: 'must be a non-empty string',
        };
        errors.push(error);
        return FALLBACK_MODEL;
    }

    return maybeModel;
}
