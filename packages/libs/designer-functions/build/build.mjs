import * as esbuild from 'esbuild';

import { cjsConfig } from './config/cjs.mjs';
import { esmConfig } from './config/esm.mjs';

await esbuild.build(cjsConfig);
await esbuild.build(esmConfig);
