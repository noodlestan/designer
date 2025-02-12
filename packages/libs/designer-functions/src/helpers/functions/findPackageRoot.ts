import fs from 'fs';
import path from 'path';

export function findPackageRoot(startPath: string): string {
    let dir = path.dirname(startPath);
    while (dir !== path.dirname(dir)) {
        if (fs.existsSync(path.join(dir, 'package.json'))) {
            return dir; // Found the package root
        }
        dir = path.dirname(dir);
    }
    throw new Error(`Package root not found for path: ${startPath}`);
}
