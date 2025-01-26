import type { DecisionError } from '@noodlestan/designer-decisions';

export const formatDecisionError = (
    error: DecisionError,
    name?: string,
    useColor?: boolean,
): string => {
    const { msg } = error;

    const symbol = useColor ? '🟨' : '!';
    const prefix = name ? `Decision "${name}" ` : '';

    return `${symbol} ${prefix}${msg}`;
};
