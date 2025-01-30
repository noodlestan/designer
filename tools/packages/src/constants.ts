// src/constants.ts
import { resolve } from 'path';

import { PackageMeta } from './types';

export const MONOREPO_ROOT_PATH = resolve(__dirname, '../../../');

export const PACKAGE_META: PackageMeta[] = [
    { path: 'packages/libs/designer-decisions' },
    { path: 'packages/libs/designer-functions' },
    { path: 'packages/libs/designer-integrations-astro' },
    { path: 'packages/libs/designer-schemas' },
    { path: 'packages/libs/designer-shows' },
    { path: 'packages/clis/designer-generators' },
    { path: 'docs/designer-decisions' },
    { path: 'tools/designer-build' },
    { path: 'tools/packages' },
];
