import type { DecisionSource, SchemaSource } from '@noodlestan/designer-decisions';

export type DecisionLoaderOptions = {
    schemas: SchemaSource[];
    decisions: (DecisionSource | string)[];
    moduleResolver?: (moduleName: string) => Promise<string>;
};
