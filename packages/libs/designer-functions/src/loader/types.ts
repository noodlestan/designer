import type { DecisionSource, SchemaSource } from '@noodlestan/designer-decisions';

export type DecisionLoaderOptions = {
    decisions: (DecisionSource | string)[];
    schemas: SchemaSource[];
    resolver?: (moduleName: string) => Promise<string>;
};
