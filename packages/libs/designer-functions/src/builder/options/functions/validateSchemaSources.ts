import type { SchemaSource } from '@noodlestan/designer-decisions';

import type { DeepPartial } from '../../../private';
import { isNonEmptyString } from '../../../private/validate/isNonEmptyString';
import { isObject } from '../../../private/validate/isObject';
import { createBuilderOptionsError } from '../../errors';
import type { BuilderError } from '../../types';

import { validateDataSource } from './validateDataSource';

export const validateSchemaSources = (
    _path: string,
    addError: (error: BuilderError) => void,
    maybeSchemas: DeepPartial<SchemaSource | undefined>[],
): SchemaSource[] => {
    return maybeSchemas.flatMap((schema, index) => {
        const path = `${_path}[${index}]`;

        if (!isObject(schema)) {
            const error = createBuilderOptionsError({
                path,
                reason: 'must be an object',
                options: schema,
            });
            addError(error);
            return [];
        }
        const urnBase = schema.urnBase;
        if (!isNonEmptyString(urnBase)) {
            const error = createBuilderOptionsError({
                path: `${path}.urnBase`,
                reason: 'must be a non-empty string',
                options: urnBase,
            });
            addError(error);
            return [];
        }

        const validSource = validateDataSource(`${path}.source`, addError, schema.source);
        return validSource ? { urnBase, source: validSource } : [];
    });
};
