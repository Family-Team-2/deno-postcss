/* eslint-disable no-console */
'use strict';

let printed = {};

export default function warnOnce(message) {
    if (printed[message]) return;
    printed[message] = true;

    if (typeof console !== 'undefined' && console.warn) {
        console.warn(message);
    }
}
