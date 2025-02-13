import type { ErrorObject } from 'ajv';

import type { DecisionLoaderOptions } from '../../loader';

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ResolvedConfig<T> = {
    options: T;
    errors: DesignerDecisionsConfigError[];
};

export type DesignerDecisionsConfigError = {
    error: ErrorObject;
    message: () => string;
};

export type DesignerDecisionsConfig = {
    loader: {
        schemas: DecisionLoaderOptions['schemas'];
        decisions: DecisionLoaderOptions['decisions'];
        moduleResolver?: DecisionLoaderOptions['moduleResolver'];
    };
};
