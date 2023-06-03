const esbuild = require('esbuild');
const { TSOperatorOverload } = require('./dist/ts-operator-overload-plugin');

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/ts-operator-overload-test.js',
    target: "es2020",
    format: "esm",
    plugins: [TSOperatorOverload({enabled: true, runOnAllFiles: true})],
}).catch((err) => {
    console.error(err);
    process.exit(1);
});