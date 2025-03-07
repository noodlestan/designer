import {
    type DecisionInput,
    type LoadedRecord,
    type ValidatedRecord,
    createRecordValidationError,
} from '@noodlestan/designer-decisions';

import { type DeepPartial, isObject } from '../../private';

import {
    type RecordValidationErrorAttributes,
    applyModelFallback,
    applyNameFallback,
    applyParamsFallback,
    applyUuidFallback,
} from './fallbacks';

export function normalizeRecord(loadedRecord: LoadedRecord): ValidatedRecord {
    const { input: loaded, source, file } = loadedRecord;

    const errorAttributes: RecordValidationErrorAttributes[] = [];

    const partial = isObject(loaded) ? loaded : ({} as DeepPartial<DecisionInput>);

    const name = applyNameFallback(errorAttributes, partial.name);
    const model = applyModelFallback(errorAttributes, partial.model);
    const uuid = applyUuidFallback(loadedRecord, errorAttributes, partial.uuid);
    const params = applyParamsFallback(errorAttributes, partial.params);

    const { description, usage, contexts } = partial;

    const input = {
        uuid,
        name,
        model,
        params,
        description,
        usage,
        contexts,
    };

    const errors = errorAttributes.map(error => {
        return createRecordValidationError({
            normalized: { uuid, loaded, input, source, file },
            ...error,
        });
    });

    return {
        uuid,
        loaded,
        input: input as DecisionInput,
        source,
        file,
        errors,
    };
}
