import type { DecisionInputError, LoadedRecord } from '@noodlestan/designer-decisions';

import { isNonEmptyString, md5Sync } from '../../../private';
import { createDecisionNormalizeError } from '../../errors';

export function applyUuidFallback(
    loaded: LoadedRecord,
    errors: DecisionInputError[],
    maybeUuid: unknown | undefined,
    fallback: { name: string; model: string },
): string {
    const errorAttributes = {
        loaded,
        path: '/uuid',
        schema: 'DecisionInput#-uuid',
        value: maybeUuid,
        ...fallback,
    };

    if (maybeUuid !== undefined) {
        if (!isNonEmptyString(maybeUuid)) {
            const error = createDecisionNormalizeError({
                ...errorAttributes,
                reason: 'Must be a non-empty string.',
            });
            errors.push(error);
        }
    }

    if (isNonEmptyString(maybeUuid)) {
        return maybeUuid;
    }
    const str = JSON.stringify(loaded);
    return md5Sync(str);
}
