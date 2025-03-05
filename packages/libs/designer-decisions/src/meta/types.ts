import type { DecisionModelFactory } from '../models';
import type { SchemaDataSource } from '../records';

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

export type SchemaGeneratorConfig = {
    urnBase: string;
    source: SchemaDataSource;
    types: {
        primitives: string[];
        decisionModels: string[];
    };
};
