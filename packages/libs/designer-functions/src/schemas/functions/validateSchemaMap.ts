import type { BuilderContext } from '../../builder';
import type { SchemaMap } from '../types';

import { validateSchemas } from './validateSchemas';

export const validateSchemaMap = (context: BuilderContext, schemas: SchemaMap): SchemaMap => {
    validateSchemas(context, schemas);

    return structuredClone(schemas);
};
