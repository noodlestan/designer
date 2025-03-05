import type {
    DecisionInputError,
    DecisionRef,
    LoadedRecord,
    RecordMap,
    ValidatedRecord,
} from '@noodlestan/designer-decisions';

import type { DecisionValidator } from '../validator';
import { maybeValidateRecord } from '../validator/functions';

export const createRecordMap = (
    loadedRecords: LoadedRecord[],
    validator?: DecisionValidator,
): RecordMap => {
    const data: ValidatedRecord[] = loadedRecords.map(input =>
        maybeValidateRecord(validator, input),
    );

    const hasErrors = (): boolean => {
        return data.some(item => item.errors !== null);
    };

    const inputErrors = (): DecisionInputError[] => {
        return data.flatMap(({ errors }) => errors);
    };

    const records = (filter?: (record: ValidatedRecord) => boolean): ValidatedRecord[] => {
        return filter ? data.filter(filter) : data;
    };

    const findByRef = (ref: DecisionRef) => {
        return data.filter(item => '$name' in ref && item.input.name === ref.$name);
    };

    return {
        hasErrors,
        inputErrors,
        records,
        findByRef,
    };
};
