export function md5Sync(message: string): string {
    function rotateLeft(lValue: number, iShiftBits: number) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function addUnsigned(lX: number, lY: number) {
        const lX8 = lX & 0x80000000;
        const lY8 = lY & 0x80000000;
        const lX4 = lX & 0x40000000;
        const lY4 = lY & 0x40000000;
        const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
        if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        if (lX4 | lY4) {
            return lResult & 0x40000000
                ? lResult ^ 0xc0000000 ^ lX8 ^ lY8
                : lResult ^ 0x40000000 ^ lX8 ^ lY8;
        } else {
            return lResult ^ lX8 ^ lY8;
        }
    }

    function wordToHex(lValue: number) {
        let wordToHexValue = '';
        let wordToHexValueTemp;
        let lByte;
        let lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValueTemp = '0' + lByte.toString(16);
            wordToHexValue += wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
        }
        return wordToHexValue;
    }

    function utf8Encode(text: string) {
        return unescape(encodeURIComponent(text));
    }

    function md5Transform(
        a: number,
        b: number,
        c: number,
        d: number,
        x: number[],
        s: number[],
        k: number[],
    ) {
        const aa = a;
        const bb = b;
        const cc = c;
        const dd = d;
        const funcs = [
            (b: number, c: number, d: number) => (b & c) | (~b & d),
            (b: number, c: number, d: number) => (b & d) | (c & ~d),
            (b: number, c: number, d: number) => b ^ c ^ d,
            (b: number, c: number, d: number) => c ^ (b | ~d),
        ];

        for (let i = 0; i < 64; i++) {
            const div16 = Math.floor(i / 16);
            const f = funcs[div16](b, c, d);
            const temp = d;
            d = c;
            c = b;
            b = addUnsigned(
                b,
                rotateLeft(addUnsigned(a, addUnsigned(f, addUnsigned(x[k[i]], s[i]))), s[i + 64]),
            );
            a = temp;
        }

        return [addUnsigned(a, aa), addUnsigned(b, bb), addUnsigned(c, cc), addUnsigned(d, dd)];
    }

    function md5Main(message: string) {
        message = utf8Encode(message);
        const x: number[] = [];
        for (let i = 0; i < message.length * 8; i += 8) {
            x[i >> 5] |= (message.charCodeAt(i / 8) & 0xff) << i % 32;
        }
        x[(message.length * 8) >> 5] |= 0x80 << (message.length * 8) % 32;
        x[((message.length + 8) >> 6) * 16 + 14] = message.length * 8;

        let a = 0x67452301;
        let b = 0xefcdab89;
        let c = 0x98badcfe;
        let d = 0x10325476;

        const s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
        const k = [
            0, 1, 5, 0, 4, 1, 5, 0, 4, 1, 5, 0, 4, 1, 5, 0, 1, 5, 0, 4, 1, 5, 0, 4, 1, 5, 0, 4, 1,
            5, 0, 4, 5, 0, 4, 1, 5, 0, 4, 1, 5, 0, 4, 1, 5, 0, 4, 1, 0, 4, 1, 5, 0, 4, 1, 5, 0, 4,
            1, 5, 0, 4, 1, 5,
        ];

        for (let i = 0; i < x.length; i += 16) {
            [a, b, c, d] = md5Transform(a, b, c, d, x.slice(i, i + 16), s, k);
        }

        return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    }

    return md5Main(message);
}
