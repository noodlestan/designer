import { getCollection } from 'astro:content';

import { staticSidebar } from '../../sidebar.static.mjs';

import { models } from './models';

export const createSidebar = async (): Promise<unknown> => {
    const decisionTypes = await getCollection('decisionTypes');

    const types = decisionTypes.map(decisionType => ({
        link: `/models/decision-types/${decisionType.id}`,
        label: decisionType.data.name,
    }));

    const items = [...models.map(({ ...item }) => ({ ...item }))];
    items[2].items = [...(items[2].items || []), ...types];

    return staticSidebar({ models: items });
};
