import { validateStoreOptions } from './options';
import type { StoreContext, StoreError, StoreOptions } from './types';

export const createStoreContext = (maybeOptions?: StoreOptions): StoreContext => {
    const errors: StoreError[] = [];

    const addError = (error: StoreError) => {
        errors.push(error);
    };

    const options = validateStoreOptions(addError, maybeOptions);

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
