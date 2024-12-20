import ts from 'typescript';

import { toKebabCase } from './toKebabCase';

export function makeDecisionModelSchemaId(baseUrn: string, symbol: ts.Symbol): string {
    const declarations = symbol.getDeclarations();
    if (!declarations || declarations.length === 0) return '';

    const sourceFile = declarations[0].getSourceFile();
    const fileContent = sourceFile.getFullText();

    const tokenPattern = /type\s+([A-Za-z0-9_]+)\s*=\s*/g;
    const segments = fileContent.split(tokenPattern);

    for (let i = 1; i < segments.length; i += 2) {
        const symbolName = segments[i];
        const typeBody = segments[i + 1];

        if (symbolName === symbol.getName()) {
            const typeMatch = typeBody.match(/type:\s*'([^']+)'/);
            if (typeMatch && typeMatch[1]) {
                return `${baseUrn}:decision-models:${typeMatch[1]}`;
            }
        }
    }

    return `${baseUrn}:decision-model:${toKebabCase(symbol.getName())}`;
}
