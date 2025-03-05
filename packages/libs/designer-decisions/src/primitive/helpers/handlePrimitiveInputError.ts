import { ERROR_VALUE_INPUT_TYPE_MISMATCH } from '../../value';
import { createPrimitiveInputError } from '../errors';
import type { PrimitiveContext } from '../types';

export const handlePrimitiveInputError = (
    context: PrimitiveContext,
    name: string,
    input: unknown,
    err: unknown = ERROR_VALUE_INPUT_TYPE_MISMATCH,
): void => {
    const error = createPrimitiveInputError({ context, primitiveName: name, input, error: err });
    context.addError(error);
};
