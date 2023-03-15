import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel';
import hookPackage from './package.json' assert { type: "json" };

export default {
  input: 'src/useModal.ts',
  external: ['react', 'react-dom'],
  output: [
    {
      file: hookPackage.main,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
  ],
}