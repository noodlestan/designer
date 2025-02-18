import { loadDecisionsFromSources } from '../loader';
import { loadSchemasFromSources } from '../schemas';
import { type Store, type StoreContext, createStaticStore, createUnexpectedError } from '../store';
import { createDecisionValidator, createStaticValidatedMap } from '../validator';

export const staticStoreBuilder = (context: StoreContext): (() => Promise<Store>) => {
    const build = async () => {
        try {
            const schemaMap = await loadSchemasFromSources(context);
            const validator = createDecisionValidator(context, schemaMap);

            const loadedRecords = await loadDecisionsFromSources(context);
            const validatedMap = createStaticValidatedMap(context, loadedRecords, validator);
            return createStaticStore(context, validatedMap);
        } catch (error) {
            const validatedMap = createStaticValidatedMap(context, []);
            const err = createUnexpectedError({ error });
            context.addError(err);
            return createStaticStore(context, validatedMap);
        }
    };

    return build;
};
