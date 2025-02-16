import type { MdxEsmRoot } from './types';

export function hasExport(tree: MdxEsmRoot, exportName: string): boolean {
    return tree.children.some(
        node =>
            node.type === 'mdxjsEsm' &&
            node.value &&
            node.value.includes('export') &&
            node.value.includes(exportName),
    );
}
