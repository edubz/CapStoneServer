module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: "module", // Allows for the use of imports
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    extends: [
        "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    settings: {
      react: {
        version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    },
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
  };