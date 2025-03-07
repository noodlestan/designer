import type { DesignerError, SchemaSource } from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

import type { BuilderOptions } from '../../builder';

export type ResolvedConfig<T> = {
    config: T;
    errors: ConfigError[];
};

export type ConfigError = DesignerError & {
    layer: 'Config';
    name: 'InvalidConfigError';
    error: ErrorObject;
};

export type DesignerConfig = {
    store: {
        decisions: BuilderOptions['decisions'];
        schemas?: SchemaSource[];
        moduleResolver?: BuilderOptions['resolver'];
    };
};
