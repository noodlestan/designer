import ts from 'typescript';

import { toKebabCase } from './toKebabCase.js';

export function makePrimitiveSchemaId(urnBase: string, symbol: ts.Symbol): string {
    return `${urnBase}:primitive:${toKebabCase(symbol.getName())}`;
}
