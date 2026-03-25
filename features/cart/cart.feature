@cart
Feature: Gestión del carrito de compras
  Como cliente
  Quiero gestionar productos en mi carrito
  Para revisar mi compra antes del checkout

  @regression
  Scenario: Agregar producto al carrito desde inventario
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "standard_user"
    Then debería ver el inventario de productos
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el carrito refleja el producto agregado
