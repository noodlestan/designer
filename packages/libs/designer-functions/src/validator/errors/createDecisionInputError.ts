import type { DecisionInputError, ValidatedRecord } from '@noodlestan/designer-decisions';

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

export const createDecisionInputError = (attributes: Attributes): DecisionInputError => {
    const { normalized, reason, path, schema: maybeSchema, value } = attributes;

    const { input } = normalized;
    const ref = { $name: input.name };
    const model = input.model;

    const schema = maybeSchema ?? (path && DEFAULT_SCHEMAS[path]);

    const message = () => {
        const refStr = JSON.stringify(ref);
        return `Validation error in ${refStr}: ${reason}.`;
    };

    return {
        source: normalized.source,
        filename: normalized.file,
        input: normalized.loaded,
        ref,
        reason,
        model,
        path,
        schema,
        value,
        message,
    };
};
