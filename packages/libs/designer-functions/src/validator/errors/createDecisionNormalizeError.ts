import type { DecisionInputError, LoadedRecord } from '@noodlestan/designer-decisions';

type Attributes = {
    loaded: LoadedRecord;
    name: string;
    model: string;
    reason: string;
    path?: string;
    schema?: string;
    value?: unknown;
};

export const createDecisionNormalizeError = (attributes: Attributes): DecisionInputError => {
    const { loaded, name, model, reason, path, schema, value } = attributes;

    const ref = { $name: name };

    const message = () => {
        const refStr = JSON.stringify(ref);
        return `Validation error in ${refStr}: ${reason}.`;
    };

    return {
        source: loaded.source,
        filename: loaded.file,
        input: loaded.input,
        ref,
        reason,
        model,
        path,
        schema,
        value,
        message,
    };
};
