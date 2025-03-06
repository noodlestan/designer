import { formatDecisionError } from './formatDecisionError';
import { formatValueError } from './formatValueError';
import { countErrors, formatStatus, formatValue } from './functions';
import type { ProducedDecisionStatus } from './types';

type ShowOptions =
    | 'status-colors'
    | 'status'
    | 'uuid'
    | 'name'
    | 'model'
    | 'value'
    | 'error-count'
    | 'error-details'
    | 'error-sources';

const DEFAULT_OPTIONS: ShowOptions[] = [
    'status-colors',
    'name',
    'model',
    'value',
    'error-count',
    'error-details',
    'error-sources',
];

export const formatDecisionStatus = (
    status: ProducedDecisionStatus,
    show: ShowOptions[] = DEFAULT_OPTIONS,
): string => {
    const { uuid, name, model, value } = status;
    const color = Boolean(show.find(s => s === 'status-colors'));
    const showDetails = Boolean(show.find(s => s === 'error-details'));
    const showSource = Boolean(show.find(s => s === 'error-sources'));
    const columns = show.filter(s => s !== 'error-details' && s !== 'error-sources');
    // eslint-disable-next-line array-callback-return
    const cells = columns.map(s => {
        switch (s) {
            case 'status-colors':
            case 'status':
                return formatStatus(status, color);
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

    if (showDetails && status.hasErrors) {
        details.push('', '');
    }
    if (showDetails && status.context.hasErrors()) {
        const errors = status.context.errors();
        details.push(
            ...errors.map(err => ' > ' + formatDecisionError(err, color, showSource, false)),
        );
    }
    if (showDetails && status.value?.context().hasErrors()) {
        const errors = status.value?.context().errors() || [];
        details.push(...errors.map(err => ' > ' + formatValueError(err, color, false)));
    }
    if (showDetails && status.hasErrors) {
        details.push('');
    }

    return cells.join(' | ') + details.join('\n');
};
