import { dirname, resolve } from 'path';

import { PackageData, PackageMeta } from '../types';

import { readPackage } from './readPackageJson';

export async function readAllPackageJson(
    root: string,
    metas: PackageMeta[],
): Promise<PackageData[]> {
    const rootFilename = resolve(root, 'package.json');
    const rootPackage = await readPackage(rootFilename);
    const rootData = {
        meta: { path: dirname(rootFilename), filename: rootFilename },
        data: rootPackage,
    };

    const packages = metas.map(async ({ path }) => {
        const filename = resolve(root, path, 'package.json');
        const data = await readPackage(filename);
        return {
            meta: { path: dirname(filename), filename },
            data,
        };
    });

    const packageDatas = await Promise.all(packages);
    return [rootData, ...packageDatas];
}
