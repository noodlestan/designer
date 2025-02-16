import type { Content, Root } from 'mdast';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';

export type MdxEsmRoot = Omit<Root, 'children'> & {
    children: (Content | MdxjsEsm)[];
};
