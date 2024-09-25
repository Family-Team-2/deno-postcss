import { bold, cyan, getColorEnabled, gray, green, magenta, red, yellow } from 'std/fmt/colors';

export { fileURLToPath, pathToFileURL } from 'node:url';
export { existsSync, readFileSync } from 'node:fs';
export { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
export { Buffer } from 'node:buffer';

export { SourceMapConsumer, SourceMapGenerator } from 'sourcemap';

export { nanoid } from 'nanoid';

export const pico = {
    isColorSupported: getColorEnabled(),
    createColors: () => ({ bold, red, gray }),
    cyan,
    gray,
    green,
    yellow,
    magenta,
};
