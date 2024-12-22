import fs from 'fs/promises';
import path from 'path';

export const loadSchemasFromDirectory = async (
    dirPath: string,
    fileHandler: (filePath: string) => Promise<void>,
): Promise<void> => {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory()) {
            await loadSchemasFromDirectory(fullPath, fileHandler);
        } else if (stats.isFile() && file.endsWith('.json')) {
            await fileHandler(fullPath);
        }
    }
};
