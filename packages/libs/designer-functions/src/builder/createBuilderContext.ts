import { validateBuilderOptions } from './options';
import type { BuilderContext, BuilderError, BuilderOptions } from './types';

export const createBuilderContext = (maybeOptions?: BuilderOptions): BuilderContext => {
    const errors: BuilderError[] = [];

    const addError = (error: BuilderError) => {
        errors.push(error);
    };

    const options = validateBuilderOptions(addError, maybeOptions);

    const getOptions = () => {
        if (!options) {
            throw new Error('No options in context.');
        }
        return options;
    };

    return {
        options: getOptions,
        hasErrors: () => Boolean(errors.length),
        errors: () => errors,
        addError,
    };
};
