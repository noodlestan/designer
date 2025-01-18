import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

import { rewriteHref } from '../rewriteHref';
import type { VFile } from '../types';

type Link = {
    href: string;
    label: string;
};

type Links = {
    internal: Link[];
    external: Link[];
};

type LinkNode = {
    tagName: string;
    properties?: {
        href?: string;
        rel?: string;
        'data-external'?: string;
        'data-type'?: string | undefined;
    };
};

export function processLinks() {
    return function (tree: Root, file: VFile): void {
        const links: Links = { internal: [], external: [] };

        visit(tree, 'element', (node: LinkNode) => {
            if (
                node.tagName === 'a' &&
                node.properties &&
                typeof node.properties.href === 'string'
            ) {
                const href = rewriteHref(node.properties.href);
                node.properties.href = href;
                const label = toString(node);
                const isAbsolute = /^[a-z]+:/.test(href) || href.startsWith('//');
                if (isAbsolute) {
                    node.properties.rel = 'noopener';
                    node.properties['data-external'] = '';
                    links.external.push({ href, label });
                } else {
                    const base = href.split('/')[1];
                    node.properties['data-type'] = base;
                    links.internal.push({ href, label });
                }
            }
        });

        const { frontmatter } = file.data.astro;
        frontmatter.links = links;
    };
}
