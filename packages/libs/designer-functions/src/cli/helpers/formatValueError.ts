import type { PrimitiveError, ValueError } from '@noodlestan/designer-decisions';

export const formatValueError = (
    error: ValueError | PrimitiveError,
    useColor?: boolean,
    name?: string | false,
): string => {
    const symbol = useColor ? '🟨' : '!';
    const prefix = name ? `Decision "${name}" ` : '';

    return `${symbol} ${prefix}${error.message()}`;
};
