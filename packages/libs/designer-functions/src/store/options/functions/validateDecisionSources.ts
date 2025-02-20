import type { DecisionSource } from '@noodlestan/designer-decisions';

import type { DeepPartial } from '../../../private';
import { isNonEmptyString } from '../../../private/validate/isNonEmptyString';
import { isObject } from '../../../private/validate/isObject';
import { createOptionsError } from '../../errors';
import type { StoreError } from '../../types';

import { validateDataSource } from './validateDataSource';
import { validateSchemaSources } from './validateSchemaSources';

export const validateDecisionSources = (
    _path: string,
    addError: (error: StoreError) => void,
    maybeDecisions: (DeepPartial<DecisionSource | undefined> | string)[],
): (DecisionSource | string)[] => {
    return maybeDecisions.flatMap((decision, index) => {
        const path = `${_path}[${index}]`;

        if (typeof decision === 'string') {
            if (!isNonEmptyString(decision)) {
                const error = createOptionsError({
                    path,
                    reason: 'Must be a non-empty string or a DecisionSource object.',
                    options: decision,
                });
                addError(error);
                return [];
            }
            return decision;
        }
        if (!isObject(decision)) {
            const error = createOptionsError({
                path,
                reason: 'Must be a non-empty string or a DecisionSource object.',
                options: decision,
            });
            addError(error);
            return [];
        }
        const name = decision.name;
        if (!isNonEmptyString(name)) {
            const error = createOptionsError({
                path: `${path}.name`,
                reason: 'Must be a non-empty string.',
                options: name,
            });
            addError(error);
            return [];
        }

        const validSource = validateDataSource(`${path}.source`, addError, decision.source);
        const validSchemas = decision.schemas
            ? validateSchemaSources(`${path}.schemas`, addError, decision.schemas)
            : undefined;

        return validSource ? { name, source: validSource, schemas: validSchemas } : [];
    });
};
