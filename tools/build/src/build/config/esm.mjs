import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { copyStaticFilesPlugin } from '../plugins/copyStaticFiles.mjs';

export const esmConfig = {
    entryPoints: ['src/**/*.ts'],
    format: 'esm',
    outdir: 'dist/esm',
    outExtension: { '.js': '.mjs' },
    bundle: true,
    sourcemap: true,
    platform: 'node',
    target: 'esnext',
    logLevel: 'info',
    plugins: [esbuildPluginFilePathExtensions(), copyStaticFilesPlugin('dist/esm')],
};
