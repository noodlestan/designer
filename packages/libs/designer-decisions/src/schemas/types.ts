import type { ErrorObject } from 'ajv';

import type { DecisionInput } from '../types';

export type SchemaId = string;

export type SchemaData = { $id: string; [key: string]: unknown };

export type SchemaMap = Map<SchemaId, SchemaData>;

export type DecisionValidator = {
    schemas: () => SchemaData[];
    validate: (decision: DecisionInput) => ErrorObject[] | null;
};
