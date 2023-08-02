// const path = require("path");

// const buildEslintCommand = (filenames) =>
//   `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

// module.exports = {
//   "*.{js,jsx,ts,tsx}": [buildEslintCommand]
// };

module.exports = {
  // this will check Typescript files
  "**/*.(ts|tsx)": () => "yarn tsc --noEmit",

  // This will lint and format TypeScript and                                             //JavaScript files
  "**/*.(ts|tsx|js|jsx)": (filenames) => [
    `yarn eslint --fix ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`
  ],

  // this will Format MarkDown and JSON
  "**/*.(md|json)": (filenames) => `yarn prettier --write ${filenames.join(" ")}`
};
