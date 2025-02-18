import type {
    DecisionInput,
    DecisionInputError,
    LoadedRecord,
    ValidatedRecord,
} from '@noodlestan/designer-decisions';

import { type DeepPartial, isObject } from '../../private';

import {
    applyModelFallback,
    applyNameFallback,
    applyParamsFallback,
    applyUuidFallback,
} from './fallbacks';

export function normalizeRecord(loadedRecord: LoadedRecord): ValidatedRecord {
    const { input: loaded, source, file } = loadedRecord;

    const errors: DecisionInputError[] = [];

    const partial = isObject(loaded) ? loaded : ({} as DeepPartial<DecisionInput>);

    const name = applyNameFallback(loadedRecord, errors, partial.name);
    const model = applyModelFallback(loadedRecord, errors, partial.model, { name });

    const uuid = applyUuidFallback(loadedRecord, errors, partial.uuid, { name, model });
    const params = applyParamsFallback(loadedRecord, errors, partial.params, { name, model });

    const input = {
        uuid,
        name,
        model,
        params,
    };

    return {
        loaded,
        input: input as DecisionInput,
        source,
        file,
        errors,
    };
}
