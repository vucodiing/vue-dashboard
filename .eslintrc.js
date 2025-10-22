// .eslintrc.js
export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    // ---- Quy tắc chuẩn để Husky bắt lỗi ----
    semi: ['error', 'always'], // Bắt buộc có dấu ;
    quotes: ['error', 'single'], // Chỉ cho phép dấu nháy đơn
    'no-unused-vars': ['error'], // Không cho phép biến không dùng
    camelcase: ['error'], // Bắt buộc đặt tên camelCase
    'no-console': ['warn'], // Cảnh báo khi còn console.log
    '@typescript-eslint/no-explicit-any': 'warn', // Cảnh báo khi dùng any
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off', // Cho phép tên component 1 từ
  },
}
