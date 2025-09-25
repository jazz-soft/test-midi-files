import globals from "globals";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                ...globals.node
            }
        },
        rules: {
            "no-unused-vars": ["error", { caughtErrors: "none"}]
        }
    }
];