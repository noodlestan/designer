import type { ValidatedRecord } from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

import { extractValue } from './extractValue';

export type ExtractedError = {
    reason: string;
    path?: string;
    schema?: string;
    value?: unknown;
};

export function extractErrorAttributes(
    preValidatedRecord: ValidatedRecord,
    // schemaMap: SchemaMap,
    // schemaId: string,
    path: string,
    errors: ErrorObject[],
): ExtractedError {
    // console.log('preValidatedRecord', preValidatedRecord);
    // console.log('schemaId', schemaId);
    // console.log('path', path);
    // console.log('errors', errors);

    const schema = errors.find(error => error.parentSchema?.$id)?.parentSchema?.$id;
    const value = extractValue(preValidatedRecord.input, path);
    const reason = value === undefined ? 'Missing' : 'Type mismatch';

    return {
        reason,
        path,
        value,
        schema,
    };
}
