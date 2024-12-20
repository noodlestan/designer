import * as ts from 'typescript';

export function createProgramForTypes(fileNames: string[]): ts.Program {
    return ts.createProgram(fileNames, {
        strictNullChecks: true,
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        lib: ['es2015'],
    });
}
