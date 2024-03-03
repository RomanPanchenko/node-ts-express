module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true
  },
  rules: {
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-useless-constructor": "off",
    "object-curly-spacing": ["error", "always"],
    "semi": [2, "always"],
    "comma-dangle": "off",
    "eol-last": "off",
    "func-style": ["error", "expression"],
    "no-extend-native": "off",
    "@typescript-eslint/no-explicit-any": "off",
  }
};
