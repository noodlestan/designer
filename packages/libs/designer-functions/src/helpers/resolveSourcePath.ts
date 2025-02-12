import fs from 'fs';
import path from 'path';

import type { DataSource, DataSourcePackage } from '@noodlestan/designer-decisions';

import { resolveNodeModule } from './resolveNodeModule';

export async function resolveSourcePath(
    source: DataSource,
    modulePathResolver?: (moduleName: string) => Promise<string>,
): Promise<string> {
    if (source.type === 'package') {
        const packageSource = source as DataSourcePackage;
        const packagePath = await resolveNodeModule(packageSource.package, modulePathResolver);
        const resolvedPath = path.join(packagePath, source.path);

        if (!fs.existsSync(resolvedPath)) {
            throw new Error(
                `Package directory not found for "${packageSource.package}" at "${resolvedPath}".`,
            );
        }
        return resolvedPath;
    } else if (source.type === 'path') {
        const resolvedPath = path.resolve(source.path);
        if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Path not found for "${source.path}" at "${resolvedPath}".`);
        }
        return resolvedPath;
    } else {
        throw new Error(`Invalid source: "${JSON.stringify(source)}".`);
    }
}
