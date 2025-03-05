import type { DecisionSource } from '@noodlestan/designer-decisions';

import type { DeepPartial } from '../../../private';
import { isNonEmptyString } from '../../../private/validate/isNonEmptyString';
import { isObject } from '../../../private/validate/isObject';
import { createBuilderOptionsError } from '../../errors';
import type { BuilderError } from '../../types';

import { validateDataSource } from './validateDataSource';
import { validateSchemaSources } from './validateSchemaSources';

export const validateDecisionSources = (
    _path: string,
    addError: (error: BuilderError) => void,
    maybeDecisions: (DeepPartial<DecisionSource | undefined> | string)[],
): (DecisionSource | string)[] => {
    return maybeDecisions.flatMap((decision, index) => {
        const path = `${_path}[${index}]`;

        if (typeof decision === 'string') {
            if (!isNonEmptyString(decision)) {
                const error = createBuilderOptionsError({
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
            const error = createBuilderOptionsError({
                path,
                reason: 'Must be a non-empty string or a DecisionSource object.',
                options: decision,
            });
            addError(error);
            return [];
        }
        const name = decision.name;
        if (!isNonEmptyString(name)) {
            const error = createBuilderOptionsError({
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
