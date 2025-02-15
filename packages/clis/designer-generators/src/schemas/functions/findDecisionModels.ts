import { SchemaGeneratorConfig } from '@noodlestan/designer-decisions';

import { SymbolInfo } from '../types';

import {
    createProgramForTypes,
    findTypeFiles,
    makeDecisionModelSchemaId,
    mapProgramSymbols,
} from './read';

export async function findDecisionModels(
    config: SchemaGeneratorConfig,
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<SymbolInfo[]> {
    const { urnBase, source, types } = config;
    const files = await findTypeFiles(source, types.decisionModels, moduleResolver);
    const program = createProgramForTypes(files);
    return mapProgramSymbols(program, symbol => ({
        symbolName: symbol.getName(),
        sourceType: 'decision-models',
        schemaId: makeDecisionModelSchemaId(urnBase, symbol),
        filePath: symbol.declarations?.[0]?.getSourceFile().fileName ?? '',
        tjsParams: {},
    }));
}
