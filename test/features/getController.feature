Feature: Testar as rotas do GetController

  Scenario: Acessar a página de index
    Given que eu acesse a rota "/"
    Then eu devo ver o título "Raincife"

  Scenario: Acessar a página de cadastro
    Given que eu acesse a rota "/cadastro"
    Then eu devo ver o título "Raincife - Cadastro"
    
  Scenario: Acessar a página de login
    Given que eu acesse a rota "/login"
    Then eu devo ver o título "Raincife - Login"
