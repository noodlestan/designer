import type { DesignerConfigError } from './types';

type Attributes = Omit<DesignerConfigError, 'message'>;

export const createConfigError = (error: Attributes['error']): DesignerConfigError => {
    const message = () => `${error.instancePath} (${error.keyword}) ${error.message}`;

    return {
        error,
        message,
    };
};
