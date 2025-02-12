import resolve from 'resolve';

import { findPackageRoot } from './functions';

export async function resolveNodeModule(
    name: string,
    modulePathResolver?: (moduleName: string) => Promise<string>,
): Promise<string> {
    if (modulePathResolver) {
        return modulePathResolver(name);
    } else {
        const path = resolve.sync(name);

        return findPackageRoot(path);
    }
}
