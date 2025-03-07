import {
    type RecordError,
    type ValidatedRecord,
    createRecordValidationError,
} from '@noodlestan/designer-decisions';
import type { ErrorObject, ValidateFunction } from 'ajv';

import { deleteValue } from './deleteValue';
import { extractErrorAttributes } from './extractErrorAttributes';

export function validateRecord(
    preValidatedRecord: ValidatedRecord,

    validateFn: ValidateFunction<unknown>,
): ValidatedRecord {
    const { uuid, loaded, source, file, input } = preValidatedRecord;
    const valid = validateFn(input);
    if (valid) {
        return preValidatedRecord;
    }
    const reducedErrors = (validateFn.errors || []).reduce(
        (acc, item) => {
            const path = item.instancePath;
            const paths = Object.keys(acc);
            if (!paths.find(p => path.startsWith(p) && path !== p)) {
                acc[path] = acc[path] || [];
                acc[path].push(item);
            }
            return acc;
        },
        {} as Record<string, ErrorObject[]>,
    );

    const inputErrors: RecordError[] = [];
    Object.entries(reducedErrors).forEach(([path, errors]) => {
        const attributes = extractErrorAttributes(preValidatedRecord, path, errors);
        const error = createRecordValidationError({
            normalized: { uuid, loaded, input, source, file },
            ...attributes,
        });
        deleteValue(input, path);
        inputErrors.push(error);
    });

    return { uuid, loaded, input, source, file, errors: inputErrors };
}
