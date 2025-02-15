import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import json from "@rollup/plugin-json";

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
    contentBase: ["./dist"],
    host: "0.0.0.0",
    port: 5000,
    allowCrossOrigin: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
};

const plugins = [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    }),
    json(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".ts"],
    }),
    dev && serve(serveopts),
    !dev && terser(),
  ];
  

  export default {
    input: "src/photovoltaic-card.ts",
    output: {
      dir: "dist",
      format: "es",
      sourcemap: false,
    },
    plugins,
    watch: {
      clearScreen: false,
    },
  };