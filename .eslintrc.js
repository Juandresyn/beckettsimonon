module.exports = {
  env: {
    amd: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },

  globals: {
    window: true,
    document: true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  extends: ['eslint:recommended', 'plugin:vue/recommended'],

  plugins: ['jest', 'vue'],

  rules: {
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'no-console': 0,
    'no-multiple-empty-lines': ['error', { max: 3 }],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    'no-undef': 0,
    'prefer-destructuring': 'off',
    quotes: ['error', 'single'],
    radix: ['error', 'as-needed'],
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': [
      1,
      {
        multiline: {
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'any',
          void: 'always',
        },
        svg: 'any',
      },
    ],
  },
};
