import { serializeErrorData, serializeMaybeError } from '../../errors';
import type { PrimitiveInputError } from '../types';

type Attributes = Omit<PrimitiveInputError, 'message'>;

export const createPrimitiveInputError = (attributes: Attributes): PrimitiveInputError => {
    const { context, primitiveName, input, error } = attributes;

    const message = () => {
        const dataStr = serializeErrorData(input);
        const refStr = JSON.stringify(context.valueContext()?.decisionContext().ref());
        const errStr = serializeMaybeError(error, ' Reason: {}');
        return `Invalid input data for a ${primitiveName} in ${refStr}. Value: ${dataStr}${errStr}`;
    };

    return {
        ...attributes,
        message,
    };
};
