import type { DecisionValueError } from '@noodlestan/designer-decisions';

export const formatValueError = (
    error: DecisionValueError,
    name?: string,
    useColor?: boolean,
): string => {
    const symbol = useColor ? '🟨' : '!';
    const prefix = name ? `Decision "${name}" ` : '';

    return `${symbol} ${prefix}${error.message()}`;
};
