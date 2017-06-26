import rollup from 'rollup';

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const packgeJson_name = 'boxpacker';

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
    { dest: `dist/${packgeJson_name}.cjs.js`,      format: 'cjs' },
    { dest: `dist/${packgeJson_name}.es2015.js`,   format: 'es' },
    { dest: `dist/${packgeJson_name}.js`,          format: 'iife',  moduleName: packgeJson_name },
  ],
}
