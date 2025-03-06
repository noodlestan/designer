import { serializeErrorData, serializeMaybeError } from '../errors';

import type { ModelUnexpectedError } from './types';

type Attributes = Omit<ModelUnexpectedError, 'message'>;

export const createModelUnexpectedError = (attributes: Attributes): ModelUnexpectedError => {
    const { context, input, error } = attributes;

    const message = () => {
        const dataStr = serializeErrorData(input);
        const refStr = JSON.stringify(context.decisionContext().ref());
        const errStr = serializeMaybeError(error, ' Reason: {}');
        return `Invalid input data in ${refStr}. Value: ${dataStr}${errStr}`;
    };

    return {
        ...attributes,
        message,
    };
};
