/// <reference types="./result.d.ts" />
'use strict';
import Warning from './warning.js';

class Result {
    constructor(processor, root, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root;
        this.opts = opts;
        this.css = undefined;
        this.map = undefined;
    }

    toString() {
        return this.css;
    }

    warn(text, opts = {}) {
        if (!opts.plugin) {
            if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
                opts.plugin = this.lastPlugin.postcssPlugin;
            }
        }

        let warning = new Warning(text, opts);
        this.messages.push(warning);

        return warning;
    }

    warnings() {
        return this.messages.filter((i) => i.type === 'warning');
    }

    get content() {
        return this.css;
    }
}

export default Result;

Result.default = Result;
