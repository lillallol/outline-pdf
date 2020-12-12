import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

export default [
    {
        input: "./dist/index.js",
        output: {
            file: "./dist/index.esm.js",
            exports: "named",
            format: "esm",
        },
        external: ["pdf-lib","fs","fs/promises"],
        //had to downgrade download this plugin because it was ignoring named exports and merging them all in a default export in the final bundled file
        //https://github.com/rollup/plugins/issues/556#issuecomment-683036655
        plugins: [commonjs()],
    },
    {
        input: "./dist/index.d.ts",
        output: {
            file: "./dist/index.esm.d.ts",
            format: "cjs",
        },
        external: ["pdf-lib","fs","fs/promises"],
        plugins: [dts({ respectExternal: false })],
    },
];
