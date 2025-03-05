import * as fs from 'fs';
import * as path from 'path';

import type { DataSource } from '@noodlestan/designer-decisions';
import { resolveSourcePath } from '@noodlestan/designer-functions';

function isFile(entry: fs.Dirent, entryPAth: string) {
    return (
        entry.isFile() &&
        entryPAth.endsWith('.ts') &&
        !/index\.ts$/.test(entryPAth) &&
        !/base\.ts$/.test(entryPAth)
    );
}

export async function findTypeFiles(
    source: DataSource,
    paths: string[],
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<string[]> {
    const sourcePath = await resolveSourcePath(source, moduleResolver);

    function getAllTsFiles(dirPath: string): string[] {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        return entries.flatMap(entry => {
            const entryPath = path.resolve(dirPath, entry.name);
            if (entry.isDirectory()) {
                return getAllTsFiles(entryPath);
            } else if (isFile(entry, entryPath)) {
                return entryPath;
            } else {
                return [];
            }
        });
    }

    return paths.flatMap(p => getAllTsFiles(path.join(sourcePath, p)));
}
