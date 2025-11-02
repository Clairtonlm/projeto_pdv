function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

window.onload = function() {
  if (!localStorage.getItem('logado')) {
    window.location.href = 'index.html';
  }
  
  // Exibe usuário logado
  const usuarioLogado = document.getElementById('usuario-logado');
  usuarioLogado.innerHTML = `<i class="fas fa-user"></i> Olá, ${stateManager.state.usuario.nome}!`;

  // Estatísticas usando a nova camada de API
  const estatisticas = APIService.getEstatisticas();
  const estatisticasDiv = document.getElementById('estatisticas');
  
  estatisticasDiv.innerHTML = `
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <h6 class="card-title text-muted"><i class="fas fa-money-bill-wave text-success"></i> Vendas Hoje</h6>
            <p class="display-6 text-success fw-bold">R$ ${estatisticas.totalVendas}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <h6 class="card-title text-muted"><i class="fas fa-box text-primary"></i> Produtos Vendidos</h6>
            <p class="display-6 text-primary fw-bold">${estatisticas.quantidadeVendida}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <h6 class="card-title text-muted"><i class="fas fa-users text-warning"></i> Clientes Atendidos</h6>
            <p class="display-6 text-warning fw-bold">${estatisticas.clientesAtendidos}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};
