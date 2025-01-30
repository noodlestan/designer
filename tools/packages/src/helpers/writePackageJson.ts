import fs from 'node:fs/promises';

import { PackageJson } from '../types';

export async function writePackageJson(filename: string, data: PackageJson): Promise<void> {
    await fs.writeFile(filename, JSON.stringify(data, null, 2) + '\n');
    console.info(`Updated ${filename}`);
}
