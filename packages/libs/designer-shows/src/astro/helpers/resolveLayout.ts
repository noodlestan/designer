import type { LayoutDynamicProps } from '../layouts';
import type { ShowDecisionLayout } from '../types';

export const resolveLayout = (
    value: ShowDecisionLayout,
    defaults: [LayoutDynamicProps['layout'], LayoutDynamicProps['layout']?],
): [LayoutDynamicProps['layout'], LayoutDynamicProps['layout']] => {
    if (typeof value === 'string') {
        return [value, defaults[1] || 'row'];
    }
    if (Array.isArray(value)) {
        return [value[0], value[1] || 'row'];
    }
    return [defaults[0], defaults[1] || 'row'];
};
