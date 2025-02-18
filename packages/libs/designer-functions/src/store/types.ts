import type {
    BaseValue,
    DataSource,
    Decision,
    DecisionContext,
    DecisionRef,
    DecisionRefResolver,
    DecisionSource,
    LookupContexts,
    SchemaSource,
    StaticInputMap,
    ValueContext,
} from '@noodlestan/designer-decisions';

import type { DesignerError } from '../private';

export type StoreOptions = {
    decisions: (DecisionSource | string)[];
    schemas: SchemaSource[];
    resolver?: (moduleName: string) => Promise<string>;
};

export type StoreUnexpectedError = DesignerError & { name: 'StoreUnexpectedError' };

export type StoreOptionsError = DesignerError & {
    path: string;
    reason: string;
    options: unknown;
    name: 'StoreOptionsError';
};

export type StoreSourceError = DesignerError & {
    type: string;
    id: string;
    source: DataSource;
    path?: string;
    reason: string;
    name: 'StoreSourceError';
};

export type StoreError = StoreOptionsError | StoreUnexpectedError | StoreSourceError;

export type StoreContext = {
    options: () => StoreOptions;
    hasErrors: () => boolean;
    errors: () => StoreError[];
    addError: (error: StoreError) => void;
};

export type Store = {
    context: () => StoreContext;
    validationErrors: StaticInputMap['validationErrors'];
    records: StaticInputMap['records'];
    decision: <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
        contexts?: LookupContexts,
    ) => [DecisionContext, Decision<V> | undefined];
    resolver: DecisionRefResolver;
    createDecisionContext: (contexts?: LookupContexts) => DecisionContext;
    createValueContext: (lookupContexts?: LookupContexts) => ValueContext;
};
