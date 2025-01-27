import type { BaseValue } from '@noodlestan/designer-decisions';

import { formatDecisionError } from './formatDecisionError';
import { formatValueError } from './formatValueError';
import type { ProducedDecisionStatus } from './types';

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

const extractValue = (value?: BaseValue<unknown>) => {
    if (
        typeof value === 'object' &&
        value !== null &&
        'get' in value &&
        typeof value.get === 'function'
    ) {
        return value.get();
    }
    return String(value);
};

const formatValue = (value?: BaseValue<unknown>): string => {
    const v = extractValue(value);
    if (typeof v === 'object' && v !== null && 'items' in v && typeof v.items === 'function') {
        const items = v.items().map(formatValue);
        return `[${items.join(', ')}]`;
    }
    if (
        typeof v === 'object' &&
        v !== null &&
        'toString' in v &&
        typeof v.toString === 'function'
    ) {
        return v.toString();
    }
    return String(v);
};

const formatStatus = (status: ProducedDecisionStatus, useColor: boolean): string => {
    const { context: decisionContext, value } = status;
    if (decisionContext.hasErrors()) {
        return useColor ? '🟥' : 'X';
    }
    if (value?.context().hasErrors()) {
        return useColor ? '🟨' : '!';
    }
    return useColor ? '🟩' : '-';
};

const countErrors = (status: ProducedDecisionStatus): string => {
    const { context, value } = status;

    const decisionErrors = context.errors();
    const valueWarnings = value?.context().allErrors() || [];

    const allErrors = [
        decisionErrors.length ? `${decisionErrors.length} errors` : '',
        valueWarnings.length ? `${valueWarnings.length} warnings` : '',
    ].filter(Boolean);
    return allErrors.join(', ');
};

export const formatDecisionStatus = (
    status: ProducedDecisionStatus,
    show: ShowOptions[] = DEFAULT_OPTIONS,
): string => {
    const { uuid, name, model, value } = status;
    const useColor = Boolean(show.find(s => s === 'status-colors'));
    const showErrorDetails = Boolean(show.find(s => s === 'error-details'));
    const colsWithoutErrors = show.filter(s => s !== 'error-details');
    // eslint-disable-next-line array-callback-return
    const columns = colsWithoutErrors.map(s => {
        switch (s) {
            case 'status-colors':
            case 'status':
                return formatStatus(status, useColor);
            case 'uuid':
                return uuid;
            case 'name':
                return name;
            case 'model':
                return model;
            case 'value':
                return formatValue(value);
            case 'error-count':
                return countErrors(status);
        }
    });

    const details: string[] = [];

    if (showErrorDetails && status.hasErrors) {
        details.push('', '');
    }
    if (showErrorDetails && status.context.hasErrors()) {
        const errors = status.context.errors;
        details.push(...errors().map(err => ' > ' + formatDecisionError(err, name, useColor)));
    }
    if (showErrorDetails && status.value?.context().hasErrors()) {
        const errors = status.value?.context().allErrors() || [];
        details.push(...errors.map(err => ' > ' + formatValueError(err, undefined, useColor)));
    }
    if (showErrorDetails && status.hasErrors) {
        details.push('');
    }

    return columns.join(' | ') + details.join('\n');
};
