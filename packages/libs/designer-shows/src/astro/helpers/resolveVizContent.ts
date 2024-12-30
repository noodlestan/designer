import type { ShowContent, ShowValueSize } from '../types';

import { createShuffledText } from './createShuffledText';
import { TEXT_SENTENCES, TYPEFACE_STRING } from './private';
import { resolveVizContentLength } from './resolveVizContentLength';

const trimToMaxLength = (text: string, maxLength?: number): string => {
    const t = text.trim();
    if (maxLength !== undefined) {
        return t.slice(0, maxLength);
    }
    return t;
};

export const resolveVizContent = (
    options: ShowContent = {},
    size?: ShowValueSize,
    maxLength?: number,
): string => {
    const length = maxLength ?? resolveVizContentLength(options, size);
    const { mode, content } = options;
    if (mode === 'graphic' || mode === 'slot') {
        return content || '*';
    } else if (mode === 'typeface') {
        return trimToMaxLength(content || TYPEFACE_STRING, length);
    } else if (mode === 'text') {
        return trimToMaxLength(content || createShuffledText(TEXT_SENTENCES), length);
    }
    return '';
};