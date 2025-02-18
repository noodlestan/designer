export type SchemaId = string;

export type SchemaData = { $id: string; [key: string]: unknown };

export type SchemaMap = Map<SchemaId, SchemaData>;
