import type { SchemaConfig } from '@noodlestan/designer-decisions';

import { createDecisionValidator, loadSchemasFromPaths, validateSchemaMap } from '../schemas';
import { type StaticDecisionStore, createStaticDecisionStore } from '../store';
import { createStaticInputMap } from '../store';

import { loadDecisionsFromPaths, resolveSchemaPathsFromConfigs } from './functions';

export const createDecisionLoader = (
    dataPaths: string[],
    schemaConfigs: SchemaConfig[],
    moduleResolver: (moduleName: string) => Promise<string>,
): (() => Promise<StaticDecisionStore>) => {
    const loader = async () => {
        try {
            const paths = await resolveSchemaPathsFromConfigs(schemaConfigs, moduleResolver);
            const schemas = await loadSchemasFromPaths(paths);
            const schemaMap = validateSchemaMap(schemas);
            const validator = createDecisionValidator(schemaMap);

            const inputData = await loadDecisionsFromPaths(dataPaths);
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
