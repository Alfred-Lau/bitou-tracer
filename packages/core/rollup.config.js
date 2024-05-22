import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import buildIn from 'rollup-plugin-node-builtins';
// import alias from '@rollup/plugin-alias';
import pkg from './package.json';
import path from 'path';
const production = !process.env.ROLLUP_WATCH;
export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'core',
      file: pkg.browser,
      format: 'umd',
      sourcemap: !production,
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      buildIn(),
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript({
        sourceMap: !production,
        inlineSources: !production,
        lib: ['es2015'],
      }), // so Rollup can convert TypeScript to JavaScript
      // alias({
      //   entries: [
      //     {
      //       find: 'utils',
      //       replacement: path.resolve(__dirname, '../utils/src/index.ts'),
      //     },
      //   ],
      // }),
    ],
  },

  {
    input: 'src/index.ts',
    // external: ["ms"],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript({
        sourceMap: !production,
        inlineSources: !production,
      }), // so Rollup can convert TypeScript to JavaScript
      // alias({
      //   entries: [
      //     {
      //       find: 'utils',
      //       replacement: path.resolve(__dirname, '../utils/src/index.ts'),
      //     },
      //   ],
      // }),
    ],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: !production },
      { file: pkg.module, format: 'es', sourcemap: !production },
    ],
  },
];
