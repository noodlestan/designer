import * as esbuild from 'esbuild';

import { cjsConfig } from './config/cjs.mjs';
import { esmConfig } from './config/esm.mjs';

const cjsCtx = await esbuild.context(cjsConfig);
const esmCtx = await esbuild.context(esmConfig);

await Promise.all([cjsCtx.watch(), esmCtx.watch()]);
