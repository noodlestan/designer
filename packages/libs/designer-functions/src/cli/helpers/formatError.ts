import { type DesignerError, serializeMaybeError } from '@noodlestan/designer-decisions';

import { ERROR_DOCS_BASE_URL, ERROR_DOCS_PATH, NEW_LINE } from './constants';

export const formatError = (err: DesignerError): string => {
    const { error, message } = err;
    const docs = ERROR_DOCS_BASE_URL + ERROR_DOCS_PATH[err.name];
    return `🟥 ${message()}\n👉 DOCS: ${docs} ${serializeMaybeError(error, NEW_LINE)}`;
};
