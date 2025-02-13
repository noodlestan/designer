import fs from 'fs/promises';
import path from 'path';

async function copyFilesRecursive(srcDir, destDir, extension) {
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            await fs.mkdir(destPath, { recursive: true });
            await copyFilesRecursive(srcPath, destPath, extension);
        } else if (entry.isFile() && entry.name.endsWith(extension)) {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

export function copyStaticFilesPlugin(outdir) {
    return {
        name: 'copy-static-files',
        setup(build) {
            build.onEnd(async () => {
                await copyFilesRecursive('src', outdir, '.json');
            });
        },
    };
}
