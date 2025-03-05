import type {
    DataSource,
    DecisionSource,
    DesignerError,
    SchemaSource,
} from '@noodlestan/designer-decisions';

export type BuilderOptions = {
    decisions: (DecisionSource | string)[];
    schemas?: SchemaSource[];
    resolver?: (moduleName: string) => Promise<string>;
};

export type BuilderUnexpectedError = DesignerError & { name: 'BuilderUnexpectedError' };

export type BuilderOptionsError = DesignerError & {
    name: 'BuilderOptionsError';
    path: string;
    reason: string;
    options: unknown;
};

export type BuilderSourceError = DesignerError & {
    name: 'BuilderSourceError';
    type: string;
    id: string;
    source: DataSource;
    path?: string;
    reason: string;
};

export type BuilderSchemaError = DesignerError & {
    name: 'BuilderSchemaError';
    id: string;
    reason: string;
};

export type BuilderError =
    | BuilderOptionsError
    | BuilderUnexpectedError
    | BuilderSourceError
    | BuilderSchemaError;

export type BuilderContext = {
    options: () => BuilderOptions;
    hasErrors: () => boolean;
    errors: () => BuilderError[];
    addError: (error: BuilderError) => void;
};
