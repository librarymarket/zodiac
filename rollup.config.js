import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'Zodiac';

export default {
  input: './src/zodiac.ts',

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], babelHelpers: 'bundled' }),
  ],

  output: [
    {
      file: 'dist/zodiac.esm.js',
      format: 'es',
    },
    {
      file: 'dist/zodiac.js',
      format: 'iife',
      name,
    },
    {
      file: 'dist/zodiac.min.js',
      format: 'iife',
      name,
      plugins: [terser()],
    }
  ],
};
