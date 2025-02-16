export function nodeHasAttribute(node: { attributes?: unknown[] }, name: string): boolean {
    return (
        node.attributes?.some(
            attr =>
                typeof attr === 'object' && attr !== null && 'name' in attr && attr.name === name,
        ) || false
    );
}
