import {
    type DecisionSource,
    type LoadedRecord,
    maybeErrorMessage,
} from '@noodlestan/designer-decisions';

import { type BuilderContext, createBuilderSourceError } from '../../builder';
import { resolveSourcePath } from '../../helpers';

import { findJsonFiles } from './findJsonFiles';
import { loadDecisionFile } from './loadDecisionFile';

export const loadDecisionsFromSource = async (
    context: BuilderContext,
    decisionSource: DecisionSource,
): Promise<LoadedRecord[]> => {
    const { resolver: moduleResolver } = context.options();

    let path;
    try {
        path = await resolveSourcePath(decisionSource.source, moduleResolver);
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}.');
        const err = createBuilderSourceError({
            type: 'DecisionSource',
            id: decisionSource.name,
            source: decisionSource.source,
            reason: `Could not resolve path. ${message}`,
            error,
        });
        context.addError(err);
        return [];
    }

    const files = await findJsonFiles(context, decisionSource, path);
    const loadedRecords = await Promise.all(
        files.map(file => loadDecisionFile(context, decisionSource, file)),
    );
    return loadedRecords.flat();
};
