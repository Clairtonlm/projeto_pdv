function login() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  if (!usuario || !senha) {
    mostrarErro('Por favor, preencha usuário e senha!');
    return;
  }

  if (usuario === 'admin' && senha === '1234') {
    localStorage.setItem('logado', 'true');
    window.location.href = 'dashboard.html';
  } else {
    mostrarErro('Usuário ou senha incorretos!');
    document.getElementById('senha').value = '';
  }
}

function mostrarErro(mensagem) {
  const erroDiv = document.getElementById('erro-login');
  erroDiv.textContent = mensagem;
  erroDiv.style.display = 'block';
  setTimeout(() => {
    erroDiv.style.display = 'none';
  }, 3000);
}

// Permitir login com Enter
document.addEventListener('DOMContentLoaded', function() {
  const senha = document.getElementById('senha');
  if (senha) {
    senha.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        login();
      }
    });
  }
});