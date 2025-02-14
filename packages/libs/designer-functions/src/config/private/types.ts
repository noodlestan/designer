import type { ErrorObject } from 'ajv';

import type { DecisionLoaderOptions } from '../../loader';

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ResolvedConfig<T> = {
    config: T;
    errors: DesignerConfigError[];
};

export type DesignerConfigError = {
    error: ErrorObject;
    message: () => string;
};

export type DesignerConfig = {
    loader: {
        decisions: DecisionLoaderOptions['decisions'];
        schemas: DecisionLoaderOptions['schemas'];
        moduleResolver?: DecisionLoaderOptions['resolver'];
    };
};
