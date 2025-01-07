import type { DecisionSource, SchemaConfig } from '@noodlestan/designer-decisions';

import { createDecisionValidator, loadSchemasFromConfigs, validateSchemaMap } from '../schemas';
import { type StaticDecisionStore, createStaticDecisionStore } from '../store';
import { createStaticInputMap } from '../store';

import { loadDecisionsFromSources } from './functions';

export const createDecisionLoader = (
    schemas: SchemaConfig[],
    sources: (DecisionSource | string)[],
    moduleResolver: (moduleName: string) => Promise<string>,
): (() => Promise<StaticDecisionStore>) => {
    const loader = async () => {
        try {
            const rawSchemaMap = await loadSchemasFromConfigs(schemas, moduleResolver);
            const schemaMap = validateSchemaMap(rawSchemaMap);
            const validator = createDecisionValidator(schemaMap);

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

    let promise: Promise<StaticDecisionStore>;
    const load = () => {
        if (!promise) {
            promise = loader();
        }
        return promise;
    };

    return load;
};
