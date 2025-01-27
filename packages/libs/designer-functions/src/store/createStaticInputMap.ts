import type {
    InputRecord,
    InputValidationError,
    StaticInputMap,
} from '@noodlestan/designer-decisions';

import type { DecisionValidator } from '../schemas';

import type { DecisionInputData } from './createStaticDecisionStore';

export const createStaticInputMap = (
    inputs: InputRecord[],
    validator?: DecisionValidator,
): StaticInputMap => {
    const inputsByUuid: Map<string, InputRecord[]> = new Map();
    const inputsByName: Map<string, InputRecord[]> = new Map();

    const data: DecisionInputData[] = inputs.map(input => {
        if (input.uuid) {
            const byUuid = inputsByUuid.get(input.uuid) || [];
            byUuid.push(input);
            inputsByUuid.set(input.uuid, byUuid);
        }

        const byName = inputsByName.get(input.name) || [];
        byName.push(input);
        inputsByName.set(input.name, byName);

        return {
            decision: input,
            errors: validator?.validate(input),
        };
    });

    const hasErrors = (): boolean => {
        return data.some(item => item.errors !== null);
    };

    const validationErrors = (): InputValidationError[] => {
        return data.flatMap(({ decision, errors = [] }) => {
            return errors ? errors.map(error => ({ decision, error })) : [];
        });
    };

    const records = (filter?: (item: InputRecord) => boolean): InputRecord[] => {
        const items = data.map(item => item.decision);
        return filter ? items.filter(filter) : items;
    };

    return {
        hasErrors,
        validationErrors,
        records,
    };
};
