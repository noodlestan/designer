import type { DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { StoreUnexpectedError } from '../types';

import { ERROR_STORE_UNEXPECTED } from './constants';

type Attributes = DesignerErrorParams<StoreUnexpectedError>;

export const createUnexpectedError = (attributes?: Attributes): StoreUnexpectedError => {
    const { error } = attributes || {};

    const message = () => {
        return `Unexpected store error.`;
    };

    return {
        name: ERROR_STORE_UNEXPECTED,
        error,
        message,
    };
};
