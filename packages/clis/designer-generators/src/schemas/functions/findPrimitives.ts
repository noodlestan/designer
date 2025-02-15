import { SchemaGeneratorConfig } from '@noodlestan/designer-decisions';

import { SymbolInfo } from '../types';

import {
    createProgramForTypes,
    findTypeFiles,
    makePrimitiveSchemaId,
    mapProgramSymbols,
} from './read';

export async function findPrimitives(
    config: SchemaGeneratorConfig,
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<SymbolInfo[]> {
    const { urnBase, source, types } = config;

    const files = await findTypeFiles(source, types.primitives, moduleResolver);
    const program = createProgramForTypes(files);
    return mapProgramSymbols(program, symbol => ({
        symbolName: symbol.getName(),
        sourceType: 'primitives',
        schemaId: makePrimitiveSchemaId(urnBase, symbol),
        filePath: symbol.declarations?.[0]?.getSourceFile().fileName ?? '',
        tjsParams: {},
    }));
}
