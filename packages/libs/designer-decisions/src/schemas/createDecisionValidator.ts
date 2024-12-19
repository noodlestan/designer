import Ajv, { ErrorObject } from 'ajv';

import { DecisionInput } from '../types';

import { DecisionValidator, SchemaMap } from './types';

export const createDecisionValidator = (schemaMap: SchemaMap): DecisionValidator => {
    const ajv = new Ajv({ allErrors: true });

    Array.from(schemaMap.values()).forEach(schema => {
        ajv.addSchema(schema);
    });

    const validate = (decision: DecisionInput): ErrorObject[] | null => {
        const schemaId = `urn:designer:decision-types:${decision.type}`;
        const validateFn = ajv.getSchema(schemaId);
        if (!validateFn) {
            // for (const key of schemaMap.keys()) {
            //     console.log(key, schemaMap.get(key)?.anyOff || schemaMap.get(key)?.properties);
            // }
            throw new Error(`Schema not loaded: "${schemaId}".`);
        }
        const valid = validateFn(decision);
        return valid ? null : validateFn.errors || [];
    };

    const api: DecisionValidator = {
        schemas: () => Array.from(schemaMap.values()),
        validate,
    };

    return api;
};