# Technical Test - Automation QA

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![ESLint](https://img.shields.io/badge/ESLint-Static%20Analysis-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Qodana](https://img.shields.io/badge/Qodana-Code%20Quality-000000?logo=jetbrains&logoColor=white)](https://www.jetbrains.com/qodana/)

Automatización E2E de SauceDemo con **Playwright + Cucumber + TypeScript** usando **Page Object Model (POM)**, enfoque BDD y organización por dominios.

Sitio objetivo: [SauceDemo](https://www.saucedemo.com/)

## Stack técnico

- Node.js + TypeScript (modo estricto)
- Cucumber (Gherkin)
- Playwright (automatización UI + evidencias)
- ESLint (análisis estático de código)
- Qodana (análisis estático para CI/CD)
- Reportería HTML (Cucumber JSON + reporte consolidado)

## Estructura del proyecto

- `features/auth/`: escenarios de autenticación
- `features/cart/`: escenarios de carrito
- `features/checkout/`: escenarios de checkout
- `features/e2e/`: flujos end-to-end
- `src/pages/`: Page Objects
- `src/steps/`: Step Definitions
- `src/hooks/`: Hooks de Cucumber
- `src/types/`: `CustomWorld` y tipados de ejecución
- `src/config/`: configuración centralizada (`dotenv`)
- `src/utils/`: utilidades de reportería y soporte
- `.github/workflows/qodana.yml`: ejecución de Qodana en CI
- `qodana.yaml`: configuración de Qodana
- `eslint.config.mjs`: configuración de ESLint

## Variables de entorno

Este proyecto usa variables de entorno para evitar hardcodear datos sensibles o configurables.

1. Crear archivo local:
   - `cp .env.example .env`
2. Editar valores según tu entorno.

Variables disponibles:

- `BASE_URL`: URL base de la aplicación
- `SAUCE_PASSWORD`: contraseña por defecto para usuarios de prueba
- `STEP_TIMEOUT_MS`: timeout general de steps y hooks
- `NAVIGATION_TIMEOUT_MS`: timeout de navegación Playwright

## Instalación

1. Clonar el repositorio:
   - `git clone <URL_DEL_REPO>`
   - `cd Technical-Test-GTF--Automation-QA`
2. Instalar dependencias:
   - `npm install`
3. Instalar navegador para Playwright:
   - `npx playwright install chromium`
4. Configurar entorno:
   - `cp .env.example .env`

## Ejecución de pruebas

Generales:

- `npm run test`: ejecuta toda la suite
- `npm run test:report`: ejecuta pruebas y genera reporte consolidado

Por dominio/tag:

- `npm run test:auth`: escenarios `@auth`
- `npm run test:cart`: escenarios `@cart`
- `npm run test:checkout`: escenarios `@checkout`
- `npm run test:e2e`: escenarios `@e2e`
- `npm run test:smoke`: escenarios `@smoke`
- `npm run test:negative`: escenarios `@negative`
- `npm run test:regression`: escenarios `@regression`

## Calidad de código (análisis estático)

ESLint:

- `npm run lint`: valida reglas de calidad y TypeScript
- `npm run lint:fix`: corrige automáticamente lo posible

Qodana:

- `npm run lint:qodana`: corre análisis Qodana local (requiere Docker)
- CI: se ejecuta en PR/push a `main` vía `.github/workflows/qodana.yml`

## Reportes y evidencias

Después de `npm run test:report`:

- Reporte consolidado: `reports/html/index.html`
- Reporte Cucumber: `reports/html/cucumber-report.html`
- JSON Cucumber: `reports/json/cucumber-report.json`

Evidencias:

- Videos por escenario: `reports/videos/`
- Screenshots en fallo: `reports/screenshots/`

### Evidencia de ejecución (`.webm`)

- Durante la ejecución se generan videos `.webm` en `reports/videos/`.
- Los videos son evidencia técnica del flujo ejecutado (útil para auditoría y debugging).
- **No se suben al repositorio**: están excluidos por `.gitignore`.
- En evaluaciones o revisiones, basta con indicar en este README su ubicación local.

## Enfoque profesional: impacto, decisiones técnicas y arquitectura

### Impacto en calidad y mantenibilidad

- Organización por dominios (`auth`, `cart`, `checkout`, `e2e`) para escalar cobertura sin volver monolítico el feature set.
- Escenarios declarativos para reducir fragilidad ante cambios de UI.
- Menor riesgo de regresión con suites por tags (`smoke`, `negative`, `regression`) y ejecución selectiva.
- Evidencias automáticas (video y screenshot) para acelerar análisis de fallas.

### Decisiones técnicas (y por qué)

- **Playwright + Cucumber + TypeScript**: equilibrio entre velocidad E2E, legibilidad BDD y seguridad de tipos.
- **Page Object Model**: centraliza selectores/acciones y evita duplicación en steps.
- **DataTable en checkout**: hace el escenario más expresivo y facilita variaciones de datos.
- **`.env` con `dotenv`**: elimina hardcodeo de datos sensibles y permite configuraciones por entorno.
- **ESLint + Qodana**: doble capa de análisis estático (local + CI) para elevar el estándar de calidad.

### Justificación de arquitectura

- Separación por capas:
  - `features/`: intención de negocio.
  - `steps/`: traducción de negocio a acciones verificables.
  - `pages/`: interacción técnica con UI.
  - `hooks/` y `config/`: concerns transversales (ciclo de vida, timeouts, evidencias).
- Esta estructura mantiene bajo acoplamiento, alta cohesión y facilita evolución del framework (nuevas features, nuevos tags, integración CI).
- El diseño prioriza trazabilidad end-to-end: cada escenario tiene pasos legibles y evidencia ejecutable.

## Prácticas implementadas

- Gherkin organizado por dominios de negocio
- Escenarios más declarativos para menor acoplamiento a UI
- DataTable para datos de checkout en BDD
- Configuración sensible por `.env` con fallback seguro
- TypeScript estricto y tipado de `CustomWorld`
- Hooks de Cucumber para ciclo de vida y evidencias
