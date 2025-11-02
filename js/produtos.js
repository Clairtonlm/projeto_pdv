// Em breve: funcionalidades de cadastro/lista de produtos

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos();

  // Limpar formulário ao abrir modal
  document.getElementById('modalProduto').addEventListener('show.bs.modal', function() {
    limparFormulario();
  });
});

function carregarProdutos() {
  const produtos = APIService.getProdutos();
  const tbody = document.getElementById('tabela-produtos');
  
  tbody.innerHTML = '';

  if (produtos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Nenhum produto cadastrado</td></tr>';
    return;
  }

  produtos.forEach(produto => {
    const estoqueStatus = produto.estoque < 10 ? 'text-danger' : 'text-success';
    
    tbody.innerHTML += `
      <tr>
        <td>#${produto.id}</td>
        <td>${produto.nome}</td>
        <td><span class="badge bg-info">${produto.categoria}</span></td>
        <td>R$ ${produto.preco.toFixed(2)}</td>
        <td class="${estoqueStatus}"><strong>${produto.estoque}</strong></td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProduto(${produto.id})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deletarProduto(${produto.id})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

function editarProduto(id) {
  const produto = APIService.getProdutoById(id);
  
  if (produto) {
    document.getElementById('produtoId').value = produto.id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('estoque').value = produto.estoque;

    // Mudar título do modal
    document.querySelector('#modalProduto .modal-title').innerHTML = '<i class="fas fa-edit"></i> Editar Produto';

    // Abrir modal
    new bootstrap.Modal(document.getElementById('modalProduto')).show();
  }
}

function deletarProduto(id) {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    const resultado = APIService.deleteProduto(id);
    mostrarNotificacao(resultado.mensagem, 'success');
    carregarProdutos();
  }
}

function salvarProduto() {
  const id = document.getElementById('produtoId').value;
  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const estoque = parseInt(document.getElementById('estoque').value);

  const produto = {
    ...(id && { id: parseInt(id) }),
    nome,
    categoria,
    preco,
    estoque
  };

  const resultado = APIService.saveProduto(produto);

  if (resultado.sucesso) {
    mostrarNotificacao(resultado.mensagem, 'success');
    bootstrap.Modal.getInstance(document.getElementById('modalProduto')).hide();
    carregarProdutos();
  } else {
    mostrarNotificacao(resultado.mensagem, 'error');
  }
}

function limparFormulario() {
  document.getElementById('produtoId').value = '';
  document.getElementById('nome').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('preco').value = '';
  document.getElementById('estoque').value = '';
  document.querySelector('#modalProduto .modal-title').innerHTML = '<i class="fas fa-box"></i> Novo Produto';
}

function mostrarNotificacao(mensagem, tipo) {
  const alertClass = tipo === 'success' ? 'alert-success' : 'alert-danger';
  const alert = document.createElement('div');
  alert.className = `alert ${alertClass} alert-dismissible fade show`;
  alert.innerHTML = `
    ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.querySelector('.flex-grow-1').insertBefore(alert, document.querySelector('.flex-grow-1').firstChild);
  setTimeout(() => alert.remove(), 3000);
}