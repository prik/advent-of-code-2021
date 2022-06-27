module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 0,
    'react/prop-types': 0,
    'linebreak-style': 0,
    'no-restricted-syntax': 0,
    'no-loop-func': 0,
    'no-return-assign': 0,
    'no-continue': 0,
    'import/prefer-default-export': 0,
    'max-len': [
      2,
      250,
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_d',
          '_dh',
          '_h',
          '_id',
          '_m',
          '_n',
          '_t',
          '_text',
        ],
      },
    ],
    'object-curly-newline': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
