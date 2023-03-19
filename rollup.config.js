import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import hookPackage from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  external: ["react", "react-dom"],
  output: [
    {
      file: hookPackage.main,
      format: "esm",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: "bundled" }),
    terser(),
  ],
};
