import type { Program } from 'estree';
import type { MdxJsxAttributeValueExpression } from 'mdast-util-mdx';
import { u } from 'unist-builder';

export function createAttributeValueExpression(
    name: string,
    program: Program,
): MdxJsxAttributeValueExpression {
    return u('mdxJsxAttributeValueExpression', {
        value: name,
        data: {
            estree: program,
        },
    });
}
