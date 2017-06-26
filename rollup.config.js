import rollup from 'rollup';

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import packgeJson from './package.json';

export default {
  entry:              'src/main.js',
  sourceMap:          true,
  plugins: [
    nodeResolve({
      jsnext:         true,
      main:           true,
      browser:        false,
    }),
    commonjs(),
    babel({
      exclude:        'node_modules/**',
      babelrc:        false,
      presets:        [ [ 'es2015', { modules: false } ] ],
      plugins:        [ 'external-helpers' ],
    }),
  ],
  targets: [
    { dest: `dist/${packgeJson.name}.cjs.js`,      format: 'cjs' },
    { dest: `dist/${packgeJson.name}.es2015.js`,   format: 'es' },
    { dest: `dist/${packgeJson.name}.js`,          format: 'iife',  moduleName: packgeJson.name },
  ],
}
