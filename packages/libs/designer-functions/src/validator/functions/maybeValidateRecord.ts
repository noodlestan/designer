import type { DecisionInput, LoadedRecord, ValidatedRecord } from '@noodlestan/designer-decisions';

import type { DecisionValidator } from '../types';

export function maybeValidateRecord(
    validator: DecisionValidator | undefined,
    loadedRecord: LoadedRecord,
): ValidatedRecord {
    if (validator) {
        return validator?.validate(loadedRecord);
    } else {
        const { input, source, file } = loadedRecord;
        return {
            loaded: input,
            source,
            file,
            input: input as DecisionInput,
            errors: [],
        };
    }
}
