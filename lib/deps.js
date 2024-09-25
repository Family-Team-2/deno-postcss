import { bold, cyan, getColorEnabled, gray, green, magenta, red, yellow } from 'std/fmt/colors';

export { fileURLToPath, pathToFileURL } from 'node:url';
export { existsSync, readFileSync } from 'node:fs';
export { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
export { Buffer } from 'node:buffer';

export { SourceMapConsumer, SourceMapGenerator } from 'https://deno.land/x/source_map@0.7.5/mod.js';

export { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/nanoid.ts';

export const pico = {
    isColorSupported: getColorEnabled(),
    createColors: () => ({ bold, red, gray }),
    cyan,
    gray,
    green,
    yellow,
    magenta,
};
