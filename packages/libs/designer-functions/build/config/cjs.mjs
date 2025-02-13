import { emitTypesPLugin } from '../plugins/emitTypesPlugin.mjs';
import { commonConfig } from './common.mjs';

export const cjsConfig = {
    ...commonConfig,
    tsconfig: 'tsconfig.cjs.json',
    platform: 'node',
    outfile: 'dist/cjs/index.js',
    plugins: [emitTypesPLugin('cjs')],
};
