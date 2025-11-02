// Em breve: funcionalidades de histórico de vendas

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  carregarVendas();
});

function carregarVendas() {
  const vendas = APIService.getVendas();
  const tbody = document.getElementById('tabela-vendas');
  
  tbody.innerHTML = '';

  if (vendas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Nenhuma venda registrada</td></tr>';
    return;
  }

  vendas.forEach(venda => {
    const produtos = venda.itens ? venda.itens.map(i => i.nome).join(', ') : venda.produto || 'N/A';
    const quantidade = venda.itens ? venda.itens.reduce((acc, i) => acc + i.quantidade, 0) : venda.quantidade || 0;
    const total = venda.total ? `R$ ${venda.total}` : `R$ ${venda.valor}`;
    const hora = venda.horaVenda || '00:00:00';

    tbody.innerHTML += `
      <tr>
        <td>${venda.data}</td>
        <td>${hora}</td>
        <td><small>${produtos}</small></td>
        <td class="text-center"><span class="badge bg-info">${quantidade}</span></td>
        <td class="text-success fw-bold">${total}</td>
      </tr>
    `;
  });
}
