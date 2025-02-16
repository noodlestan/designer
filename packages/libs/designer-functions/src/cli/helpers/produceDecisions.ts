import type { StaticStore } from '../../store';

import { produceDecisionStatus } from './produceDecisionStatus';
import type { ProducedDecisionStore } from './types';

export const produceDecisions = (store: StaticStore): ProducedDecisionStore => {
    const decisions = store.records().map(record => produceDecisionStatus(store, record));

    const errors = store.storeErrors();
    const validationErrors = store.validationErrors();
    const valueErrorsCount = decisions.reduce((acc, status) => acc + Number(status.hasErrors), 0);

    const counts: () => [string, number][] = () => [
        ['records', decisions.length],
        ['errors', errors.length],
        ['validation errors', validationErrors.length],
        ['value errors', valueErrorsCount],
    ];

    const errorCount = () => {
        return counts()
            .slice(1)
            .reduce((acc, [, c]) => acc + c, 0);
    };

    const valueErrors = () => {
        return decisions.flatMap(status => [
            ...status.context.errors(),
            ...(status.value?.context().allErrors() || []),
        ]);
    };

    const summary = () => {
        return counts()
            .filter(([, n]) => n > 0)
            .map(([label, n]) => `${n} ${label}`)
            .join(', ');
    };

    return {
        decisions: () => decisions,
        hasErrors: () => Boolean(errors.length + validationErrors.length + valueErrorsCount),
        errors: {
            count: errorCount,
            store: () => store.storeErrors(),
            validation: () => store.validationErrors(),
            value: valueErrors,
        },
        summary,
    };
};
