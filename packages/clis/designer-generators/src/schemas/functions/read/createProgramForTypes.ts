import * as ts from 'typescript';

export function createProgramForTypes(fileNames: string[]): ts.Program {
    return ts.createProgram(fileNames, {
        strictNullChecks: true,
        target: ts.ScriptTarget.ES2015,
        module: ts.ModuleKind.ESNext,
    });
}
