import * as TJS from 'typescript-json-schema';

import { SymbolInfo } from '../../types';

import { normalizeSchema } from './normalizeSchema';

export function generateModelSchemas(infos: SymbolInfo[]): TJS.Definition[] {
    const symbolToSchemaIdMap = new Map(infos.map(info => [info.symbolName, info.schemaId]));

    return infos
        .map(info => {
            const program = TJS.getProgramFromFiles([info.filePath], {
                lib: ['es2015'],
                types: [],
            });
            const schema = TJS.generateSchema(program, info.symbolName, {
                required: true,
                noExtraProps: true,
            });

            if (!schema) return null;

            return normalizeSchema(schema, info, symbolToSchemaIdMap);
        })
        .filter(Boolean) as TJS.Definition[];
}