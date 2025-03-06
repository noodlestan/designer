import { serializeErrorData, serializeMaybeError } from '../../errors';
import type { ValueInputError } from '../types';

type Attributes = Omit<ValueInputError, 'message'>;

export const createValueInputError = (attributes: Attributes): ValueInputError => {
    const { context, valueName, input, error } = attributes;

    const message = () => {
        const dataStr = serializeErrorData(input);
        const refStr = JSON.stringify(context.ref());
        const errStr = serializeMaybeError(error, ' Reason: {}');
        return `Invalid input data for a ${valueName} in ${refStr}. Value: ${dataStr}${errStr}`;
    };

    return {
        ...attributes,
        message,
    };
};
