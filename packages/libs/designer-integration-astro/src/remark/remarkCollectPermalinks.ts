import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';

import type { AstroVFile, DesignerDocPermalink } from '../content';
import { getNodeAttribute, nodeHasAttribute, visitShow } from '../private';

/**
 * Remark plugin:
 * - discovers permalinks by detecting the `permalink` attribute in `<Show.. />` components
 * - populates frontmatter.permalinks with array of DesignerPermalinkDeclaration
 *
 * The collected permalinks are collected across all documents via fetchAllPermalinks()
 */
export const remarkCollectPermalinks: Plugin<[], Root> = function () {
    return function (tree: Root, file: VFile): void {
        const permalinks: DesignerDocPermalink[] = [];
        const { frontmatter } = (file as AstroVFile).data.astro;
        visitShow(tree, '*', (node: MdxJsxFlowElement) => {
            const ref = getNodeAttribute(node, 'd');
            if (nodeHasAttribute(node, 'permalink') && ref) {
                const permalink: DesignerDocPermalink = {
                    type: 'Decision',
                    ref,
                };
                permalinks.push(permalink);
            }
        });
        frontmatter.permalinks = permalinks;
    };
};
