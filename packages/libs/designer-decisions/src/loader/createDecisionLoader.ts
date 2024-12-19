import { createDecisionValidator, loadSchemasFromPaths, validateSchemaMap } from '../schemas';
import { DecisionStoreStatic, createStaticStore } from '../store';
import { SchemaConfig } from '../types';

import { loadDecisionsFromPaths, resolveSchemaPathsFromConfigs } from './functions';

export const createDecisionLoader = (
    dataPaths: string[],
    schemaConfigs: SchemaConfig[],
    moduleResolver: (moduleName: string) => Promise<string>,
): (() => Promise<DecisionStoreStatic>) => {
    const loader = async () => {
        const paths = await resolveSchemaPathsFromConfigs(schemaConfigs, moduleResolver);
        const schemas = await loadSchemasFromPaths(paths);
        const schemaMap = validateSchemaMap(schemas);
        const validator = createDecisionValidator(schemaMap);

        const decisionData = await loadDecisionsFromPaths(dataPaths);
        return createStaticStore(decisionData, validator);
    };

    let promise: Promise<DecisionStoreStatic>;
    const load = () => {
        if (!promise) {
            promise = loader();
        }
        return promise;
    };

    return load;
};
