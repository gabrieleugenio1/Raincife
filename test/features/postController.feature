Feature: Testar as rotas do PostController

  Scenario: Cadastro de um novo usuário com sucesso
    Given que eu acesse a rota "/criar-conta" com dados válidos
    Then eu devo ser redirecionado para "/login" com uma mensagem de sucesso

  Scenario: Login de um usuário com sucesso
    Given que eu acesse a rota "/login" com dados válidos
    Then eu devo ser redirecionado para "/home"

  Scenario: Envio de link de recuperação de senha com sucesso
    Given que eu acesse a rota "/envio-link" com um email válido
    Then eu devo ser redirecionado para "/esqueci-senha" com uma mensagem de sucesso

  Scenario: Criação de nova senha com sucesso
    Given que eu acesse a rota "/criar-nova-senha" com dados válidos
    Then eu devo ser redirecionado para "/" com uma mensagem de sucesso

  Scenario: Alteração de usuário com sucesso
    Given que eu acesse a rota "/admin/alterar-user/1" com dados válidos
    Then eu devo ser redirecionado para "/admin" com uma mensagem de sucesso

  Scenario: Deleção de usuário com sucesso
    Given que eu acesse a rota "/admin/delete-user/1" com um ID válido
    Then eu devo ser redirecionado para "/admin" com uma mensagem de sucesso
