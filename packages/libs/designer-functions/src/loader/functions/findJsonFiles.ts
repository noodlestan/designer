import fs from 'fs/promises';
import path from 'path';

export async function findJsonFiles(dirPath: string): Promise<string[]> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const promises = entries.map(entry => {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            return findJsonFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            return [fullPath];
        }
        return [];
    });
    const files = await Promise.all(promises);
    return files.flat();
}
