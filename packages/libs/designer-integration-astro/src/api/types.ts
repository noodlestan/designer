import type { DesignerConfig, StaticDecisionStore } from '@noodlestan/designer-functions';

import type { DesignerDocPermalink } from '../content';

export type DesignerPermalink = DesignerDocPermalink & {
    slug: string;
};

export type DesignerAstroIntegrationAPI = {
    config: DesignerConfig;
    loader: () => Promise<StaticDecisionStore>;
};
