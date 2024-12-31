import * as TJS from 'typescript-json-schema';

import { SymbolInfo } from '../../types';

function kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function updateRefs(obj: TJS.Definition, symbolToSchemaIdMap: Map<string, string>) {
    if (typeof obj !== 'object' || obj === null) return;

    Object.entries(obj).forEach(([key, value]) => {
        if (key === '$ref' && typeof value === 'string' && value.startsWith('#/definitions/')) {
            const refName = value.replace('#/definitions/', '');
            const resolvedSchemaId = symbolToSchemaIdMap.get(refName);
            if (!resolvedSchemaId) {
                throw new Error(`Symbol "${refName}" is unknown.`);
            }
            const schemaId =
                resolvedSchemaId ||
                (refName.includes('/')
                    ? `${refName}`
                    : `urn:designer:primitive:${kebabCase(refName)}`);

            obj[key] = schemaId;
        } else if (typeof value === 'object' && value !== null) {
            updateRefs(value, symbolToSchemaIdMap);
        }
    });
}

export function normalizeSchema(
    schema: TJS.Definition,
    info: SymbolInfo,
    symbolToSchemaIdMap: Map<string, string>,
): TJS.Definition {
    if (schema.definitions) {
        delete schema.definitions;
    }

    updateRefs(schema, symbolToSchemaIdMap);

    return {
        $id: info.schemaId,
        ...schema,
    };
}
