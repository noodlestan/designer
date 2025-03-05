import type { Store } from '@noodlestan/designer-decisions';

import type { BuilderContext } from '../../builder';

import { produceDecisionStatus } from './produceDecisionStatus';
import type { ProducedDecisionStore } from './types';

export const produceDecisions = (context: BuilderContext, store: Store): ProducedDecisionStore => {
    const decisions = store.records().map(record => produceDecisionStatus(store, record.input));

    const errors = context.errors();
    const decisionErrorsCount = decisions.reduce(
        (acc, status) => acc + Number(status.hasDecisionErrors),
        0,
    );
    const valueErrorsCount = decisions.reduce(
        (acc, status) => acc + Number(status.hasValueErrors),
        0,
    );

    const counts: () => [string, number][] = () => [
        ['records', decisions.length],
        ['store errors', errors.length],
        ['decision errors', decisionErrorsCount],
        ['value errors', valueErrorsCount],
    ];

    const errorCount = () => {
        return counts()
            .slice(1)
            .reduce((acc, [, c]) => acc + c, 0);
    };

    const summary = () => {
        return counts()
            .filter(([, n]) => n > 0)
            .map(([label, n]) => `${n} ${label}`)
            .join(', ');
    };

    return {
        decisions: () => decisions,
        hasErrors: () => errorCount() > 0,
        summary,
    };
};
