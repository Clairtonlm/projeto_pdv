/**
 * State Manager - Gerenciamento de Estado Centralizado
 * Implementa o padrão Observer para componentes reativos
 */
class StateManager {
  constructor() {
    this.state = {
      usuario: { nome: 'admin' },
      carrinho: [],
      filtros: {}
    };
    this.observers = [];
  }

  // Subscrever a mudanças de estado
  subscribe(callback) {
    this.observers.push(callback);
  }

  // Notificar todos os observadores
  notify() {
    this.observers.forEach(callback => callback(this.state));
  }

  // Atualizar estado
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // Operações do Carrinho
  addToCart(produto, quantidade = 1) {
    const item = this.state.carrinho.find(p => p.id === produto.id);
    if (item) {
      item.quantidade += quantidade;
    } else {
      this.state.carrinho.push({ ...produto, quantidade });
    }
    this.notify();
  }

  removeFromCart(produtoId) {
    this.state.carrinho = this.state.carrinho.filter(p => p.id !== produtoId);
    this.notify();
  }

  clearCart() {
    this.state.carrinho = [];
    this.notify();
  }

  getCartTotal() {
    return this.state.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0).toFixed(2);
  }

  getCartItems() {
    return this.state.carrinho.length;
  }

  setFiltros(filtros) {
    this.state.filtros = filtros;
    this.notify();
  }
}

// Instância global
const stateManager = new StateManager();
