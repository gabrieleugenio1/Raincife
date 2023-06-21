const nomeInput = document.querySelector("#nome");
const submitButton = document.querySelector("#submitCadastro");
const validacaoNome = document.querySelector("#validacaoNome");

nomeInput.addEventListener("keydown", () => {
  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+(\s[A-Za-zÀ-ÖØ-öø-ÿ\s']+)+$/u;

  if (regexNome.test(nomeInput.value.trim())) {
    submitButton.disabled = false;
    validacaoNome.textContent = ""; // Limpa a mensagem de validação
  } else {
    submitButton.disabled = true;
    validacaoNome.textContent = "Nome inválido"; // Exibe a mensagem de validação
  }
});
