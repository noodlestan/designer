import fs from 'fs/promises';

import type { DecisionSource, InputRecord } from '@noodlestan/designer-decisions';

import { maybeErrorMessage, serializeErrorData } from '../../private';
import { type StoreContext, createStoreSourceError } from '../../store';

export async function loadDecisionFile(
    context: StoreContext,
    source: DecisionSource,
    filePath: string,
): Promise<InputRecord[]> {
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
        const message = maybeErrorMessage(error, ' {}');
        const err = createStoreSourceError({
            ...attrs,
            reason: `Could not read decision file. ${message}.`,
        });
        context.addError(err);
        return [];
    }

    try {
        parsedData = JSON.parse(fileContents);
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}');
        const err = createStoreSourceError({
            ...attrs,
            reason: `Could not parse decision file. ${message}.`,
        });
        context.addError(err);
        return [];
    }

    if (!Array.isArray(parsedData)) {
        const err = createStoreSourceError({
            ...attrs,
            reason: 'Decision file does not contain an array.',
            error: `[${typeof parsedData}] ${serializeErrorData(parsedData)}`,
        });
        context.addError(err);
        return [];
    }
    return parsedData as InputRecord[];
}
