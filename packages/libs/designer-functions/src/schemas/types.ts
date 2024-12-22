import type { DecisionInputBase } from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

export type SchemaId = string;

export type SchemaData = { $id: string; [key: string]: unknown };

export type SchemaMap = Map<SchemaId, SchemaData>;

export type DecisionValidator = {
    schemas: () => SchemaData[];
    validate: (decision: DecisionInputBase) => ErrorObject[] | null;
};
