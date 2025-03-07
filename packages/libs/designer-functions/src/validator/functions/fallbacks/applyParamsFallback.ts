import { isObject } from '../../../private';

import type { RecordValidationErrorAttributes } from './types';

const FALLBACK_PARAMS = {};

export function applyParamsFallback(
    errors: RecordValidationErrorAttributes[],
    maybeParams: unknown | undefined,
): object {
    const errorAttributes = {
        path: '/params',
        schema: 'DecisionInput#-params',
        value: maybeParams,
    };

    if (!isObject(maybeParams) || !Object.keys(maybeParams).length) {
        const error = {
            ...errorAttributes,
            reason: 'Must be a non-empty object.',
        };
        errors.push(error);
        return FALLBACK_PARAMS;
    }

    return maybeParams;
}
