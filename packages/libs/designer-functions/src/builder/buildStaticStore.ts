import { type Store, createStore } from '@noodlestan/designer-decisions';

import { loadDecisionsFromSources } from '../loader';
import { createRecordMap } from '../records';
import { loadSchemasFromSources } from '../schemas';
import { createDecisionValidator } from '../validator';

import { createBuilderUnexpectedError } from './errors';
import type { BuilderContext } from './types';

export const buildStaticStore = (context: BuilderContext): (() => Promise<Store>) => {
    const build = async () => {
        try {
            const schemaMap = await loadSchemasFromSources(context);
            const validator = createDecisionValidator(schemaMap);

            const loadedRecords = await loadDecisionsFromSources(context);
            const recordMap = createRecordMap(loadedRecords, validator);
            return createStore(recordMap);
        } catch (error) {
            const validatedMap = createRecordMap([]);
            const err = createBuilderUnexpectedError({ error });
            context.addError(err);
            return createStore(validatedMap);
        }
    };

    return build;
};
