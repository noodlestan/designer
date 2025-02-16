import type { MDXInstance } from 'astro';

export type DesignerDocPermalink = {
    type: string;
    ref: string;
};

export type BaseNode = {
    id: string;
    title: string;
    slug?: string;
    permalinks?: DesignerDocPermalink[];
};

export type GlobResult<T extends BaseNode> = Record<string, () => Promise<MDXInstance<T>>>;
