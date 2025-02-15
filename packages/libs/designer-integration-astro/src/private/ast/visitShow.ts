import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import { visit } from 'unist-util-visit';

export function visitShow(
    tree: Root,
    filter: string | string[] = '*',
    callback: (node: MdxJsxFlowElement) => void,
): void {
    visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
        if (typeof node.name !== 'string' || !node.name.startsWith('Show')) {
            return;
        }
        if (
            filter === '*' ||
            (typeof filter === 'string' && node.name === filter) ||
            (Array.isArray(filter) && filter.includes(node.name))
        ) {
            callback(node);
        }
    });
}
