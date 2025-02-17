import type {
    DecisionInputData,
    DecisionRef,
    InputRecord,
    InputValidationError,
    StaticInputMap,
} from '@noodlestan/designer-decisions';

import type { DecisionValidator } from '../../schemas';
import type { StoreContext } from '../types';
function indexInput(
    context: StoreContext,
    inputsByUuid: Map<string, InputRecord[]>,
    inputsByName: Map<string, InputRecord[]>,
    validator: DecisionValidator | undefined,
    input: InputRecord,
) {
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
}

export const createStaticInputMap = (
    context: StoreContext,
    inputs: InputRecord[],
    validator?: DecisionValidator,
): StaticInputMap => {
    const inputsByUuid: Map<string, InputRecord[]> = new Map();
    const inputsByName: Map<string, InputRecord[]> = new Map();

    const data: DecisionInputData[] = inputs.map(input => {
        return indexInput(context, inputsByUuid, inputsByName, validator, input);
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

    const findByRef = (ref: DecisionRef) => {
        return data.filter(({ decision }) => '$name' in ref && decision.name === ref.$name);
    };

    return {
        hasErrors,
        validationErrors,
        records,
        findByRef,
    };
};
