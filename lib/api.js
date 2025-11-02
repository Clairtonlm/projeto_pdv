/**
 * API Service - Camada de Lógica de Negócios
 * Orquestra operações entre Storage e State
 */
class APIService {
  // Autenticação
  static login(usuario, senha) {
    const usuarioArmazenado = JSON.parse(localStorage.getItem('usuario'));
    if (usuario === usuarioArmazenado.nome && senha === usuarioArmazenado.senha) {
      stateManager.setState({ usuario: { nome: usuario } });
      return { sucesso: true, mensagem: 'Login realizado com sucesso!' };
    }
    return { sucesso: false, mensagem: 'Usuário ou senha incorretos!' };
  }

  // Produtos
  static getProdutos(filtro = null) {
    let produtos = storage.getProdutos();
    if (filtro) {
      if (filtro.categoria) {
        produtos = produtos.filter(p => p.categoria.toLowerCase().includes(filtro.categoria.toLowerCase()));
      }
      if (filtro.busca) {
        produtos = produtos.filter(p => p.nome.toLowerCase().includes(filtro.busca.toLowerCase()));
      }
    }
    return produtos;
  }

  static getProdutoById(id) {
    return storage.getProdutoById(id);
  }

  static saveProduto(produto) {
    if (!produto.nome || !produto.preco || !produto.estoque) {
      return { sucesso: false, mensagem: 'Preencha todos os campos!' };
    }
    storage.saveProduto(produto);
    return { sucesso: true, mensagem: 'Produto salvo com sucesso!' };
  }

  static deleteProduto(id) {
    storage.deleteProduto(id);
    return { sucesso: true, mensagem: 'Produto deletado com sucesso!' };
  }

  // Vendas
  static finalizarVenda() {
    if (stateManager.state.carrinho.length === 0) {
      return { sucesso: false, mensagem: 'Carrinho vazio!' };
    }

    const venda = {
      data: new Date().toLocaleDateString('pt-BR'),
      itens: stateManager.state.carrinho,
      total: stateManager.getCartTotal(),
      horaVenda: new Date().toLocaleTimeString('pt-BR')
    };

    // Atualizar estoque dos produtos
    stateManager.state.carrinho.forEach(item => {
      const produto = storage.getProdutoById(item.id);
      if (produto) {
        produto.estoque -= item.quantidade;
        storage.saveProduto(produto);
      }
    });

    storage.addVenda(venda);
    stateManager.clearCart();
    return { sucesso: true, mensagem: 'Venda realizada com sucesso!', venda };
  }

  static getVendas() {
    return storage.getVendas();
  }

  // Estatísticas
  static getEstatisticas() {
    return storage.getEstatisticas();
  }

  static getRelatorio(tipo = 'vendas') {
    if (tipo === 'vendas') {
      const vendas = storage.getVendas();
      const totalVendas = vendas.reduce((acc, v) => acc + v.valor, 0);
      const mediaVendas = vendas.length > 0 ? (totalVendas / vendas.length).toFixed(2) : 0;

      return {
        totalVendas: totalVendas.toFixed(2),
        quantidadeVendas: vendas.length,
        mediaVendas
      };
    }

    if (tipo === 'estoque') {
      const produtos = storage.getProdutos();
      const totalProdutos = produtos.length;
      const totalEstoque = produtos.reduce((acc, p) => acc + p.estoque, 0);

      return {
        totalProdutos,
        totalEstoque,
        produtosComBaixoEstoque: produtos.filter(p => p.estoque < 10).length
      };
    }
  }
}
