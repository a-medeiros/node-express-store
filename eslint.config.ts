import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "max-len": [
        "error",
        {
          code: 160,
        },
      ],
      complexity: [
        "error",
        {
          max: 14,
        },
      ],
    },
  },
  tseslint.configs.recommended,
])
