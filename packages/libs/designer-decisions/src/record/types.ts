import type { DesignerError } from '../errors';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { DeepPartial } from '../private';

export type DataSourcePackage = { type: 'package'; package: string; path: string };

export type DataSourcePath = { type: 'path'; path: string };

export type SchemaDataSource = DataSourcePackage | DataSourcePath;

export type SchemaSource = {
    urnBase: string;
    source: SchemaDataSource;
};

export type NestedSchemaSource = SchemaSource & {
    decisionSourceName?: string;
};

export type DataSource = DataSourcePackage | DataSourcePath;

export type DecisionSource = {
    name: string;
    source: DataSource;
    schemas?: SchemaSource[];
};

export type LoadedRecord = {
    input: DeepPartial<DecisionInput>;
    source: DecisionSource;
    file?: string;
    uuid?: string;
};

type _RecordError = DesignerError & {
    layer: 'Record';
    source: DecisionSource;
    input: DeepPartial<DecisionInput>;
    filename?: string;
    ref: DecisionRef;
};

export type RecordValidationError = _RecordError & {
    name: 'RecordValidationError';
    reason: string;
    model: string;
    path?: string;
    schema?: string;
    value?: unknown;
    message: () => string;
};

export type RecordError = RecordValidationError;

export type ValidatedRecord = LoadedRecord & {
    uuid: string;
    loaded: LoadedRecord['input'];
    input: DecisionInput;
    errors: RecordError[];
};

export type RecordMap = {
    hasErrors: () => boolean;
    inputErrors: () => RecordError[];
    records: (filter?: (item: ValidatedRecord) => boolean) => ValidatedRecord[];
    findByRef: (ref: DecisionRef) => ValidatedRecord[];
};
