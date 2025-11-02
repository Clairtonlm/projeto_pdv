// Em breve: funcionalidades de venda rápida

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

let filtroAtivo = '';

document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos();

  // Busca em tempo real
  document.getElementById('busca-produto').addEventListener('keyup', function(e) {
    filtroAtivo = e.target.value;
    carregarProdutos(filtroAtivo);
  });

  // Atualizar carrinho quando estado mudar
  stateManager.subscribe(atualizarCarrinho);
});

function carregarProdutos(filtro = '') {
  const produtos = APIService.getProdutos(filtro ? { busca: filtro } : null);
  const container = document.getElementById('produtos-lista');
  
  container.innerHTML = '';

  if (produtos.length === 0) {
    container.innerHTML = '<p class="col-12 text-muted text-center">Nenhum produto encontrado</p>';
    return;
  }

  produtos.forEach(produto => {
    const estoque = produto.estoque > 0 ? `<span class="badge bg-success">${produto.estoque} em estoque</span>` : '<span class="badge bg-danger">Sem estoque</span>';
    
    container.innerHTML += `
      <div class="col-md-6 mb-3">
        <div class="card h-100 shadow-sm border-0 rounded-3">
          <div class="card-body">
            <h6 class="card-title">${produto.nome}</h6>
            <p class="card-text text-muted small">${produto.categoria}</p>
            <div class="d-flex justify-content-between align-items-center">
              <strong class="text-success">R$ ${produto.preco.toFixed(2)}</strong>
              ${estoque}
            </div>
            <div class="mt-2">
              ${produto.estoque > 0 ? `<button class="btn btn-sm btn-primary w-100" onclick="adicionarCarrinho(${produto.id})"><i class="fas fa-plus"></i> Adicionar</button>` : '<button class="btn btn-sm btn-secondary w-100" disabled>Indisponível</button>'}
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function adicionarCarrinho(produtoId) {
  const produto = APIService.getProdutoById(produtoId);
  if (produto) {
    stateManager.addToCart(produto, 1);
    mostrarNotificacao('Produto adicionado ao carrinho!', 'success');
  }
}

function atualizarCarrinho() {
  const container = document.getElementById('carrinho-itens');
  const carrinho = stateManager.state.carrinho;

  if (carrinho.length === 0) {
    container.innerHTML = '<p class="text-muted text-center">Carrinho vazio</p>';
    document.getElementById('total-carrinho').textContent = 'R$ 0,00';
    return;
  }

  container.innerHTML = carrinho.map(item => `
    <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
      <div>
        <small class="d-block text-dark">${item.nome}</small>
        <small class="text-muted">R$ ${item.preco.toFixed(2)} x ${item.quantidade}</small>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <button class="btn btn-outline-secondary" onclick="removerDoCarrinho(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');

  document.getElementById('total-carrinho').textContent = `R$ ${stateManager.getCartTotal()}`;
}

function removerDoCarrinho(produtoId) {
  stateManager.removeFromCart(produtoId);
  mostrarNotificacao('Produto removido do carrinho!', 'warning');
}

function limparCarrinho() {
  if (confirm('Tem certeza que deseja limpar o carrinho?')) {
    stateManager.clearCart();
    mostrarNotificacao('Carrinho limpo!', 'info');
  }
}

function finalizarVenda() {
  if (stateManager.state.carrinho.length === 0) {
    mostrarNotificacao('Carrinho vazio!', 'error');
    return;
  }

  const resultado = APIService.finalizarVenda();
  if (resultado.sucesso) {
    mostrarNotificacao(`Venda realizada com sucesso! Total: R$ ${resultado.venda.total}`, 'success');
    setTimeout(() => carregarProdutos(), 1000);
  } else {
    mostrarNotificacao(resultado.mensagem, 'error');
  }
}

function mostrarNotificacao(mensagem, tipo) {
  const alertClass = {
    'success': 'alert-success',
    'error': 'alert-danger',
    'warning': 'alert-warning',
    'info': 'alert-info'
  }[tipo] || 'alert-info';

  const alert = document.createElement('div');
  alert.className = `alert ${alertClass} alert-dismissible fade show`;
  alert.innerHTML = `
    ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.querySelector('.flex-grow-1').insertBefore(alert, document.querySelector('.flex-grow-1').firstChild);
  setTimeout(() => alert.remove(), 3000);
}