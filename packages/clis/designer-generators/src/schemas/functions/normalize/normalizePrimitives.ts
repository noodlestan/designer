import * as TJS from 'typescript-json-schema';

import { SymbolInfo } from '../../types';

import { normalizeSchema } from './normalizeSchema';

export function normalizePrimitives(infos: SymbolInfo[]): TJS.Definition[] {
    return infos
        .map(info => {
            const program = TJS.getProgramFromFiles([info.filePath], { types: [] });
            const schema = TJS.generateSchema(program, info.symbolName, {
                required: true,
                noExtraProps: true,
            });

            if (!schema) return null;

            return normalizeSchema(schema, info);
        })
        .filter(Boolean) as TJS.Definition[];
}
