import {
    type LoadedRecord,
    type ValidatedRecord,
    createRecordValidationError,
} from '@noodlestan/designer-decisions';
import Ajv from 'ajv';

import type { SchemaMap } from '../schemas';

import { normalizeRecord, validateRecord } from './functions';
import type { DecisionValidator } from './types';

export const createDecisionValidator = (schemaMap: SchemaMap): DecisionValidator => {
    const ajv = new Ajv({ verbose: true, allowUnionTypes: true, allErrors: false });

    Array.from(schemaMap.values()).forEach(schema => {
        ajv.addSchema(schema);
    });

    const validate = (loaded: LoadedRecord): ValidatedRecord => {
        const normalized = normalizeRecord(loaded);

        if (normalized.errors.length) {
            return normalized;
        }

        const { uuid, input, source, errors } = normalized;

        const schemaId = `urn:designer:decision-model:${input.model.replace('/', '-')}`;
        const schema = schemaMap.get(schemaId);
        const validateFn = ajv.getSchema(schemaId);
        if (!schema || !validateFn) {
            const error = createRecordValidationError({
                normalized,
                reason: `Schema not loaded: "${schemaId}"`,
                schema: `DecisionInput#-model`,
            });
            errors.push(error);
            return { uuid, loaded, input, source, errors };
        }
        return validateRecord(normalized, validateFn);
    };

    const api: DecisionValidator = {
        schemas: () => Array.from(schemaMap.values()),
        validate,
    };

    return api;
};
