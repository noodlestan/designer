import { isNonEmptyString } from '../../../private';

import type { RecordValidationErrorAttributes } from './types';

function randomName(): string {
    const id = (Math.random() + 1).toString(36).substring(2, 7);
    return `Unknown decision <${id}>`;
}

export function applyNameFallback(
    errors: RecordValidationErrorAttributes[],
    maybeName: unknown | undefined,
): string {
    const errorAttributes = {
        path: '/name',
        schema: 'DecisionInput#-name',
        value: maybeName,
    };

    if (!isNonEmptyString(maybeName)) {
        const name = randomName();
        errors.push({
            ...errorAttributes,
            reason: 'must be a non-empty string',
        });
        return name;
    }

    return maybeName;
}
