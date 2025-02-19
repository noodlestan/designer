import type { DecisionInputError, LoadedRecord } from '@noodlestan/designer-decisions';

import { isObject } from '../../../private';
import { createDecisionNormalizeError } from '../../errors';

const FALLBACK_PARAMS = {};

export function applyParamsFallback(
    loaded: LoadedRecord,
    errors: DecisionInputError[],
    maybeParams: unknown | undefined,
    fallback: { name: string; model: string },
): object {
    const errorAttributes = {
        loaded,
        path: '/params',
        schema: 'DecisionInput#-params',
        value: maybeParams,
        ...fallback,
    };

    if (!isObject(maybeParams) || !Object.keys(maybeParams).length) {
        const error = createDecisionNormalizeError({
            ...errorAttributes,
            reason: 'Must be a non-empty object.',
        });
        errors.push(error);
        return FALLBACK_PARAMS;
    }

    return maybeParams;
}
