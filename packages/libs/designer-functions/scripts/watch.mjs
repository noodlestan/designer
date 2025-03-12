import { cjs, esm } from '@noodlestan/designer-build-tools';

await Promise.all([cjs().watch(), esm().watch()]);
