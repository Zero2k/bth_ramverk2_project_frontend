module.exports = {
  extends: "airbnb",
  plugins: [
      "react",
      "jsx-a11y",
      "import"
  ],
  rules: {
      "jsx-quotes": 0,
      "comma-dangle": 0,
      "react/prop-types": 0,
      "react/jsx-filename-extension": 0,
      "import/no-extraneous-dependencies": 0,
      "import/prefer-default-export": 0,
  },
  globals: {
      "document": 1,
  },
  parser: "babel-eslint",
};
