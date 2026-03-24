# Technical Test - Automation QA

Automatización E2E de SauceDemo implementada con **Playwright + Cucumber + TypeScript estricto**, usando patrón **Page Object Model (POM)** y enfoque orientado a objetos.

Sitio objetivo: [SauceDemo](https://www.saucedemo.com/)

## Stack técnico

- Node.js + TypeScript (strict)
- Cucumber (Gherkin)
- Playwright (browser automation + video)
- Reportería HTML (Cucumber JSON + reporte consolidado)

## Instalación paso a paso

1. Clonar el repositorio:
   - `git clone <URL_DEL_REPO>`
   - `cd Technical-Test-GTF--Automation-QA`
2. Instalar dependencias:
   - `npm install`
3. Instalar navegador para Playwright:
   - `npx playwright install chromium`

## Ejecución de pruebas

- Ejecutar todos los escenarios:
  - `npm run test`
- Ejecutar solo smoke:
  - `npm run test:smoke`
- Ejecutar regression:
  - `npm run test:regression`
- Ejecutar negativo:
  - `npm run test:negative`
- Ejecutar pruebas y generar reporte consolidado:
  - `npm run test:report`

## Reporte HTML

Después de ejecutar `npm run test:report`, abrir:

- `reports/html/index.html`

También se genera un HTML básico de Cucumber en:

- `reports/html/cucumber-report.html`

## Evidencias

- Videos por scenario: `reports/videos/` (formato `.webm`)
- Screenshots automáticos solo en fallo: `reports/screenshots/`

> Nota: Las evidencias se generan localmente y no se versionan en Git.

## Escenarios implementados

- `@smoke @critical` Happy Path:
  - Login válido
  - Agregar 1 producto al carrito
  - Checkout hasta confirmación
- `@negative @regression` Login fallido:
  - Usuario bloqueado y validación de mensaje de error
- `@regression` Data Driven:
  - Scenario Outline con `standard_user`, `problem_user`, `performance_glitch_user`

## Estructura del proyecto

- `features/`: escenarios Gherkin
- `src/pages/`: Page Objects (POM)
- `src/steps/`: Step definitions tipados
- `src/hooks/`: hooks de Cucumber (timeouts, screenshots, ciclo de browser)
- `src/types/`: World personalizado
- `src/utils/`: utilidades (sanitización y generación de reportes)
- `src/config/`: configuración centralizada
- `dataBase/`: queries y scripts SQL (PostgreSQL 15)

## Buenas prácticas aplicadas

- Timeouts globales vía `setDefaultTimeout()` y `setDefaultNavigationTimeout()`
- Selectores robustos (`data-test`, `id`)
- Validación explícita de redirección `"/"` -> `"/inventory.html"`
- TypeScript estricto
- Diseño orientado a objetos con separación por responsabilidades
