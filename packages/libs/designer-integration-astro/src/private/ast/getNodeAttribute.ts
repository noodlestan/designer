import type { MdxJsxAttribute } from 'mdast-util-mdx';

export function getNodeAttribute(
    node: { attributes?: unknown[] },
    name: string,
): string | undefined {
    const attribute = node.attributes?.find(
        attr => typeof attr === 'object' && attr !== null && 'name' in attr && attr.name === name,
    ) as MdxJsxAttribute;
    if (attribute && typeof attribute.value === 'string') {
        return attribute.value;
    }
    return undefined;
}
