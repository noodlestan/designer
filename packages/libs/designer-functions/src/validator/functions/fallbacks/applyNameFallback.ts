import type { DecisionInputError, LoadedRecord } from '@noodlestan/designer-decisions';

import { isNonEmptyString } from '../../../private';
import { createDecisionNormalizeError } from '../../errors';

import { FALLBACK_MODEL } from './applyModelFallback';

function randomName(): string {
    const id = (Math.random() + 1).toString(36).substring(2, 7);
    return `Unknown decision <${id}>`;
}

export function applyNameFallback(
    loaded: LoadedRecord,
    errors: DecisionInputError[],
    maybeName: unknown | undefined,
): string {
    const errorAttributes = {
        loaded,
        path: '/name',
        schema: 'DecisionInput#-name',
        value: maybeName,
        model: FALLBACK_MODEL,
    };

    if (!isNonEmptyString(maybeName)) {
        const name = randomName();
        const error = createDecisionNormalizeError({
            ...errorAttributes,
            name,
            reason: 'Must be a non-empty string.',
        });
        errors.push(error);
        return name;
    }

    return maybeName;
}
