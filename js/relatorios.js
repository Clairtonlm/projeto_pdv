// Em breve: funcionalidades de relatórios

let chartVendas, chartEstoque;

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarRelatorios();
  gerarGraficos();
});

function atualizarRelatorios() {
  // Relatório de Vendas
  const relatorioVendas = APIService.getRelatorio('vendas');
  document.getElementById('total-vendas').textContent = `R$ ${relatorioVendas.totalVendas}`;
  document.getElementById('num-vendas').textContent = relatorioVendas.quantidadeVendas;
  document.getElementById('media-vendas').textContent = `R$ ${relatorioVendas.mediaVendas}`;

  // Relatório de Estoque
  const relatorioEstoque = APIService.getRelatorio('estoque');
  document.getElementById('total-produtos').textContent = relatorioEstoque.totalProdutos;
  document.getElementById('total-estoque').textContent = relatorioEstoque.totalEstoque;
  document.getElementById('baixo-estoque').textContent = relatorioEstoque.produtosComBaixoEstoque;
}

function gerarGraficos() {
  const produtos = APIService.getProdutos();
  const vendas = storage.getVendas();

  // Agrupar por categoria
  const vendidosPorCategoria = {};
  const estoquePorCategoria = {};

  produtos.forEach(p => {
    estoquePorCategoria[p.categoria] = (estoquePorCategoria[p.categoria] || 0) + p.estoque;
  });

  vendas.forEach(v => {
    v.itens?.forEach(item => {
      const produto = storage.getProdutoById(item.id);
      if (produto) {
        vendidosPorCategoria[produto.categoria] = (vendidosPorCategoria[produto.categoria] || 0) + item.quantidade;
      }
    });
  });

  // Gráfico de Vendas
  const ctxVendas = document.getElementById('chartVendas').getContext('2d');
  
  if (chartVendas) chartVendas.destroy();
  
  chartVendas = new Chart(ctxVendas, {
    type: 'doughnut',
    data: {
      labels: Object.keys(vendidosPorCategoria),
      datasets: [{
        data: Object.values(vendidosPorCategoria),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // Gráfico de Estoque
  const ctxEstoque = document.getElementById('chartEstoque').getContext('2d');
  
  if (chartEstoque) chartEstoque.destroy();
  
  chartEstoque = new Chart(ctxEstoque, {
    type: 'bar',
    data: {
      labels: Object.keys(estoquePorCategoria),
      datasets: [{
        label: 'Quantidade em Estoque',
        data: Object.values(estoquePorCategoria),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}