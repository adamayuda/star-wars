module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    // https://www.npmjs.com/package/eslint-plugin-react
    "plugin:react/recommended",
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended",
    // https://www.npmjs.com/package/eslint-config-prettier
    "prettier/@typescript-eslint",
    // https://www.npmjs.com/package/eslint-plugin-prettier
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  plugins: [],
  rules: {
    "prettier/prettier": "error",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    camelcase: 1,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
