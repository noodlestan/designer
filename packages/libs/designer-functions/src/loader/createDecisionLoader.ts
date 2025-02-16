import { createDecisionValidator, loadSchemasFromConfigs, validateSchemaMap } from '../schemas';
import { type StaticDecisionStore, createStaticDecisionStore } from '../store';
import { createStaticInputMap } from '../store';

import { loadDecisionsFromSources, normalizeSources } from './functions';
import type { DecisionLoaderOptions } from './types';

export const createDecisionLoader = (
    options: DecisionLoaderOptions,
): (() => Promise<StaticDecisionStore>) => {
    const { schemas, decisions, resolver: moduleResolver } = options;

    const loader = async () => {
        try {
            const rawSchemaMap = await loadSchemasFromConfigs(schemas, moduleResolver);
            const schemaMap = validateSchemaMap(rawSchemaMap);
            const validator = createDecisionValidator(schemaMap);

            const sources = normalizeSources(decisions);
            const inputData = await loadDecisionsFromSources(sources, moduleResolver);
            const inputMap = createStaticInputMap(inputData, validator);
            return createStaticDecisionStore(inputMap);
        } catch (error) {
            const inputMap = createStaticInputMap([]);
            const err = {
                msg: 'Unexpected error creating store',
                error: error as Error,
            };
            return createStaticDecisionStore(inputMap, [err]);
        }
    };

    // let promise: Promise<StaticDecisionStore>;
    // const load = () => {
    //     if (!promise) {
    //         promise = loader();
    //     }
    //     return promise;
    // };

    return loader;
};
