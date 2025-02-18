import { createDecisionValidator, loadSchemasFromConfigs, validateSchemaMap } from '../schemas';
import { type Store, type StoreContext, createStaticStore, createUnexpectedError } from '../store';
import { createStaticInputMap } from '../store';

import { loadDecisionsFromSources } from './functions';

export const staticStoreBuilder = (context: StoreContext): (() => Promise<Store>) => {
    const build = async () => {
        try {
            const rawSchemaMap = await loadSchemasFromConfigs(context);
            const schemaMap = validateSchemaMap(rawSchemaMap);
            const validator = createDecisionValidator(schemaMap);

            const inputData = await loadDecisionsFromSources(context);
            const inputMap = createStaticInputMap(context, inputData, validator);
            return createStaticStore(context, inputMap);
        } catch (error) {
            const inputMap = createStaticInputMap(context, []);
            const err = createUnexpectedError({ error });
            context.addError(err);
            return createStaticStore(context, inputMap);
        }
    };

    return build;
};
