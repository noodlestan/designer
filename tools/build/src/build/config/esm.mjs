import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { emitTypesPLugin } from '../plugins/emitTypesPlugin.mjs';
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
    plugins: [
        emitTypesPLugin('esm'),
        esbuildPluginFilePathExtensions(),
        copyStaticFilesPlugin('dist/esm'),
    ],
};
