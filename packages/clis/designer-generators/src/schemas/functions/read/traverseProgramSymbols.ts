import ts from 'typescript';

import type { SymbolInfo } from '../../types';

type SymbolMapper = (symbol: ts.Symbol) => SymbolInfo | undefined;

export function mapProgramSymbols(program: ts.Program, mapSymbol: SymbolMapper): SymbolInfo[] {
    const checker = program.getTypeChecker();
    const map: SymbolInfo[] = [];

    for (const sourceFile of program.getSourceFiles()) {
        // Skip files not in the input list
        if (!program.getRootFileNames().includes(sourceFile.fileName)) continue;

        ts.forEachChild(sourceFile, node => {
            if (ts.isTypeAliasDeclaration(node) && node.name) {
                const symbol = checker.getSymbolAtLocation(node.name);
                if (symbol) {
                    const mapped = mapSymbol(symbol);
                    if (mapped) map.push(mapped);
                }
            }
        });
    }

    return map;
}
