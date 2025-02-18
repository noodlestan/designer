import fs from 'fs';
import path from 'path';

import type { DataSource, DataSourcePackage } from '@noodlestan/designer-decisions';

import { resolveNodeModule } from './resolveNodeModule';

export async function resolveSourcePath(
    source: DataSource,
    moduleResolver?: (packageName: string) => Promise<string>,
): Promise<string> {
    if (source.type === 'package') {
        const packageSource = source as DataSourcePackage;
        const packageName = packageSource.package;
        const packagePath = await resolveNodeModule(packageName, moduleResolver);
        if (!packagePath) {
            throw new Error(`Package not found: "${packageName}".`);
        }

        const resolvedPath = path.join(packagePath, source.path);
        if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Package directory not found: "${resolvedPath}".`);
        }
        return resolvedPath;
    } else if (source.type === 'path') {
        const resolvedPath = path.resolve(source.path);
        if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Path not found: "${resolvedPath}".`);
        }
        return resolvedPath;
    } else {
        throw new Error(`Invalid data source: "${JSON.stringify(source)}".`);
    }
}
