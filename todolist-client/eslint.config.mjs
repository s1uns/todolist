import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: ["dist/**/*"],
    ...reactRecommended,
    settings: {
      react: {
        version: "detect"
      }
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    plugins: {
      typescriptEslint,
      react
    },
    rules: {
      semi: "error"
    }
  },
  eslintConfigPrettier
];
