import type { SchemaConfig } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from './resolveSourcePath';

export async function resolveSchemaPathsFromConfigs(
    configs: SchemaConfig[],
    moduleResolver: (moduleName: string) => Promise<string>,
): Promise<string[]> {
    const resolvedPaths: string[] = [];

    for (const config of configs) {
        const { source } = config;
        const sourcePath = await resolveSourcePath(source, moduleResolver);
        resolvedPaths.push(sourcePath);
    }

    return resolvedPaths;
}
