/**
 * GUIA DE DESENVOLVIMENTO - Sistema PDV
 * 
 * Como trabalhar com o projeto e adicionar novas funcionalidades
 */

/**
 * ===================================================================
 * 1. ESTRUTURA DE ARQUIVOS EXPLICADA
 * ===================================================================
 */

// lib/storage.js
// └─ StorageService: Acesso aos dados
//    ├─ Métodos: getProdutos(), saveProduto(), deleteProduto()
//    ├─ Métodos: getVendas(), addVenda()
//    └─ Métodos: getEstatisticas()
//    
// USAR QUANDO: Precisa ler/escrever dados (CRUD)

// lib/state.js
// └─ StateManager: Gerenciamento de estado global
//    ├─ Propriedade: state = { usuario, carrinho, filtros }
//    ├─ Método: subscribe(callback) - Registra observador
//    ├─ Método: setState(novoEstado) - Atualiza estado
//    ├─ Método: addToCart(), removeFromCart(), clearCart()
//    └─ Método: getCartTotal()
//
// USAR QUANDO: Precisa de estado compartilhado entre componentes

// lib/api.js
// └─ APIService: Lógica de negócios
//    ├─ Static login(usuario, senha)
//    ├─ Static getProdutos(filtro)
//    ├─ Static saveProduto(produto)
//    ├─ Static finalizarVenda()
//    ├─ Static getEstatisticas()
//    └─ Static getRelatorio(tipo)
//
// USAR QUANDO: Precisa executar operações de negócio

/**
 * ===================================================================
 * 2. FLUXO DE REQUISIÇÃO TÍPICO
 * ===================================================================
 */

// Exemplo: Criar novo produto

// 1. Usuario interage com UI
// <button onclick="salvarProduto()">Salvar</button>

// 2. Controller (js/produtos.js) captura evento
function salvarProduto() {
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  // ...

  // 3. Controller chama APIService (camada de negócio)
  const resultado = APIService.saveProduto({ nome, preco, ... });

  // 4. APIService valida dados
  // - Verifica campos obrigatórios
  // - Valida tipos

  // 5. APIService chama StorageService (camada de dados)
  storage.saveProduto(produto);

  // 6. StorageService persiste em localStorage
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // 7. Notificar sucesso
  mostrarNotificacao('Produto salvo!', 'success');
  carregarProdutos(); // Re-render
}

/**
 * ===================================================================
 * 3. ADICIONANDO NOVA FUNCIONALIDADE
 * ===================================================================
 */

// Exemplo: Implementar cupom de desconto

// PASSO 1: Adicionar método em StorageService (lib/storage.js)
class StorageService {
  // ...
  
  // Novo método
  aplicarCupom(codigo) {
    const cupons = JSON.parse(localStorage.getItem('cupons') || '[]');
    return cupons.find(c => c.codigo === codigo && !c.usado);
  }
}

// PASSO 2: Adicionar método em APIService (lib/api.js)
class APIService {
  // ...
  
  static aplicarDesconto(codigoCupom) {
    const cupom = storage.aplicarCupom(codigoCupom);
    if (!cupom) {
      return { sucesso: false, mensagem: 'Cupom inválido' };
    }
    
    const desconto = (stateManager.getCartTotal() * cupom.percentual) / 100;
    return { sucesso: true, desconto };
  }
}

// PASSO 3: Usar em um controller (js/pdv.js)
function aplicarCupom() {
  const codigo = document.getElementById('cupom-input').value;
  const resultado = APIService.aplicarDesconto(codigo);
  
  if (resultado.sucesso) {
    // Atualizar estado (vai notificar observadores automaticamente)
    stateManager.setState({
      cupomAplicado: resultado.desconto
    });
    mostrarNotificacao(`Desconto: R$ ${resultado.desconto.toFixed(2)}`, 'success');
  } else {
    mostrarNotificacao(resultado.mensagem, 'error');
  }
}

// PASSO 4: Atualizar UI (pdv.html)
// <input id="cupom-input" type="text" placeholder="Cupom">
// <button onclick="aplicarCupom()">Aplicar</button>

// ISSO É TUDO! Os observadores já funcionam.

/**
 * ===================================================================
 * 4. BOAS PRÁTICAS
 * ===================================================================
 */

// ❌ NÃO FAÇA
function ruim() {
  // Acessar localStorage diretamente
  const produtos = JSON.parse(localStorage.getItem('produtos'));
  // Lógica de negócio acoplada
  if (produtos.length === 0) { /* ... */ }
  // Manipular DOM sem abstração
  document.getElementById('lista').innerHTML = '...';
}

// ✅ FAÇA
function bom() {
  // Use a camada de dados
  const produtos = APIService.getProdutos();
  
  // Use métodos de negócio
  if (produtos.length === 0) {
    mostrarNotificacao('Sem produtos', 'info');
  }
  
  // Use StateManager para reatividade
  stateManager.setState({ produtos });
  
  // UI atualiza via observer automaticamente
}

/**
 * ===================================================================
 * 5. DEBUGGING E TESTES
 * ===================================================================
 */

// Acessar estado no console
console.log('Estado atual:', stateManager.state);

// Testar métodos de API
const resultado = APIService.getProdutos();
console.log('Produtos:', resultado);

// Verificar localStorage
console.log('localStorage:', localStorage);
localStorage.getItem('produtos');

// Simular adicionar ao carrinho
stateManager.addToCart({ id: 1, nome: 'Teste', preco: 10 }, 2);
console.log('Carrinho:', stateManager.state.carrinho);

/**
 * ===================================================================
 * 6. COMMITS RECOMENDADOS
 * ===================================================================
 */

// Commit 1: Feat - Nova feature
// git commit -m "feat: adicionar cupom de desconto"

// Commit 2: Fix - Correção de bug
// git commit -m "fix: corrigir cálculo de estoque"

// Commit 3: Refactor - Melhorar código
// git commit -m "refactor: melhorar validação de cupom"

/**
 * ===================================================================
 * 7. ESCALANDO PARA BACKEND
 * ===================================================================
 */

// ATUALMENTE: lib/storage.js usa localStorage

// MIGRAÇÃO: Trocar StorageService por chamadas HTTP

class StorageService {
  // Antes
  static getProdutos() {
    return JSON.parse(localStorage.getItem('produtos'));
  }
  
  // Depois
  static async getProdutos() {
    const response = await fetch('/api/produtos');
    return response.json();
  }
}

// Controllers continuam igual!
// Apenas StorageService muda
// Isso é o poder da arquitetura em camadas

/**
 * ===================================================================
 * 8. TESTES UNITÁRIOS (Sugerido)
 * ===================================================================
 */

// Com a arquitetura, testar é fácil:

// test/api.test.js
describe('APIService', () => {
  test('saveProduto valida nome', () => {
    const resultado = APIService.saveProduto({ preco: 10 });
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toContain('nome');
  });
  
  test('saveProduto aceita válido', () => {
    const resultado = APIService.saveProduto({
      nome: 'Teste',
      preco: 10,
      estoque: 5
    });
    expect(resultado.sucesso).toBe(true);
  });
});

// test/state.test.js
describe('StateManager', () => {
  test('addToCart adiciona produto', () => {
    stateManager.addToCart({ id: 1, nome: 'Teste', preco: 10 });
    expect(stateManager.state.carrinho.length).toBe(1);
  });
  
  test('subscribe notifica observer', () => {
    const mock = jest.fn();
    stateManager.subscribe(mock);
    stateManager.addToCart({ id: 1, nome: 'Teste', preco: 10 });
    expect(mock).toHaveBeenCalled();
  });
});

/**
 * ===================================================================
 * 9. CHECKLISTA PARA ADICIONAR FEATURE
 * ===================================================================
 */

// Toda nova funcionalidade deve seguir:

// [ ] 1. Adicionar método em StorageService (lib/storage.js)
// [ ] 2. Adicionar método em APIService (lib/api.js)
// [ ] 3. Adicionar estado em StateManager se necessário (lib/state.js)
// [ ] 4. Implementar em controller (js/*.js)
// [ ] 5. Adicionar UI (*.html)
// [ ] 6. Testar fluxo completo
// [ ] 7. Documentar mudanças
// [ ] 8. Commit com mensagem clara

/**
 * ===================================================================
 * 10. COMANDO ÚTEIS (Se usar com git/npm)
 * ===================================================================
 */

// npm install

// npm run dev        # Iniciar servidor local
// npm run build      # Build para produção
// npm run test       # Rodar testes
// npm run lint       # Verificar código

// git add .
// git commit -m "feat: nova funcionalidade"
// git push origin main

/**
 * ===================================================================
 * CONCLUSÃO
 * ===================================================================
 * 
 * Seguindo esta arquitetura:
 * ✅ Novo desenvolvedor entende o código rapidamente
 * ✅ Adicionar features é previsível
 * ✅ Bugs são isolados e fáceis de corrigir
 * ✅ Código é testável
 * ✅ Projeto escala facilmente
 * 
 * Happy coding! 🚀
 */
