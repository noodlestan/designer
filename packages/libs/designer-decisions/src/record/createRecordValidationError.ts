import { serializeErrorData } from '../errors';
import { formatRefAndSource } from '../private';

import { ERROR_LAYER_RECORD, ERROR_RECORD_VALIDATION_ERROR } from './constants';
import type { RecordValidationError, ValidatedRecord } from './types';

type Attributes = {
    normalized: Omit<ValidatedRecord, 'errors'>;
    reason: string;
    path?: string;
    schema?: string;
    value?: unknown;
};

const DEFAULT_SCHEMAS: Record<string, string> = {
    '/model': 'DecisionInput#-model',
    '/name': 'DecisionInput#-name',
    '/uuid': 'DecisionInput#-uuid',
    '/description': 'DecisionInput#-description',
    '/usage': 'DecisionInput#-usage',
    '/contexts': 'DecisionInput#-contexts',
    '/params': 'DecisionInput#-params',
};

export const createRecordValidationError = (attributes: Attributes): RecordValidationError => {
    const { normalized, reason, path, schema: maybeSchema, value } = attributes;
    const { input, source = { name: '<unknown>' }, file: filename } = normalized;
    const ref = { $name: input.name };
    const model = input.model;

    const schema = maybeSchema ?? (path && DEFAULT_SCHEMAS[path]);

    const message = (showRef = true, showSource = true) => {
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const reasonStr = `Value at ${path} ${reason}`;
        const dataStr = serializeErrorData(value, 0);
        return `Invalid Record. ${reasonStr}. Value: ${dataStr}${atStr}`;
    };

    const docs = () => {
        const slug = schema?.replace('urn:designer:', '').replace(':', '/');
        return `/models/schemas/${slug}`;
    };

    return {
        layer: ERROR_LAYER_RECORD,
        name: ERROR_RECORD_VALIDATION_ERROR,
        message,
        docs,
        source: normalized.source,
        filename: normalized.file,
        input: normalized.loaded,
        ref,
        reason,
        model,
        path,
        schema,
        value,
    };
};
