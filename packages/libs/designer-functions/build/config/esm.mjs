import { emitTypesPLugin } from '../plugins/emitTypesPlugin.mjs';
import { commonConfig } from './common.mjs';

export const esmConfig = {
    ...commonConfig,
    tsconfig: 'tsconfig.esm.json',
    platform: 'node',
    outfile: 'dist/esm/index.js',
    plugins: [emitTypesPLugin('esm')],
};
