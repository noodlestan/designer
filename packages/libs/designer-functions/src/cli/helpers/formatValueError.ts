import type {
    DecisionError,
    DecisionInputError,
    ModelError,
    PrimitiveError,
    ValueError,
} from '@noodlestan/designer-decisions';

export const formatValueError = (
    error: DecisionError | DecisionInputError | ValueError | ModelError | PrimitiveError,
    useColor?: boolean,
    name?: string | false,
): string => {
    const symbol = useColor ? '🟨' : '!';
    const prefix = name ? `Decision "${name}" ` : '';

    return `${symbol} ${prefix}${error.message()}`;
};
