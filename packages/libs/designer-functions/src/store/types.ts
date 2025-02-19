import type {
    DataSource,
    DecisionContext,
    DecisionRefResolver,
    DecisionSource,
    DesignerError,
    LookupContexts,
    SchemaSource,
    StaticValidatedMap,
    ValueContext,
} from '@noodlestan/designer-decisions';

export type StoreOptions = {
    decisions: (DecisionSource | string)[];
    schemas: SchemaSource[];
    resolver?: (moduleName: string) => Promise<string>;
};

export type StoreUnexpectedError = DesignerError & { name: 'StoreUnexpectedError' };

export type StoreOptionsError = DesignerError & {
    name: 'StoreOptionsError';
    path: string;
    reason: string;
    options: unknown;
};

export type StoreSourceError = DesignerError & {
    name: 'StoreSourceError';
    type: string;
    id: string;
    source: DataSource;
    path?: string;
    reason: string;
};

export type StoreSchemaError = DesignerError & {
    id: string;
    reason: string;
};

export type StoreError =
    | StoreOptionsError
    | StoreUnexpectedError
    | StoreSourceError
    | StoreSchemaError;

export type StoreContext = {
    options: () => StoreOptions;
    hasErrors: () => boolean;
    errors: () => StoreError[];
    addError: (error: StoreError) => void;
};

export type Store = {
    context: () => StoreContext;
    inputErrors: StaticValidatedMap['inputErrors'];
    records: StaticValidatedMap['records'];
    decision: DecisionRefResolver;
    createDecisionContext: (contexts?: LookupContexts) => DecisionContext;
    createValueContext: (lookupContexts?: LookupContexts) => ValueContext;
};
