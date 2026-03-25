@checkout
Feature: Proceso de checkout
  Como cliente
  Quiero proporcionar mi información de checkout
  Para finalizar mi pedido

  @regression
  Scenario: Completar checkout con datos de cliente dirigidos por tabla
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "standard_user"
    Then debería ver el inventario de productos
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el carrito refleja el producto agregado
    When abro el carrito
    Then debo ver el producto "Sauce Labs Backpack" en el carrito
    When completo el checkout con:
      | firstName | lastName | postalCode |
      | Andres    | Reyes    | 110111     |
    Then debo ver la confirmación "Thank you for your order!"
