@auth
Feature: Autenticación de usuario
  Como usuario registrado
  Quiero iniciar sesión en la plataforma
  Para acceder a funcionalidades protegidas de compra

  @negative @regression
  Scenario: Usuario bloqueado no puede iniciar sesión
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "locked_out_user"
    Then debería ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."

  @regression
  Scenario Outline: Usuarios válidos pueden iniciar sesión
    Given que ingreso al login de SauceDemo
    When inicio sesión con el usuario "<usuario>"
    Then debería ver el inventario de productos

    Examples:
      | usuario                 |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |
