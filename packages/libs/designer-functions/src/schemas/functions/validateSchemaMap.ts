import type { StoreContext } from '../../store';
import type { SchemaMap } from '../types';

import { validateSchemas } from './validateSchemas';

export const validateSchemaMap = (context: StoreContext, schemas: SchemaMap): SchemaMap => {
    validateSchemas(context, schemas);

    return structuredClone(schemas);
};
