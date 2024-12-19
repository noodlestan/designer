import * as TJS from 'typescript-json-schema';

import { SymbolInfo } from '../../types';

import { normalizeSchema } from './normalizeSchema';

export function normalizeDecisionTypes(infos: SymbolInfo[]): TJS.Definition[] {
    const symbolToSchemaIdMap = new Map(infos.map(info => [info.symbolName, info.schemaId]));

    return infos
        .map(info => {
            const program = TJS.getProgramFromFiles([info.filePath], { types: [] });
            const schema = TJS.generateSchema(program, info.symbolName, {
                required: true,
                noExtraProps: true,
            });

            if (!schema) return null;

            return normalizeSchema(schema, info, symbolToSchemaIdMap);
        })
        .filter(Boolean) as TJS.Definition[];
}
