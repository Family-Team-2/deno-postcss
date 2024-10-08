/// <reference types="./postcss.d.ts" />
'use strict';
import AtRule from './at-rule.js';
import Comment from './comment.js';
import Container from './container.js';
import CssSyntaxError from './css-syntax-error.js';
import Declaration from './declaration.js';
import Document from './document.js';
import fromJSON from './fromJSON.js';
import Input from './input.js';
import LazyResult from './lazy-result.js';
import list from './list.js';
import Node from './node.js';
import parse from './parse.js';
import Processor from './processor.js';
import Result from './result.js';
import Root from './root.js';
import Rule from './rule.js';
import stringify from './stringify.js';
import Warning from './warning.js';

function postcss(...plugins) {
    if (plugins.length === 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
    }
    return new Processor(plugins);
}

postcss.plugin = function plugin(name, initializer) {
    let warningPrinted = false;
    function creator(...args) {
        // eslint-disable-next-line no-console
        if (console && console.warn && !warningPrinted) {
            warningPrinted = true;
            // eslint-disable-next-line no-console
            console.warn(
                name +
                    ': postcss.plugin was deprecated. Migration guide:\n' +
                    'https://evilmartians.com/chronicles/postcss-8-plugin-migration',
            );
            if (Deno.env.get('LANG') && Deno.env.get('LANG').startsWith('cn')) {
                /* c8 ignore next 7 */
                // eslint-disable-next-line no-console
                console.warn(
                    name +
                        ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
                        'https://www.w3ctech.com/topic/2226',
                );
            }
        }
        let transformer = initializer(...args);
        transformer.postcssPlugin = name;
        transformer.postcssVersion = new Processor().version;
        return transformer;
    }

    let cache;
    Object.defineProperty(creator, 'postcss', {
        get() {
            if (!cache) cache = creator();
            return cache;
        },
    });

    creator.process = function (css, processOpts, pluginOpts) {
        return postcss([creator(pluginOpts)]).process(css, processOpts);
    };

    return creator;
};

postcss.stringify = stringify;
postcss.parse = parse;
postcss.fromJSON = fromJSON;
postcss.list = list;

postcss.comment = (defaults) => new Comment(defaults);
postcss.atRule = (defaults) => new AtRule(defaults);
postcss.decl = (defaults) => new Declaration(defaults);
postcss.rule = (defaults) => new Rule(defaults);
postcss.root = (defaults) => new Root(defaults);
postcss.document = (defaults) => new Document(defaults);

postcss.CssSyntaxError = CssSyntaxError;
postcss.Declaration = Declaration;
postcss.Container = Container;
postcss.Processor = Processor;
postcss.Document = Document;
postcss.Comment = Comment;
postcss.Warning = Warning;
postcss.AtRule = AtRule;
postcss.Result = Result;
postcss.Input = Input;
postcss.Rule = Rule;
postcss.Root = Root;
postcss.Node = Node;

LazyResult.registerPostcss(postcss);

export default postcss;

postcss.default = postcss;
