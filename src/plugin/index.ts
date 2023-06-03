import { Plugin } from 'esbuild';
import * as fs from 'fs';

import * as nearley from 'nearley';
import * as grammar from '../../dist/PointGrammar';

const injected = `
Number.prototype.add = function(other) { 
    if (isNaN(parseFloat(other))) return other.radd(this);
    return this + other;
}

Number.prototype.mul = function(other) {
    if (isNaN(parseFloat(other))) return other.rmul(this);
    return this * other;
}

Number.prototype.pow = function(other) {
    if (isNaN(parseFloat(other))) return other.rpow(this);
    return this ** other;
}

Number.prototype.lt = function(other) {
    if (isNaN(parseFloat(other))) return other.rlt(this);
    return this < other;
}

Number.prototype.le = function(other) {
    if (isNaN(parseFloat(other))) return other.rle(this);
    return this <= other;
}

String.prototype.add = function(other) {
    return this + other;
}
`

function replaceAll(str: string, from: string, to: string): string {
    return str.split(from).join(to);
}

function parseString(outStr: string, str: string): string {
    try {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        const ret = parser.feed(str);
        const parsedOp = ret.results[0].v;

        // console.log("parsedOp", str, parsedOp);

        outStr = replaceAll(outStr, str, parsedOp)
    } catch (error) {
        // console.log("NOPE", `-${str}-`)
    }
    return outStr
}

function mathReplace(str: string): string {
    const lines = str.split("\n");
    for (let line of lines) {
        str = parseString(str, line)
        // Handle line
        // Handle ='s such as const p3 = p1 + p2, let p4 = p1 + p2
        const equals = line.split(" = "); // == will be a problem?
        if (equals.length == 1) continue;

        const potentialMathOp = equals[1].trim().replace(";", "");
        str = parseString(str, potentialMathOp)
    }
    return str;
}

interface TSOperatorOverloadOptions {
    enabled: boolean;
    runOnAllFiles: boolean;
};

const OptionsDefaults: TSOperatorOverloadOptions = {
    enabled: true,
    runOnAllFiles: true
}

export const TSOperatorOverload = (options: TSOperatorOverloadOptions): Plugin => ({
    name: 'TSOperatorOverload', // Plugin name

    setup(build) {

        options = Object.assign({}, OptionsDefaults, options);
        if (!options.enabled) return;

        build.onLoad({ filter: /.*/ }, async (args) => {
            // Handle load logic
            let contents: string = await fs.promises.readFile(args.path, 'utf8');

            if (!options.runOnAllFiles && !contents.includes("// @operator-overload")) {
                return { contents: contents, loader: 'default' };
            }

            contents = injected + mathReplace(contents);
            // console.log(contents)

            return { contents: contents, loader: 'default' };
        });
    },
});