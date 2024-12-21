import type { DecisionModelFactory } from './decision-values';

export type DecisionType = {
    type: string;
    name: string;
    category: string;
    domain: string;
    description: string;
    models: DecisionTypeModel[];
};

export type DecisionTypeModel = {
    model: string;
    name: string;
    description: string;
    factory: DecisionModelFactory;
};

export type DecisionTypeMeta = {
    type: string;
    name: string;
    category: string;
    domain: string;
    description: string;
    models: DecisionModelMeta[];
};

export type DecisionModelMeta = {
    model: string;
    type: string;
    name: string;
    category: string;
    domain: string;
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
        decisionModels: string[];
    };
};

export type SchemaConfig = {
    urnBase: string;
    source: SchemaSource;
};
