import { DECISION_TYPE_METAS } from '@noodlestan/designer-decisions';

export const createSidebar = (): unknown => {
    const types = DECISION_TYPE_METAS.map(decisionType => ({
        link: `/models/decision-types/${decisionType.type}`,
        label: decisionType.name,
    }));

    return [
        {
            label: 'Guides',
            autogenerate: { directory: 'guides' },
        },
        {
            label: 'Examples',
            autogenerate: { directory: 'examples' },
        },
        {
            label: 'Integrations',
            collapsed: true,
            autogenerate: { directory: 'integrations' },
        },
        {
            label: 'Models',
            collapsed: true,
            items: [
                {
                    label: 'Index',
                    link: 'models',
                },
                {
                    label: 'Schemas',
                    link: 'models/schemas',
                },
                {
                    label: 'Decision Types',
                    collapsed: true,
                    items: [
                        {
                            label: 'Index',
                            link: 'models/decision-types',
                        },
                        ...types,
                    ],
                },
            ],
        },
        {
            label: 'API',
            collapsed: true,
            autogenerate: { directory: 'api', collapsed: true },
        },
    ];
};
