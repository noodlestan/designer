import { type LoadedRecord, type ValidatedRecord } from '@noodlestan/designer-decisions';
import Ajv from 'ajv';

import type { SchemaMap } from '../schemas';
import { type StoreContext } from '../store';

import { createDecisionInputError } from './errors';
import { normalizeRecord, validateRecord } from './functions';
import type { DecisionValidator } from './types';

export const createDecisionValidator = (
    context: StoreContext,
    schemaMap: SchemaMap,
): DecisionValidator => {
    const ajv = new Ajv({ verbose: true, allowUnionTypes: true, allErrors: false });

    Array.from(schemaMap.values()).forEach(schema => {
        ajv.addSchema(schema);
    });

    const validate = (loaded: LoadedRecord): ValidatedRecord => {
        const normalized = normalizeRecord(loaded);

        if (normalized.errors.length) {
            return normalized;
        }

        const { input, source, errors } = normalized;

        const schemaId = `urn:designer:decision-model:${input.model.replace('/', '-')}`;
        const schema = schemaMap.get(schemaId);
        const validateFn = ajv.getSchema(schemaId);
        if (!schema || !validateFn) {
            const error = createDecisionInputError({
                normalized,
                reason: `Schema not loaded: "${schemaId}".`,
                schema: `DecisionInput#-model`,
            });
            errors.push(error);
            return { loaded, input, source, errors };
        }
        return validateRecord(normalized, schemaMap, schemaId, validateFn);
    };

    const api: DecisionValidator = {
        schemas: () => Array.from(schemaMap.values()),
        validate,
    };

    return api;
};
