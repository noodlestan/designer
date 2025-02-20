import type { DecisionSource, NestedSchemaSource } from '@noodlestan/designer-decisions';

export const resolveReferencedSchemaSources = (
    decisionSources: DecisionSource[],
): NestedSchemaSource[] => {
    const nestedSchemaSources: NestedSchemaSource[] = [];

    decisionSources.forEach(decisionSource => {
        if (decisionSource.schemas) {
            decisionSource.schemas.forEach(schema => {
                nestedSchemaSources.push({
                    ...schema,
                    decisionSourceName: decisionSource.name,
                });
            });
        }
    });

    return nestedSchemaSources;
};
