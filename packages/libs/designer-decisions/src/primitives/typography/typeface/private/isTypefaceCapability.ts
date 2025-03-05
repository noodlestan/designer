import { TYPEFACE_CAPABILITIES } from '../constants';

export function isTypefaceCapability(capability: string): boolean {
    return TYPEFACE_CAPABILITIES.includes(capability);
}
