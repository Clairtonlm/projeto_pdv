// Em breve: funcionalidades de configurações

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  carregarConfigurações();
});

function carregarConfigurações() {
  // Carregar informações da empresa do localStorage
  const empresa = JSON.parse(localStorage.getItem('empresa')) || {};
  
  document.getElementById('nomeEmpresa').value = empresa.nome || 'Loja PDV';
  document.getElementById('cnpj').value = empresa.cnpj || '';
  document.getElementById('telefone').value = empresa.telefone || '';

  // Carregar preferências
  const preferencias = JSON.parse(localStorage.getItem('preferencias')) || {};
  document.getElementById('notificacoes').checked = preferencias.notificacoes !== false;
  document.getElementById('Som').checked = preferencias.som !== false;
  document.getElementById('autoBackup').checked = preferencias.backup !== false;
}

function alterarSenha() {
  const senhaAtual = document.getElementById('senhaAtual').value;
  const novaSenha = document.getElementById('novaSenha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;

  if (!senhaAtual || !novaSenha || !confirmaSenha) {
    mostrarNotificacao('Preencha todos os campos!', 'error');
    return;
  }

  if (novaSenha !== confirmaSenha) {
    mostrarNotificacao('As senhas não conferem!', 'error');
    return;
  }

  if (novaSenha.length < 4) {
    mostrarNotificacao('A senha deve ter pelo menos 4 caracteres!', 'error');
    return;
  }

  const usuarioArmazenado = JSON.parse(localStorage.getItem('usuario'));
  if (senhaAtual !== usuarioArmazenado.senha) {
    mostrarNotificacao('Senha atual incorreta!', 'error');
    return;
  }

  usuarioArmazenado.senha = novaSenha;
  localStorage.setItem('usuario', JSON.stringify(usuarioArmazenado));

  mostrarNotificacao('Senha alterada com sucesso!', 'success');
  document.getElementById('formSenha').reset();
}

function salvarInformacoes() {
  const empresa = {
    nome: document.getElementById('nomeEmpresa').value,
    cnpj: document.getElementById('cnpj').value,
    telefone: document.getElementById('telefone').value
  };

  localStorage.setItem('empresa', JSON.stringify(empresa));
  mostrarNotificacao('Informações salvas com sucesso!', 'success');
}

function exportarDados() {
  try {
    const dados = {
      produtos: storage.getProdutos(),
      vendas: storage.getVendas(),
      empresa: JSON.parse(localStorage.getItem('empresa')) || {},
      dataExportacao: new Date().toLocaleString('pt-BR')
    };

    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdv_backup_${new Date().getTime()}.json`;
    a.click();

    mostrarNotificacao('Dados exportados com sucesso!', 'success');
  } catch (erro) {
    mostrarNotificacao('Erro ao exportar dados!', 'error');
  }
}

function limparDados() {
  if (!confirm('ATENÇÃO: Esta ação é irreversível! Todos os dados serão perdidos. Tem certeza?')) {
    return;
  }

  if (!confirm('Clique OK novamente para confirmar permanentemente.')) {
    return;
  }

  localStorage.removeItem('produtos');
  localStorage.removeItem('vendas');
  
  mostrarNotificacao('Dados limpos com sucesso!', 'success');
  
  // Reinicializar dados padrão
  storage.initializeData();
  
  setTimeout(() => window.location.href = 'dashboard.html', 1500);
}

function mostrarNotificacao(mensagem, tipo) {
  const alertClass = tipo === 'success' ? 'alert-success' : (tipo === 'error' ? 'alert-danger' : 'alert-warning');
  const alert = document.createElement('div');
  alert.className = `alert ${alertClass} alert-dismissible fade show`;
  alert.innerHTML = `
    ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.querySelector('.flex-grow-1').insertBefore(alert, document.querySelector('.flex-grow-1').firstChild);
  setTimeout(() => alert.remove(), 3000);
}