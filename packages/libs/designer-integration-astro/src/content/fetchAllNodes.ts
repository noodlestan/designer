import type { MDXInstance } from 'astro';

import type { BaseNode, GlobResult } from './types';

function markdownToNode<T extends BaseNode>(node: MDXInstance<T>): T {
    const fm = node.frontmatter;
    const url = node.url || '/';
    return { ...fm, url };
}

async function globResultToArray<T extends BaseNode>(result: GlobResult<T>): Promise<T[]> {
    const raw = await Promise.all(Object.values(result).map(fn => fn()));
    return raw.map(node => markdownToNode<T>(node));
}
/**
 * Provides access to the parsed notes
 *
 * Note: we tried reading from `getCollection('docs')` for collections
 * types are not available in the integration code (they are dynamically
 * generated in the application space)
 */
export async function fetchAllNodes(): Promise<BaseNode[]> {
    return globResultToArray<BaseNode>(
        import.meta.glob<MDXInstance<BaseNode>>('/src/**/*.(md|mdx)'),
    );
}
