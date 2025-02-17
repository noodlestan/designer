/* eslint-disable @typescript-eslint/no-unused-vars */
import resolve from 'resolve';

import { findPackageRoot, getDirName } from './functions';

export async function resolveNodeModule(
    name: string,
    modulePathResolver?: (moduleName: string) => Promise<string>,
): Promise<string | undefined> {
    if (modulePathResolver) {
        try {
            return modulePathResolver(name);
        } catch (error) {}
    } else {
        try {
            const path = resolve.sync(name, { basedir: getDirName() });

            return findPackageRoot(path);
        } catch (error) {}
    }
}
