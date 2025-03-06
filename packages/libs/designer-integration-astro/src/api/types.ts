import type { Store } from '@noodlestan/designer-decisions';
import type { BuilderContext, DesignerConfig } from '@noodlestan/designer-functions';

import type { DesignerDocPermalink } from '../content';

export type DesignerPermalink = DesignerDocPermalink & {
    slug: string;
};

export type DesignerAstroIntegrationAPI = {
    config: DesignerConfig;
    context: BuilderContext;
    build: () => Promise<Store>;
};
