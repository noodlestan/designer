import fs from 'fs/promises';

import { PackageJson } from '../types';

export async function readPackage(file: string): Promise<PackageJson> {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}
