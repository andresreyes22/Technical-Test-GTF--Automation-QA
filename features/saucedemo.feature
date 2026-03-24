@e2e
Feature: Flujo completo de compra en SauceDemo
  Como usuario de SauceDemo
  Quiero autenticarme y comprar un producto
  Para validar el flujo crítico de e-commerce

  @smoke @critical
  Scenario: Happy Path
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "standard_user"
    Then debería ver el inventario de productos
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el carrito debe mostrar 1 producto
    When abro el carrito
    Then debo ver el producto "Sauce Labs Backpack" en el carrito
    When completo el checkout con nombre "Andres", apellido "Reyes" y código postal "110111"
    Then debo ver la confirmación "Thank you for your order!"

  @negative @regression
  Scenario: Login Fallido
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "locked_out_user"
    Then debería ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."

  @regression
  Scenario Outline: Data Driven login válido con múltiples usuarios
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "<usuario>"
    Then debería ver el inventario de productos

    Examples:
      | usuario                  |
      | standard_user            |
      | problem_user             |
      | performance_glitch_user  |
