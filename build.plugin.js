const esbuild = require('esbuild');

esbuild.build({
    bundle: true,
    format: "cjs",
    entryPoints: ['src/plugin/index.ts'],
    external: ['require', 'fs', 'path'],
    outfile: 'dist/ts-operator-overload-plugin.js',
}).catch((err) => {
    console.error(err);
    process.exit(1);
});