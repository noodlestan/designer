/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { MdxJsxAttribute, MdxJsxAttributeValueExpression } from 'mdast-util-mdx';
import { u } from 'unist-builder';

export function createJsxAttribute(
    name: string,
    value: MdxJsxAttributeValueExpression,
): MdxJsxAttribute {
    return u('mdxJsxAttribute', {
        name,
        value,
    });
}
