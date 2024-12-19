import ts from 'typescript';

import { toKebabCase } from './toKebabCase';

export function makePrimitiveSchemaId(urnBase: string, symbol: ts.Symbol): string {
    return `${urnBase}:primitives:${toKebabCase(symbol.getName())}`;
}
