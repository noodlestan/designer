import type { DecisionSource, SchemaSource } from '@noodlestan/designer-decisions';

export type DecisionLoaderOptions = {
    schemas: SchemaSource[];
    decisions: (DecisionSource | string)[];
    resolver?: (moduleName: string) => Promise<string>;
};
