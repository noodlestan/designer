import type {
    DecisionInputBase,
    DecisionInputError,
    DecisionRef,
    LookupContexts,
    StaticInputMap,
} from '@noodlestan/designer-decisions';

import type { DecisionValidator } from '../schemas';

import type { DecisionInputData } from './createStaticDecisionStore';

export const createStaticInputMap = (
    inputData: DecisionInputBase[],
    validator?: DecisionValidator,
): StaticInputMap => {
    const inputsByUuid: Map<string, DecisionInputBase[]> = new Map();
    const inputsByName: Map<string, DecisionInputBase[]> = new Map();

    const data: DecisionInputData[] = inputData.map(input => {
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

    const validationErrors = (): DecisionInputError[] => {
        return data.flatMap(({ decision, errors = [] }) => {
            return errors ? errors.map(error => ({ decision, error })) : [];
        });
    };

    const records = (filter?: (item: DecisionInputBase) => boolean): DecisionInputBase[] => {
        const items = data.map(item => item.decision);
        return filter ? items.filter(filter) : items;
    };

    const record = (ref: DecisionRef, contexts?: LookupContexts): DecisionInputBase | undefined => {
        if ('$uuid' in ref) {
            const inputs = inputsByUuid.get(ref.$uuid)?.find(input => {
                // WIP match contexts
                return Boolean(input || contexts);
            });
            return inputs;
        }
        if ('$name' in ref) {
            const inputs = inputsByName.get(ref.$name)?.find(input => {
                // WIP match contexts
                return Boolean(input || contexts);
            });
            return inputs;
        }
    };

    return {
        hasErrors,
        validationErrors,
        records,
        record,
    };
};
