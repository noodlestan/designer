import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import { visit } from 'unist-util-visit';

export function findShowComponents(tree: Root): MdxJsxFlowElement[] {
    const components: MdxJsxFlowElement[] = [];

    visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
        if (typeof node.name === 'string' && node.name.startsWith('Show')) {
            components.push(node);
        }
    });
    return components;
}
