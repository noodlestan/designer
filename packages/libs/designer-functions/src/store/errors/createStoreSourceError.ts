import { type DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { StoreSourceError } from '../types';

import { ERROR_STORE_SOURCE } from './constants';

type Attributes = DesignerErrorParams<StoreSourceError>;

export const createStoreSourceError = (attributes: Attributes): StoreSourceError => {
    const { type, id, source, path, reason } = attributes || {};

    const message = () => {
        const pathStr = path ? ` Path: "${path}"` : '';
        const errorData = ` Data Source: "${JSON.stringify(source)}"`;
        return `Invalid ${type} "${id}". ${reason}${pathStr}${errorData}`;
    };

    return {
        name: ERROR_STORE_SOURCE,
        type,
        id,
        source,
        path,
        reason,
        message,
    };
};
