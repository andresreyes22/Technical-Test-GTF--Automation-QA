module.exports = {
  default: {
    // Rutas de features se pasan por CLI (`npm run test`, IDE, etc.) para evitar
    // merge con glob al ejecutar un único archivo (ver deprecations cucumber-js).
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
