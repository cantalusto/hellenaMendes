import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});
const config = [
  {
    ignores: [
      ".next/**",
      ".next-verify/**",
      ".npm-cache/**",
      "node_modules/**",
      "out/**",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
