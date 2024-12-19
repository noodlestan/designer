import { DecisionValidator } from '../schemas';
import { DecisionInput } from '../types';
import { DecisionError } from '../types/decision-inputs/validation/types';

import { DecisionStoreStatic } from './types';

export const createStaticStore = (
    initialData: DecisionInput[],
    validator?: DecisionValidator,
): DecisionStoreStatic => {
    const decisionData = initialData.map(decision => {
        return {
            decision,
            errors: validator?.validate(decision),
        };
    });

    const hasErrors = (): boolean => {
        return decisionData.some(item => item.errors !== null);
    };

    const allErrors = (): DecisionError[] => {
        return decisionData.flatMap(({ decision, errors = [] }) => {
            return errors ? errors.map(error => ({ decision, error })) : [];
        });
    };

    const records = (filter?: (item: DecisionInput) => boolean): DecisionInput[] => {
        const data = decisionData.map(item => item.decision);
        return filter ? data.filter(filter) : data;
    };

    const api: DecisionStoreStatic = {
        hasErrors,
        allErrors,
        records,
    };

    return api;
};
