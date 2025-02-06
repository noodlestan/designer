import type { ShowContent, ShowVizSize } from '../../types';
import { TEXT_SIZE_TO_TEXT, TYPEFACE_SIZE_TO_LENGTH } from '../private';

export const resolveVizContentLength = (
    options: ShowContent = {},
    size: ShowVizSize = 'auto',
): number | undefined => {
    const { mode } = options;
    if (mode === 'graphic' || mode === 'slot') {
        return 0;
    } else if (mode === 'typeface') {
        return TYPEFACE_SIZE_TO_LENGTH[size];
    } else if (mode === 'text') {
        return TEXT_SIZE_TO_TEXT[size];
    }
    return 0;
};
