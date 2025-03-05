import type {
    DecisionInput,
    DecisionInputError,
    DecisionRef,
    LoadedRecord,
    ValidatedRecord,
} from '@noodlestan/designer-decisions';
// import { ReactiveMap } from '@solid-primitives/map';
import { createSignal } from 'solid-js';

import { createStaticRecord } from './createStaticRecord';
import { maybeValidateRecord } from './functions';
import type { ReactiveMap } from './types';

export const createReactiveMap = (loadedRecords: LoadedRecord[]): ReactiveMap => {
    const loaded = loadedRecords.map(maybeValidateRecord);
    const [getRecords, setRecords] = createSignal<Record<string, ValidatedRecord>>(
        Object.fromEntries(loaded.map(record => [record.uuid, record])),
    );

    const hasErrors = (): boolean => {
        return Object.values(getRecords()).some(item => Boolean(item.errors.length));
    };

    const inputErrors = (): DecisionInputError[] => {
        return Object.values(getRecords()).flatMap(({ errors }) => errors);
    };

    const records = (filter?: (record: ValidatedRecord) => boolean): ValidatedRecord[] => {
        const recs = Object.values(getRecords());
        return filter ? recs.filter(filter) : recs;
    };

    const findByRef = (ref: DecisionRef) => {
        return Object.values(getRecords()).filter(
            item => '$name' in ref && item.input.name === ref.$name,
        );
    };

    const insertRecord = (input: DecisionInput) => {
        setRecords(prev => {
            const record = maybeValidateRecord(createStaticRecord(input));
            return { ...prev, [record.uuid]: record };
        });
    };

    const updateRecord = (uuid: string, input: DecisionInput) => {
        setRecords(prev => {
            const loaded = prev[uuid];
            const updated = { ...loaded, input };
            return { ...prev, [uuid]: maybeValidateRecord(updated) };
        });
    };

    return {
        hasErrors,
        inputErrors,
        records,
        findByRef,
        insertRecord,
        updateRecord,
    };
};
