import fs from 'fs/promises';

import {
    type DecisionInput,
    type DecisionSource,
    type LoadedRecord,
    maybeErrorMessage,
    serializeErrorData,
} from '@noodlestan/designer-decisions';

import { type BuilderContext, createBuilderSourceError } from '../../builder';

export async function loadDecisionFile(
    context: BuilderContext,
    source: DecisionSource,
    filePath: string,
): Promise<LoadedRecord[]> {
    const attrs = {
        type: 'DecisionSource',
        id: source.name,
        source: source.source,
        path: filePath,
    };

    let fileContents;
    let parsedData;

    try {
        fileContents = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}.');
        const err = createBuilderSourceError({
            ...attrs,
            reason: `Could not read decision file.${message}.`,
        });
        context.addError(err);
        return [];
    }

    try {
        parsedData = JSON.parse(fileContents);
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}');
        const err = createBuilderSourceError({
            ...attrs,
            reason: `Could not parse decision file.${message}.`,
        });
        context.addError(err);
        return [];
    }

    if (!Array.isArray(parsedData)) {
        const err = createBuilderSourceError({
            ...attrs,
            reason: 'Decision file does not contain an array.',
            error: `[${typeof parsedData}] ${serializeErrorData(parsedData)}`,
        });
        context.addError(err);
        return [];
    }

    const inputs = parsedData as DecisionInput[];

    return inputs.map(input => ({ input, source, file: filePath }));
}
