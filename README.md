# 🛒 Sistema PDV Profissional - ERP + Ponto de Venda

Um sistema completo de Ponto de Venda (PDV) com arquitetura profissional em camadas, gerenciamento de estado e interface moderna.

## 📋 Características

### ✅ Funcionalidades Implementadas

- **Sistema de Autenticação** - Login seguro com validação de credenciais
- **Dashboard** - Exibição de estatísticas em tempo real (vendas, produtos, clientes)
- **PDV (Venda Rápida)** - Interface intuitiva com:
  - 🔍 Busca de produtos em tempo real
  - 🛒 Carrinho de compras com adicionar/remover itens
  - 💰 Cálculo automático de totais
  - 📦 Controle de estoque

- **Gestão de Produtos** - CRUD completo com:
  - Cadastro de novos produtos
  - Edição de informações
  - Exclusão segura
  - Categorização
  - Controle de estoque

- **Histórico de Vendas** - Relatório detalhado com:
  - Data e hora das transações
  - Produtos vendidos
  - Quantidade e valor total
  - Filtros por período

- **Relatórios Avançados** - Análises visuais com:
  - Gráficos em pizza (distribuição por categoria)
  - Gráficos de barras (estoque)
  - Métricas de vendas
  - Dados de estoque

- **Configurações** - Painel administrativo com:
  - Alterar senha
  - Informações da empresa
  - Preferências do sistema
  - Exportar/Importar dados
  - Limpeza de dados

## 🏗️ Arquitetura - Duas Ideias de Engenheiro

### 1️⃣ Arquitetura em Camadas (Separação de Responsabilidades)

```
┌─────────────────────────────────────┐
│    UI Layer (HTML/CSS)              │
│  ├─ pdv.html                        │
│  ├─ produtos.html                   │
│  ├─ vendas.html                     │
│  ├─ relatorios.html                 │
│  └─ configuracoes.html              │
└─────────────────────────────────────┘
           ↕
┌─────────────────────────────────────┐
│    Business Logic Layer (API)       │
│  └─ lib/api.js (APIService)         │
│     ├─ Autenticação                 │
│     ├─ Operações de Produtos        │
│     ├─ Gerenciamento de Vendas      │
│     ├─ Estatísticas                 │
│     └─ Relatórios                   │
└─────────────────────────────────────┘
           ↕
┌─────────────────────────────────────┐
│    Data Access Layer (Storage)      │
│  └─ lib/storage.js (StorageService) │
│     ├─ Produtos (CRUD)              │
│     ├─ Vendas (Create)              │
│     └─ Estatísticas                 │
└─────────────────────────────────────┘
           ↕
┌─────────────────────────────────────┐
│    Persistence Layer                │
│  └─ localStorage (Simula Backend)   │
└─────────────────────────────────────┘
```

**Benefícios:**
- ✅ Separação clara de responsabilidades
- ✅ Fácil manutenção e evolução
- ✅ Testabilidade
- ✅ Reutilização de código

### 2️⃣ Padrão Observer/Eventos (Reatividade)

```
StateManager (Observable)
    ↓
[Observer 1] → UI Carrinho
[Observer 2] → UI Estatísticas
[Observer 3] → Notificações
    ↑
Ações do Usuário
```

**Implementação:**
```javascript
// Subscrever a mudanças
stateManager.subscribe((novoEstado) => {
  atualizarInterface(novoEstado);
});

// Notificar automaticamente quando estado muda
stateManager.addToCart(produto);
// → Todos os observers são notificados
// → Interfaces reativas se atualizam
```

**Benefícios:**
- ✅ Componentes desacoplados
- ✅ Atualizações reativas
- ✅ Fácil sincronização entre components
- ✅ Padrão escalável

## 📁 Estrutura de Diretórios

```
projeto_pdv/
├── index.html                 # Tela de Login
├── dashboard.html             # Dashboard Principal
├── pdv.html                   # Interface de Venda Rápida
├── produtos.html              # Gerenciamento de Produtos
├── vendas.html                # Histórico de Vendas
├── relatorios.html            # Relatórios e Gráficos
├── configuracoes.html         # Configurações
│
├── css/
│   └── style.css              # Estilos profissionais (220+ linhas)
│
├── js/
│   ├── login.js               # Lógica de autenticação
│   ├── dashboard.js           # Dashboard controller
│   ├── pdv.js                 # PDV controller
│   ├── produtos.js            # Produtos controller (CRUD)
│   ├── vendas.js              # Vendas controller
│   ├── relatorios.js          # Relatórios com Chart.js
│   └── configuracoes.js       # Configurações controller
│
└── lib/
    ├── storage.js             # StorageService (Camada de Dados)
    ├── state.js               # StateManager (Gerenciamento de Estado)
    └── api.js                 # APIService (Lógica de Negócios)
```

## 🔐 Dados de Login

- **Usuário:** `admin`
- **Senha:** `1234`

## 🎨 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **UI Framework:** Bootstrap 5.3
- **Ícones:** Font Awesome 6.4
- **Gráficos:** Chart.js 3.9
- **Storage:** LocalStorage (Persistência)
- **Padrões:** Observer, Arquitetura em Camadas, SOLID

## 🚀 Como Usar

### 1. Login
```
- Acesse index.html
- Use: admin / 1234
```

### 2. PDV (Venda Rápida)
```
- Clique em PDV no menu
- Busque produtos
- Adicione ao carrinho
- Finalize a venda
```

### 3. Produtos
```
- Clique em Produtos
- Crie novo produto
- Edite ou delete conforme necessário
```

### 4. Vendas
```
- Veja histórico completo
- Data, hora, produtos e valores
```

### 5. Relatórios
```
- Gráficos de vendas por categoria
- Distribuição de estoque
- Métricas financeiras
```

### 6. Configurações
```
- Altere senha
- Configure empresa
- Exporte dados (JSON)
```

## 📊 Dados Fictícios Iniciais

O sistema carrega automaticamente:
- **8 Produtos** - Bebidas, Padaria, Laticínios, Alimentos, Snacks
- **5 Vendas** - Histórico para testes
- **Usuário Admin** - admin / 1234

## 🔄 Fluxo de Dados

### Venda Completa:
```
1. Usuário busca produto
   ↓
2. Adiciona ao carrinho (StateManager notifica)
   ↓
3. Finaliza venda (APIService)
   ↓
4. StorageService atualiza estoque e registra venda
   ↓
5. Interface se atualiza (via Observer)
   ↓
6. Relatórios refletem mudanças automáticamente
```

## ✨ Recursos Avançados

### 1. Validação
- Campos obrigatórios verificados
- Senhas com comprimento mínimo
- Produtos validados antes de venda

### 2. Feedback Visual
- Alertas animados (sucesso, erro, aviso)
- Notificações toast
- Badges de status

### 3. Responsividade
- Mobile-first design
- Sidebar colapsável em mobile
- Tabelas adaptáveis

### 4. Performance
- Busca em tempo real otimizada
- Carregamento seletivo de dados
- Sem requisições HTTP (localStorage)

## 🎯 Próximas Melhorias Sugeridas

- [ ] Integração com Backend (Node.js/Express)
- [ ] Banco de dados (PostgreSQL/MongoDB)
- [ ] Sistema de permissões (roles/permissions)
- [ ] Backup automático na nuvem
- [ ] Impressão de recibos
- [ ] QR Code para produtos
- [ ] Integração com câmera (scanning)
- [ ] Sincronização multi-dispositivo
- [ ] Análise de tendências com IA
- [ ] App mobile (React Native/Flutter)

## 📝 Notas de Desenvolvimento

### Implementado com Engenharia de Software Profissional:

1. **Separação em Camadas** - Código organizado por responsabilidade
2. **Padrão Observer** - Reatividade sem coupling
3. **SOLID Principles** - S, O, D implementados
4. **DRY (Don't Repeat Yourself)** - Código reutilizável
5. **Design Patterns** - Factory, Observer, Service Locator
6. **Error Handling** - Tratamento de erros gracioso
7. **UI/UX** - Interface intuitiva e responsiva
8. **Documentação** - Comentários e README completo

## 🤝 Contribuindo

Este é um projeto profissional. Para melhorias:
1. Mantenha a arquitetura em camadas
2. Implemente testes unitários
3. Siga o padrão de nomenclatura
4. Documente as mudanças

## 📄 Licença

Projeto desenvolvido como referência educacional.

---

**Desenvolvido por Clairton Lima - Sistema PDV Profissional 2025**
