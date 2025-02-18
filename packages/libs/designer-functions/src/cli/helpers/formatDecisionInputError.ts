import { type DecisionInputError, serializeErrorData } from '@noodlestan/designer-decisions';

export const formatDecisionInputError = (
    error: DecisionInputError,
    useColor: boolean = true,
    showErrorSources: boolean = true,
    showName: boolean = true,
): string => {
    const symbol = useColor ? '🟥' : 'X';
    const { reason, schema, path, value, source, filename } = error;
    const refStr = JSON.stringify(error.ref);
    const prefix = showName ? `Validation error in "${refStr}"` : '';
    const pathStr = path !== undefined ? `Invalid "${path}". ` : '';
    const dataStr = serializeErrorData(value, 0);
    const sourceStr = showErrorSources ? `Source: "${source.name}" (file: "${filename}"). ` : '';
    return `${symbol} ${prefix}${pathStr}${reason} Value: ${dataStr} ${sourceStr}👉 DOCS: https://designer-decisions.noodlestan.org/models/schemas/${schema}`;
};
