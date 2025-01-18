import { getCollection } from 'astro:content';

import { staticSidebar } from '../../sidebar.static.mjs';

const decisionTypes = await getCollection('decisionTypes');

const index = {
    label: 'Index',
    link: 'decision-models',
};
const items = decisionTypes.map(decisionType => ({
    link: `decision-models/${decisionType.id}`,
    label: decisionType.data.name,
}));

export const sidebar = staticSidebar({
    decisionModels: {
        label: 'Decision Models',
        collapsed: true,
        items: [index, ...items],
    },
});
