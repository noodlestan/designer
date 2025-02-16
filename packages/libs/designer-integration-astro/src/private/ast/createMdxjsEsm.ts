import { Parser } from 'acorn';
import type { Program } from 'estree';
import { type MdxjsEsm } from 'mdast-util-mdxjs-esm';
import { u } from 'unist-builder';

export function createMdxjsEsm(code: string): MdxjsEsm {
    const program = Parser.parse(code, {
        sourceType: 'module',
        ecmaVersion: 'latest',
    }) as unknown as Program;

    return u('mdxjsEsm', {
        value: code,
        data: {
            estree: program,
        },
    });
}
