import { CAPABILITIES } from './constants';

export function isTypefaceCapability(capability: string): boolean {
    return CAPABILITIES.includes(capability);
}
