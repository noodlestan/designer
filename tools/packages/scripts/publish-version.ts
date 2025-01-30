import { execSync } from 'child_process';
import { resolve } from 'path';

import { MONOREPO_ROOT_PATH, PACKAGE_META, PackageData, readAllPackageJson } from '../src';

async function publishPackkage(pkg: PackageData): Promise<void> {
    const { data, meta } = pkg;

    const path = resolve(meta.path);

    console.info(`Publishing ${data.name} from ${path}`);
    try {
        execSync('npm publish', { stdio: 'inherit', cwd: path });
        console.info(`Successfully published ${data.name}`);
    } catch (error) {
        console.error(`Failed to publish ${data.name}`, error);
        throw error;
    }
}

async function main() {
    try {
        const packages = await readAllPackageJson(MONOREPO_ROOT_PATH, PACKAGE_META);

        const updates = packages
            .filter(({ data }) => !data.private)
            .map(pkg => publishPackkage(pkg));

        await Promise.all(updates);
        console.info(`🐘 ${updates.length} packages published.`);
    } catch (error) {
        console.error(error);
        console.error('🟥 Error publishing versions');
        process.exit(1);
    }
}

main();
