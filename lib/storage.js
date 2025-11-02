/**
 * Storage Service - Camada de Persistência de Dados
 * Simula um backend com localStorage
 */
class StorageService {
  constructor() {
    this.initializeData();
  }

  // Inicializa dados fictícios
  initializeData() {
    if (!localStorage.getItem('produtos')) {
      const produtos = [
        { id: 1, nome: 'Coca-Cola 2L', preco: 9.00, estoque: 50, categoria: 'Bebidas' },
        { id: 2, nome: 'Pão de Forma', preco: 7.50, estoque: 30, categoria: 'Padaria' },
        { id: 3, nome: 'Leite Integral 1L', preco: 5.00, estoque: 40, categoria: 'Laticínios' },
        { id: 4, nome: 'Arroz 5kg', preco: 22.90, estoque: 25, categoria: 'Alimentos' },
        { id: 5, nome: 'Feijão 1kg', preco: 7.00, estoque: 35, categoria: 'Alimentos' },
        { id: 6, nome: 'Suco Natural 1L', preco: 8.50, estoque: 20, categoria: 'Bebidas' },
        { id: 7, nome: 'Biscoito Integral', preco: 4.50, estoque: 60, categoria: 'Snacks' },
        { id: 8, nome: 'Iogurte Natural', preco: 6.00, estoque: 45, categoria: 'Laticínios' }
      ];
      localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    if (!localStorage.getItem('vendas')) {
      const vendas = [
        { id: 1, data: '01/11/2025', produto: 'Coca-Cola 2L', quantidade: 2, valor: 18.00 },
        { id: 2, data: '01/11/2025', produto: 'Pão de Forma', quantidade: 1, valor: 7.50 },
        { id: 3, data: '01/11/2025', produto: 'Leite Integral 1L', quantidade: 3, valor: 15.00 },
        { id: 4, data: '31/10/2025', produto: 'Arroz 5kg', quantidade: 1, valor: 22.90 },
        { id: 5, data: '31/10/2025', produto: 'Feijão 1kg', quantidade: 2, valor: 14.00 }
      ];
      localStorage.setItem('vendas', JSON.stringify(vendas));
    }

    if (!localStorage.getItem('usuario')) {
      const usuario = { nome: 'admin', senha: '1234' };
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  // Produtos
  getProdutos() {
    return JSON.parse(localStorage.getItem('produtos') || '[]');
  }

  getProdutoById(id) {
    const produtos = this.getProdutos();
    return produtos.find(p => p.id === parseInt(id));
  }

  saveProduto(produto) {
    const produtos = this.getProdutos();
    if (produto.id) {
      const index = produtos.findIndex(p => p.id === produto.id);
      produtos[index] = produto;
    } else {
      produto.id = Date.now();
      produtos.push(produto);
    }
    localStorage.setItem('produtos', JSON.stringify(produtos));
    return produto;
  }

  deleteProduto(id) {
    const produtos = this.getProdutos();
    const filtered = produtos.filter(p => p.id !== parseInt(id));
    localStorage.setItem('produtos', JSON.stringify(filtered));
  }

  // Vendas
  getVendas() {
    return JSON.parse(localStorage.getItem('vendas') || '[]');
  }

  addVenda(venda) {
    const vendas = this.getVendas();
    venda.id = Date.now();
    vendas.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));
    return venda;
  }

  // Estatísticas
  getEstatisticas() {
    const vendas = this.getVendas();
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    const vendasHoje = vendas.filter(v => v.data === hoje);
    const totalVendas = vendasHoje.reduce((acc, v) => acc + v.valor, 0);
    const quantidadeVendida = vendasHoje.reduce((acc, v) => acc + v.quantidade, 0);

    return {
      totalVendas: totalVendas.toFixed(2),
      quantidadeVendida,
      clientesAtendidos: vendasHoje.length
    };
  }
}

// Instância global
const storage = new StorageService();
