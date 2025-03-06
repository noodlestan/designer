import type { PrimitiveContext, PrimitiveError } from '../primitive';
import type { DeepPartial } from '../private';
import type { LinkedValueContext } from '../value';

export const createPrimitiveContext = <P>(
    input?: DeepPartial<P>,
    valueContext?: LinkedValueContext,
): PrimitiveContext<P> => {
    const errors: PrimitiveError[] = [];

    const addError = (error: PrimitiveError) => {
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
