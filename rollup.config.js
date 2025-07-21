// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const config = {
  input: 'src/index.js',
  external: [], 
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not dead']
          }
        }]
      ]
    })
  ]
};

export default [
  // ES6 module build
  {
    ...config,
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  },
  // CommonJS build
  {
    ...config,
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'default'
    }
  },
  // UMD build for browsers
  {
    ...config,
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'PhoneValidator'
    }
  },
  // Minified UMD build
  {
    ...config,
    plugins: [...config.plugins, terser()],
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'PhoneValidator'
    }
  }
];