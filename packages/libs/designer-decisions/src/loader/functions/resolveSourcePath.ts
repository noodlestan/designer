import fs from 'fs';
import path from 'path';

import type { SchemaSource, SchemaSourcePackage, SchemaSourcePath } from '../../types';

export async function resolveSourcePath(
    source: SchemaSource,
    modulePathResolver: (moduleName: string) => Promise<string>,
): Promise<string> {
    if (source.type === 'package') {
        const packageSource = source as SchemaSourcePackage;
        const packagePath = await modulePathResolver(packageSource.package);
        const packageDir = source.path ? path.join(packagePath, source.path) : packagePath;
        if (!fs.existsSync(packageDir)) {
            throw new Error(
                `Package directory not found for "${packageSource.package}" at "${packageDir}".`,
            );
        }
        return packageDir;
    } else if (source.type === 'path') {
        const pathSource = source as SchemaSourcePath;
        const resolvedPath = path.resolve(pathSource.path);
        if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Path not found for "${pathSource.path}" at "${resolvedPath}".`);
        }
        return resolvedPath;
    } else {
        throw new Error(`Invalid source: "${JSON.stringify(source)}".`);
    }
}
