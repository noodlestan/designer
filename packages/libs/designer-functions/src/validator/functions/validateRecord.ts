import type { DecisionInputError, ValidatedRecord } from '@noodlestan/designer-decisions';
import type { ErrorObject, ValidateFunction } from 'ajv';

import type { SchemaMap } from '../../schemas';
import { createDecisionInputError } from '../errors';

import { deleteValue } from './deleteValue';
import { extractErrorAttributes } from './extractErrorAttributes';

export function validateRecord(
    preValidatedRecord: ValidatedRecord,
    schemaMap: SchemaMap,
    schemaId: string,
    validateFn: ValidateFunction<unknown>,
): ValidatedRecord {
    const { loaded, source, file, input } = preValidatedRecord;
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

    const inputErrors: DecisionInputError[] = [];
    Object.entries(reducedErrors).forEach(([path, errors]) => {
        const attributes = extractErrorAttributes(preValidatedRecord, path, errors);
        const error = createDecisionInputError({
            normalized: { loaded, input, source, file },
            ...attributes,
        });
        deleteValue(input, path);
        inputErrors.push(error);
    });

    return { loaded, input, source, file, errors: inputErrors };
}
