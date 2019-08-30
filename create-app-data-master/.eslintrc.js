module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "@vue/prettier",
    "plugin:testcafe/recommended"
  ],
  plugins: ["testcafe"],
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "no-unused-vars": 2,
    "no-undef": 2
  },
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  }
};
