import { ERROR_STORE_OPTIONS, ERROR_STORE_SOURCE, ERROR_STORE_UNEXPECTED } from '../../store';

export const NEW_LINE = ' {}\n';

export const ERROR_DOCS_BASE_URL = 'https://designer-decisions.noodlestan.org/';

export const ERROR_DOCS_PATH: Record<string, string> = {
    [ERROR_STORE_OPTIONS]: '/api/designer-functions/Store/Types/StoreError#storeoptionserror',
    [ERROR_STORE_UNEXPECTED]: '/api/designer-functions/Store/Types/StoreError#storeunexpectederror',
    [ERROR_STORE_SOURCE]: '/api/designer-functions/Store/Types/StoreError#storesourceerror',
};
