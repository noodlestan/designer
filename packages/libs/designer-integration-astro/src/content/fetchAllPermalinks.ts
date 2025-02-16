import type { DesignerPermalink } from '../api';

import { fetchAllNodes } from './fetchAllNodes';

/**
 * Retrieves all permalinks from all pages.
 *
 * Permalinks available in frontmatter.permalinks[] (populated by the remarkCollectPermalinks() plugin)
 */
export async function fetchAllPermalinks(): Promise<DesignerPermalink[]> {
    const nodes = await fetchAllNodes();

    const permalinks = [
        ...nodes.flatMap(node => {
            return node.permalinks?.map(p => ({
                ...p,
                slug: node.slug,
            }));
        }),
    ].filter(Boolean) as DesignerPermalink[];

    return permalinks;
}
