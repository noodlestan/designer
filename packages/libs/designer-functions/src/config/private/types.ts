import type { SchemaSource } from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

import type { BuilderOptions } from '../../builder';

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
        decisions: BuilderOptions['decisions'];
        schemas?: SchemaSource[];
        moduleResolver?: BuilderOptions['resolver'];
    };
};
