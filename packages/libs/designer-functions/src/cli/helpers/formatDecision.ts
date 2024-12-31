import { formatDecisionError } from './formatDecisionError';
import type { DecisionStatus } from './types';

type ShowOptions =
    | 'status-colors'
    | 'status'
    | 'uuid'
    | 'name'
    | 'model'
    | 'value'
    | 'error-count'
    | 'error-details';

const DEFAULT_OPTIONS: ShowOptions[] = [
    'status-colors',
    'name',
    'model',
    'value',
    'error-count',
    'error-details',
];

const formatValue = (value: unknown): string => {
    return Array.isArray(value)
        ? `[${value.length}]`
        : typeof value === 'object'
          ? '[object]'
          : String(value);
};

const formatStatus = (hasErrors: boolean, color: boolean): string => {
    if (color) {
        return hasErrors ? '🟥' : '🟩';
    }
    return hasErrors ? 'X' : '-';
};

export const formatDecision = (
    status: DecisionStatus,
    show: ShowOptions[] = DEFAULT_OPTIONS,
): string => {
    const { uuid, name, model, value, hasErrors, errors } = status;
    const useColors = Boolean(show.find(s => s === 'status-colors'));
    const showErrorDetails = Boolean(show.find(s => s === 'error-details'));
    const colsWithoutErrors = show.filter(s => s !== 'error-details');
    // eslint-disable-next-line array-callback-return
    const columns = colsWithoutErrors.map(s => {
        switch (s) {
            case 'status-colors':
            case 'status':
                return formatStatus(hasErrors, useColors);
            case 'uuid':
                return uuid;
            case 'name':
                return name;
            case 'model':
                return model;
            case 'value':
                return formatValue(value);
            case 'error-count':
                return errors.length ? `Errors: ${errors.length}` : '';
        }
    });

    if (showErrorDetails && errors.length) {
        if (columns.length) {
            columns.push('\n\n');
        }
        columns.push(errors.map(err => formatDecisionError(name, err)).join('\n') + '\n');
    }

    return columns.join(' | ');
};
