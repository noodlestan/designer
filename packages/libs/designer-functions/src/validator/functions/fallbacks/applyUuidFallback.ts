import type { DecisionInputError, LoadedRecord } from '@noodlestan/designer-decisions';

import { isNonEmptyString } from '../../../private';
import { createDecisionNormalizeError } from '../../errors';

function randomUuid(): string {
    // WIP
    const id = (Math.random() + 1).toString(36).substring(2, 7);
    return `${id}`;
}

export function applyUuidFallback(
    loaded: LoadedRecord,
    errors: DecisionInputError[],
    maybeUuid: unknown | undefined,
    fallback: { name: string; model: string },
): string | undefined {
    const errorAttributes = {
        loaded,
        path: '/uuid',
        schema: 'DecisionInput#-uuid',
        value: maybeUuid,
        ...fallback,
    };

    if (maybeUuid !== undefined && !isNonEmptyString(maybeUuid)) {
        const error = createDecisionNormalizeError({
            ...errorAttributes,
            reason: 'Must be a non-empty string.',
        });
        errors.push(error);
        return randomUuid();
    }

    return maybeUuid;
}
