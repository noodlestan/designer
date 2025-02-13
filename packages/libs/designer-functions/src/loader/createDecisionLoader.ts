import { createDecisionValidator, loadSchemasFromConfigs, validateSchemaMap } from '../schemas';
import { type StaticDecisionStore, createStaticDecisionStore } from '../store';
import { createStaticInputMap } from '../store';

import { loadDecisionsFromSources } from './functions';
import type { DecisionLoaderOptions } from './types';

export const createDecisionLoader = (
    options: DecisionLoaderOptions,
): (() => Promise<StaticDecisionStore>) => {
    const { schemas, decisions, moduleResolver } = options;

    const loader = async () => {
        try {
            const rawSchemaMap = await loadSchemasFromConfigs(schemas, moduleResolver);
            const schemaMap = validateSchemaMap(rawSchemaMap);
            const validator = createDecisionValidator(schemaMap);

            const inputData = await loadDecisionsFromSources(decisions, moduleResolver);
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
