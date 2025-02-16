import { createDecisionValidator, loadSchemasFromConfigs, validateSchemaMap } from '../schemas';
import { type StaticStore, createStaticStore } from '../store';
import { createStaticInputMap } from '../store';

import { loadDecisionsFromSources, normalizeSources } from './functions';
import type { DecisionLoaderOptions } from './types';

export const createDecisionLoader = (
    options: DecisionLoaderOptions,
): (() => Promise<StaticStore>) => {
    const { schemas, decisions, resolver: moduleResolver } = options;

    const loader = async () => {
        try {
            const rawSchemaMap = await loadSchemasFromConfigs(schemas, moduleResolver);
            const schemaMap = validateSchemaMap(rawSchemaMap);
            const validator = createDecisionValidator(schemaMap);

            const sources = normalizeSources(decisions);
            const inputData = await loadDecisionsFromSources(sources, moduleResolver);
            const inputMap = createStaticInputMap(inputData, validator);
            return createStaticStore(inputMap);
        } catch (error) {
            const inputMap = createStaticInputMap([]);
            const err = {
                msg: 'Unexpected error creating store',
                error: error as Error,
            };
            return createStaticStore(inputMap, [err]);
        }
    };

    // let promise: Promise<StaticStore>;
    // const load = () => {
    //     if (!promise) {
    //         promise = loader();
    //     }
    //     return promise;
    // };

    return loader;
};
