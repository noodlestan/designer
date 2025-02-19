import type {
    DecisionInputError,
    DecisionRef,
    LoadedRecord,
    StaticValidatedMap,
    ValidatedRecord,
} from '@noodlestan/designer-decisions';

import type { StoreContext } from '../store/types';

import { maybeValidateRecord } from './functions';

import type { DecisionValidator } from '.';

export const createStaticValidatedMap = (
    context: StoreContext,
    loadedRecords: LoadedRecord[],
    validator?: DecisionValidator,
): StaticValidatedMap => {
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
