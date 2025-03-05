import { type DeepPartial, isObject } from '../../private';
import { createBuilderOptionsError } from '../errors';
import type { BuilderError, BuilderOptions } from '../types';

import { EMPTY_OPTIONS } from './constants';
import { validateDecisionSources, validateSchemaSources } from './functions';

export const validateBuilderOptions = (
    addError: (error: BuilderError) => void,
    options?: DeepPartial<BuilderOptions>,
): BuilderOptions | undefined => {
    if (!options) {
        return;
    }
    if (!isObject(options)) {
        const error = createBuilderOptionsError({
            path: 'options',
            reason: 'Options is not an object.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    const { decisions: maybeDecisionsSources, schemas: maybeSchemas } = options;
    if (!Array.isArray(maybeDecisionsSources)) {
        const error = createBuilderOptionsError({
            path: 'options.decisions',
            reason: 'Not an array.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    if (!maybeDecisionsSources.length) {
        const error = createBuilderOptionsError({
            path: 'options.decisions',
            reason: 'Must have at least one decision source.',
            options,
        });
        addError(error);
        return EMPTY_OPTIONS;
    }
    if (maybeSchemas !== undefined && !Array.isArray(maybeSchemas)) {
        const error = createBuilderOptionsError({
            path: 'options.schemas',
            reason: 'Not an array.',
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
    const validatedSchemas = maybeSchemas
        ? validateSchemaSources('options.schemas', addError, maybeSchemas)
        : [];

    return { decisions: validatedDecisionSources, schemas: validatedSchemas };
};
