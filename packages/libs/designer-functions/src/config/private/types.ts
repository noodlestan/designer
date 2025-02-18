import type { ErrorObject } from 'ajv';

import type { StoreOptions } from '../../store';

export type ResolvedConfig<T> = {
    config: T;
    errors: DesignerConfigError[];
};

export type DesignerConfigError = {
    error: ErrorObject;
    message: () => string;
};

export type DesignerConfig = {
    store: {
        decisions: StoreOptions['decisions'];
        schemas: StoreOptions['schemas'];
        moduleResolver?: StoreOptions['resolver'];
    };
};
