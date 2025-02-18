import type { Root } from 'mdast';

import { rewriteHref } from '../rewriteHref';
import type { VFile } from '../types';

type HeroAction = {
    link: string;
    text: string;
    icon?: string;
};

export function processHeros() {
    return function (_tree: Root, file: VFile): void {
        const { frontmatter } = file.data.astro;

        if (typeof frontmatter.hero === 'object') {
            const { actions = [] } = frontmatter.hero;
            frontmatter.hero.actions = actions.map((action: HeroAction) => ({
                ...action,
                link: rewriteHref(action.link),
            }));
        }
    };
}
