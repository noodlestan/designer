import type { DecisionError } from '@noodlestan/designer-decisions';

export const formatDecisionError = (
    error: DecisionError,
    name?: string,
    useColor?: boolean,
): string => {
    const symbol = useColor ? '🟨' : '!';
    const prefix = name ? `Decision "${name}" ` : '';

    return `${symbol} ${prefix}${error.message()}`;
};
