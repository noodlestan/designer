import type { LoadedRecord } from '@noodlestan/designer-decisions';

import { isNonEmptyString, md5Sync } from '../../../private';

import type { RecordValidationErrorAttributes } from './types';

export function applyUuidFallback(
    loaded: LoadedRecord,
    errors: RecordValidationErrorAttributes[],
    maybeUuid: unknown | undefined,
): string {
    const errorAttributes = {
        path: '/uuid',
        schema: 'DecisionInput#-uuid',
        value: maybeUuid,
    };

    if (maybeUuid !== undefined) {
        if (!isNonEmptyString(maybeUuid)) {
            const error = {
                ...errorAttributes,
                reason: 'must be a non-empty string',
            };
            errors.push(error);
        }
    }

    if (isNonEmptyString(maybeUuid)) {
        return maybeUuid;
    }
    const str = JSON.stringify(loaded);
    return md5Sync(str);
}
