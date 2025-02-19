import { serializeMaybeError } from '../../errors';
import type { ValueInputError } from '../types';

type Attributes = Omit<ValueInputError, 'message'>;

export const createValueInputError = (attributes: Attributes): ValueInputError => {
    const { context, valueName, input, error } = attributes;

    const message = () => {
        const dataStr = JSON.stringify(input);
        const refStr = JSON.stringify(context.decisionContext().ref());
        const errStr = serializeMaybeError(error);
        return `Invalid input data for a ${valueName} in ${refStr}: ${dataStr}${errStr}.`;
    };

    return {
        ...attributes,
        message,
    };
};
