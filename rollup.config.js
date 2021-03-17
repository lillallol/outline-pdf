import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from "rollup-plugin-dts";

export default [
    // cjs -> esm
    {
        input: "./dist/index.js",
        output: {
            file: "./dist/index.esm.js",
            exports: "named",
            format: "esm",
        },
        //had to downgrade download this plugin because it was ignoring named exports and merging them all in a default export in the final bundled file
        //https://github.com/rollup/plugins/issues/556#issuecomment-683036655
        plugins: [nodeResolve(),commonjs()],
    },
    // bundle d.ts
    {
        input: "./dist/index.d.ts",
        output: {
            file: "./dist/index.esm.d.ts",
            format: "cjs",
        },
        plugins: [dts({ respectExternal: false })],
    },
    // bundle @lillallol/outline-pdf + pdf-lib
    // {
    //     input : "./github-pages/src/index.js",
    //     output : {
    //         file : "./index.js",
    //         format : "esm",
    //     }
    // }
];
