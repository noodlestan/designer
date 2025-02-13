import type { DesignerDecisionsConfigError } from './types';

type Attributes = Omit<DesignerDecisionsConfigError, 'message'>;

export const createConfigError = (error: Attributes['error']): DesignerDecisionsConfigError => {
    const message = () => `${error.instancePath} (${error.keyword}) ${error.message}`;

    return {
        error,
        message,
    };
};
