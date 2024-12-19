export type DecisionTypeMeta = {
    category: string;
    domain: string;
    type: string;
    name: string;
    description: string;
    factory: () => void;
    models: DecisionModelMeta[];
};

export type DecisionModelMeta = {
    model: string;
    name: string;
    description: string;
};

export type SchemaSourcePackage = { type: 'package'; package: string; path?: string };

export type SchemaSourcePath = { type: 'path'; path: string };

export type SchemaSource = SchemaSourcePackage | SchemaSourcePath;

export type SchemaGeneratorConfig = {
    urnBase: string;
    source: SchemaSource;
    types: {
        primitives: string[];
        decisionTypes: string[];
    };
};

export type SchemaConfig = {
    urnBase: string;
    source: SchemaSource;
};
