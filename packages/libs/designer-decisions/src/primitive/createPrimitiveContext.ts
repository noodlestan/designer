import type { PrimitiveContext, PrimitiveInputError } from '../primitive';
import type { DeepPartial } from '../private';
import type { LinkedValueContext } from '../value';

export const createPrimitiveContext = <T>(
    input?: DeepPartial<T>,
    valueContext?: LinkedValueContext,
): PrimitiveContext<T> => {
    const errors: PrimitiveInputError[] = [];

    const addError = (error: PrimitiveInputError) => {
        errors.push(error);
    };

    const getErrors = () => errors;
    const hasErrors = () => Boolean(getErrors().length);

    return {
        valueContext: () => valueContext,
        outputContext: input => createPrimitiveContext(input, valueContext),
        input: () => input,
        errors: getErrors,
        hasErrors,
        addError,
    };
};
