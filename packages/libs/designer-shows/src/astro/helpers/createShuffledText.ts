export const createShuffledText = (sentences: string[], maxLength?: number): string => {
    for (let i = sentences.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
    }

    let result = '';
    for (const sentence of sentences) {
        result += (result.length > 0 ? ' ' : '') + sentence;
        if (maxLength && result.length > maxLength) {
            result = result.slice(0, maxLength - 3).trim() + '...';
            break;
        }
    }

    return result;
};
