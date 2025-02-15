import type { VFile } from 'vfile';

export interface AstroDataMap {
    astro: {
        frontmatter: Record<string, unknown>;
    };
}
export type AstroVFile = VFile & { data: Record<string, unknown> & AstroDataMap; value: string };
