import type { MdxEsmRoot } from './types';

export function hasImport(tree: MdxEsmRoot, moduleName: string): boolean {
    return tree.children.some(
        node =>
            node.type === 'mdxjsEsm' &&
            node.value &&
            node.value.includes('import') &&
            node.value.includes(moduleName),
    );
}
