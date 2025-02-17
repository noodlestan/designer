import type { DecisionSource, InputRecord } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../../helpers';
import { maybeErrorMessage } from '../../private';
import { type StoreContext, createStoreSourceError } from '../../store';

import { findJsonFiles } from './findJsonFiles';
import { loadDecisionFile } from './loadDecisionFile';

export const loadDecisionsFromSource = async (
    context: StoreContext,
    decisionSource: DecisionSource,
): Promise<InputRecord[]> => {
    const { resolver: moduleResolver } = context.options();

    let path;
    try {
        path = await resolveSourcePath(decisionSource.source, moduleResolver);
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}');
        const err = createStoreSourceError({
            type: 'DecisionSource',
            id: decisionSource.name,
            source: decisionSource.source,
            reason: `Could not resolve path.. ${message}.`,
            error,
        });
        context.addError(err);
        return [];
    }

    const files = await findJsonFiles(context, decisionSource, path);
    const decisions = await Promise.all(
        files.map(file => loadDecisionFile(context, decisionSource, file)),
    );

    return decisions.flat();
};
