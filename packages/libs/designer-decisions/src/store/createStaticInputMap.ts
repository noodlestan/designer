import type { DecisionValidator } from '../schemas';
import type { DecisionContexts, DecisionError, DecisionInputBase, DecisionRef } from '../types';

import type { DecisionInputData } from './createStaticDecisionStore';
import type { StaticInputMap } from './types';

export const createStaticInputMap = (
    initialData: DecisionInputBase[],
    validator?: DecisionValidator,
): StaticInputMap => {
    const inputById: Map<string, DecisionInputBase> = new Map();
    const inputsByName: Map<string, DecisionInputBase[]> = new Map();

    const inputData: DecisionInputData[] = initialData.map(input => {
        if (input.id) {
            inputById.set(input.id, input);
        }
        const inputs = inputsByName.get(input.name) || [];
        inputs.push(input);
        inputsByName.set(input.name, inputs);

        return {
            decision: input,
            errors: validator?.validate(input),
        };
    });

    const hasErrors = (): boolean => {
        return inputData.some(item => item.errors !== null);
    };

    const allErrors = (): DecisionError[] => {
        return inputData.flatMap(({ decision, errors = [] }) => {
            return errors ? errors.map(error => ({ decision, error })) : [];
        });
    };

    const records = (filter?: (item: DecisionInputBase) => boolean): DecisionInputBase[] => {
        const data = inputData.map(item => item.decision);
        return filter ? data.filter(filter) : data;
    };

    const record = (
        ref: DecisionRef,
        contexts?: DecisionContexts,
    ): DecisionInputBase | undefined => {
        if ('$id' in ref) {
            return inputById.get(ref.$id);
        }
        if ('$name' in ref) {
            return inputsByName.get(ref.$name)?.find(input => {
                // WIP match contexts
                return Boolean(input || contexts);
            });
        }
    };

    return {
        hasErrors,
        allErrors,
        records,
        record,
    };
};
