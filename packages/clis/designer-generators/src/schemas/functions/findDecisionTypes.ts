import { SchemaGeneratorConfig } from '@noodlestan/designer-decisions';

import { SymbolInfo } from '../types';

import {
    createProgramForTypes,
    findTypeFiles,
    makeDecisionTypeSchemaId,
    mapProgramSymbols,
} from './read';

export async function findDecisionTypes(
    config: SchemaGeneratorConfig,
    moduleResolver: (moduleName: string) => Promise<string>,
): Promise<SymbolInfo[]> {
    const { urnBase, source, types } = config;
    const files = await findTypeFiles(source, types.decisionTypes, moduleResolver);
    const program = createProgramForTypes(files);
    return mapProgramSymbols(program, symbol => ({
        symbolName: symbol.getName(),
        sourceType: 'decision-types',
        schemaId: makeDecisionTypeSchemaId(urnBase, symbol),
        filePath: symbol.declarations?.[0]?.getSourceFile().fileName ?? '',
        tjsParams: {},
    }));
}
