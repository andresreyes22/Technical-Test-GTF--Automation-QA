module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["src/types/**/*.ts", "src/steps/**/*.ts", "src/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "json:reports/json/cucumber-report.json",
      "html:reports/html/cucumber-report.html"
    ],
    publishQuiet: true
  }
};
