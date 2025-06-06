import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  environments: {
    bundle: {
      source: {
        entry: {
          index: './src/bundle.tsx',
        },
      },
    },
    bundleFalse: {
      source: {
        entry: {
          index: './src/bundleFalse.tsx',
        },
      },
    },
    umd: {
      html: {
        tags: [
          {
            tag: 'script',
            attrs: {
              src: '/umd/react.development.js',
            },
            head: true,
            append: true,
          },
          {
            tag: 'script',
            attrs: {
              src: '/umd/react-dom.development.js',
            },
            head: true,
            append: true,
          },
          {
            tag: 'script',
            attrs: {
              src: '/umd/index.js',
            },
            head: true,
            append: true,
          },
        ],
      },
      source: {
        entry: {
          index: './src/umd.tsx',
        },
      },
      output: {
        externals: {
          react: 'window React',
          'react-dom': 'window ReactDom',
          'react-dom/client': 'window ReactDom',
        },
        copy: [
          {
            from: '../../../examples/react-component-umd/dist/umd/index.js',
            to: 'umd/index.js',
          },
          {
            from: 'node_modules/react-18/umd/react.development.js',
            to: 'umd/react.development.js',
          },
          {
            from: 'node_modules/react-dom-18/umd/react-dom.development.js',
            to: 'umd/react-dom.development.js',
          },
        ],
      },
    },
  },
  output: {
    target: 'web',
    dataUriLimit: 0, // always emit asset for test
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'classic',
      },
    }),
  ],
});
