import type { SchemaSource } from '@noodlestan/designer-decisions';

import type { DeepPartial } from '../../../private';
import { isNonEmptyString } from '../../../private/validate/isNonEmptyString';
import { isObject } from '../../../private/validate/isObject';
import { createOptionsError } from '../../errors';
import type { StoreError } from '../../types';

import { validateDataSource } from './validateDataSource';

export const validateSchemaSources = (
    _path: string,
    addError: (error: StoreError) => void,
    maybeSchemas: DeepPartial<SchemaSource | undefined>[],
): SchemaSource[] => {
    return maybeSchemas.flatMap((schema, index) => {
        const path = `${_path}[${index}]`;

        if (!isObject(schema)) {
            const error = createOptionsError({
                path,
                reason: 'Must be an object.',
                options: schema,
            });
            addError(error);
            return [];
        }
        const urnBase = schema.urnBase;
        if (!isNonEmptyString(urnBase)) {
            const error = createOptionsError({
                path: `${path}.urnBase`,
                reason: 'Must be a non-empty string.',
                options: urnBase,
            });
            addError(error);
            return [];
        }

        const validSource = validateDataSource(`${path}.source`, addError, schema.source);
        return validSource ? { urnBase, source: validSource } : [];
    });
};
