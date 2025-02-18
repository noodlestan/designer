import type { DesignerConfig, Store } from '@noodlestan/designer-functions';

import type { DesignerDocPermalink } from '../content';

export type DesignerPermalink = DesignerDocPermalink & {
    slug: string;
};

export type DesignerAstroIntegrationAPI = {
    config: DesignerConfig;
    build: () => Promise<Store>;
};
