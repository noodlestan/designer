import {
    MONOREPO_ROOT_PATH,
    PACKAGE_META,
    PackageJson,
    readAllPackageJson,
    writePackageJson,
} from '../src';

export const newVersion = process.argv[2];
if (!newVersion) {
    console.error('Usage: ts-node bump-version.ts <new-version>');
    process.exit(1);
}

const parts = newVersion.split();

if (parts.length !== 3 && parts.find(part => part)) {
    console.error('Usage: ts-node bump-version.ts <new-version>');
    console.error(`Invalid version, excepted "x.y.z", received "${newVersion}"`);
    process.exit(1);
}

function updateVersion(data: PackageJson, version: string, dependencies: string[]): PackageJson {
    const updatedData = { ...data, version };

    ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
        if (updatedData[depType]) {
            Object.keys(updatedData[depType]).forEach(dep => {
                if (dependencies.includes(dep)) {
                    updatedData[depType][dep] = newVersion;
                }
            });
        }
    });

    return updatedData;
}

async function main() {
    try {
        const packages = await readAllPackageJson(MONOREPO_ROOT_PATH, PACKAGE_META);
        const depedencies = packages.map(pkg => pkg.data.name);
        const updates = packages.map(({ data, meta }) => {
            const updatedData = updateVersion(data, newVersion, depedencies);
            return writePackageJson(meta.filename, updatedData);
        });

        await Promise.all(updates);
        console.info(`Version updated to ${newVersion} across all packages.`);
    } catch (error) {
        console.error(error);
        console.error('🟥 Error updating versions:');
        process.exit(1);
    }
}

main();
