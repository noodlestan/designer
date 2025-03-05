import type { DecisionInput, LoadedRecord, ValidatedRecord } from '@noodlestan/designer-decisions';

export function maybeValidateRecord(loadedRecord: LoadedRecord): ValidatedRecord {
    const { uuid: maybeUiid, input: loaded, source, file } = loadedRecord;
    const uuid = maybeUiid || loaded.uuid || crypto.randomUUID();
    return {
        uuid,
        loaded,
        source,
        file,
        input: loaded as DecisionInput,
        errors: [],
    };
}
