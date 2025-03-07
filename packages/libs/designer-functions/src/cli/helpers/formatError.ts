import { type DesignerError, serializeMaybeError } from '@noodlestan/designer-decisions';

import { ERROR_DOCS_BASE_URL } from './constants';

export const formatError = (
    err: DesignerError,
    useColor = true,
    showRef = true,
    showSource = true,
    showDocs = true,
): string => {
    const prefix = useColor ? `🟥` : 'x';
    const docs = showDocs ? ` 🛟 ${ERROR_DOCS_BASE_URL}${err.docs()}` : '';
    const errorStr = serializeMaybeError(err.error, '\n 💥 {}\n');
    return `${prefix} ${err.message(showRef, showSource)}${docs}${errorStr}`;
};
