import * as TJS from 'typescript-json-schema';

import { SymbolInfo } from '../../types';

import { normalizeSchema } from './normalizeSchema';

export function generatePrimitiveSchemas(infos: SymbolInfo[]): TJS.Definition[] {
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

            return normalizeSchema(schema, info);
        })
        .filter(Boolean) as TJS.Definition[];
}