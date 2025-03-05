import type { LoadedRecord, ValidatedRecord } from '@noodlestan/designer-decisions';

import type { DecisionValidator } from '../types';

import { normalizeRecord } from './normalizeRecord';

export function maybeValidateRecord(
    validator: DecisionValidator | undefined,
    loadedRecord: LoadedRecord,
): ValidatedRecord {
    if (validator) {
        return validator?.validate(loadedRecord);
    }
    return normalizeRecord(loadedRecord);
}
