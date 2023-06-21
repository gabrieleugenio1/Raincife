const nomeInput = document.querySelector("#nome");
const submitButton = document.querySelector("#submitCadastro");
const validacaoNome = document.querySelector("#validacaoNome");

nomeInput.addEventListener("keyup", () => {
  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+(\s[A-Za-zÀ-ÖØ-öø-ÿ\s']+)+$/u;

  if (regexNome.test(nomeInput.value.trim())) {
    submitButton.disabled = false;
    validacaoNome.textContent = ""; // Limpa a mensagem
  } else {
    submitButton.disabled = true;
    validacaoNome.textContent = "Insira pelo menos seu sobrenome"; // Mostra a mensagem quando não insere o nome com sobrenome
  }
});
