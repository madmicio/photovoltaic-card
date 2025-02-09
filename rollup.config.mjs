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
    nodeResolve(), // Risolve i moduli da node_modules
    commonjs(), // Converte i moduli CommonJS in ES6
    typescript({
      tsconfig: "./tsconfig.json",
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    }), // Compila TypeScript
    json(), // Supporta importazioni di file JSON
    babel({
      babelHelpers: "bundled", // Usa i helper di Babel in bundle
      exclude: "node_modules/**", // Esclude i moduli esterni
      extensions: [".js", ".ts"], // Estensioni da compilare
    }),
    dev && serve(serveopts), // Serve i file solo in modalità dev
    !dev && terser(), // Minifica il codice in modalità produzione
  ];
  

  export default {
    input: "src/photovoltaic-card.ts", // File di input
    output: {
      dir: "dist", // Cartella di output
      format: "es", // Formato ES6 per importazioni moderne
      sourcemap: dev, // Genera mappe delle sorgenti solo in modalità dev
    },
    plugins, // Usa i plugin definiti sopra
    watch: {
      clearScreen: false, // Non pulire lo schermo su aggiornamenti
    },
  };