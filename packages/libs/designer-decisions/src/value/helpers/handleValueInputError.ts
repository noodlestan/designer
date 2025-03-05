import { ERROR_VALUE_INPUT_TYPE_MISMATCH, createValueInputError } from '../errors';
import { type ValueContext } from '../types';

export const handleValueInputError = (
    context: ValueContext,
    name: string,
    input: unknown,
    err: unknown = ERROR_VALUE_INPUT_TYPE_MISMATCH,
): void => {
    const error = createValueInputError({ context, valueName: name, input, error: err });
    context.addError(error);
};
