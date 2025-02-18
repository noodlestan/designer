import { type DesignerErrorParams, serializeErrorData } from '@noodlestan/designer-decisions';

import type { StoreOptionsError } from '../types';

import { ERROR_STORE_OPTIONS } from './constants';

type Attributes = DesignerErrorParams<StoreOptionsError>;

export const createOptionsError = (attributes: Attributes): StoreOptionsError => {
    const { path, reason, options } = attributes || {};

    const message = () => {
        return `Invalid StoreOptions: ${path}. ${reason} ${serializeErrorData(options)}`;
    };

    return {
        name: ERROR_STORE_OPTIONS,
        path,
        reason,
        options,
        message,
    };
};
