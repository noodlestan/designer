import { type DeepPartial, isObject } from '../../private';
import { createOptionsError } from '../errors';
import type { StoreError, StoreOptions } from '../types';

import { EMPTY_OPTIONS } from './constants';
import { validateDecisionSources, validateSchemaSources } from './functions';

export const validateStoreOptions = (
    addError: (error: StoreError) => void,
    options?: DeepPartial<StoreOptions>,
): StoreOptions | undefined => {
    if (!options) {
        return;
    }
    if (!isObject(options)) {
        const error = createOptionsError({
            path: 'options',
            reason: 'Options is not an object.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    const { decisions: maybeDecisionsSources, schemas: maybeSchemas } = options;
    if (!Array.isArray(maybeDecisionsSources)) {
        const error = createOptionsError({
            path: 'options.decisions',
            reason: 'Not an array.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    if (!maybeDecisionsSources.length) {
        const error = createOptionsError({
            path: 'options.decisions',
            reason: 'Must have at least one decision source.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    if (!Array.isArray(maybeSchemas)) {
        const error = createOptionsError({
            path: 'options.schemas',
            reason: 'Not an array.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    if (!maybeSchemas.length) {
        const error = createOptionsError({
            path: 'options.schemas',
            reason: 'Must have at least one schema definition.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }

    const validatedDecisionSources = validateDecisionSources(
        'options.decisions',
        addError,
        maybeDecisionsSources,
    );
    const validatedSchemas = validateSchemaSources('options.schemas', addError, maybeSchemas);

    return { decisions: validatedDecisionSources, schemas: validatedSchemas };
};
