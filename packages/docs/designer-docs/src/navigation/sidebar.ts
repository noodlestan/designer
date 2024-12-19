import { getCollection } from 'astro:content';

import { sidebar as staticSidebar } from '../../sidebar.static.mjs';

const decisionTypes = await getCollection('decisionTypes');

const decisionTypesHeader = {
    label: 'All Types',
    link: 'decision-types',
};
const decisionTypeItems = decisionTypes.map(d => ({
    link: `decision-types/${d.id}`,
    label: d.data.name,
}));

export const sidebar = [
    ...staticSidebar,
    {
        label: 'Decision Types',
        items: [decisionTypesHeader, ...decisionTypeItems],
    },
];
