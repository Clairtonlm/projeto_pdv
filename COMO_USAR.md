# 🚀 INSTRUÇÕES DE USO - Sistema PDV

## Como Abrir o Sistema

### Opção 1: Abrir Direto no Navegador (Recomendado)
```
1. Vá até: c:\Users\ClairtonLima\Downloads\Programs\projeto_pdv
2. Clique com botão direito em index.html
3. Abra com: Chrome, Firefox, Edge ou Safari
4. Enjoy! 🎉
```

### Opção 2: Via Servidor Local (Melhor Performance)
```
# Com Python 3
cd "c:\Users\ClairtonLima\Downloads\Programs\projeto_pdv"
python -m http.server 8000

# Com Node.js
npx http-server .

# Depois acesse: http://localhost:8000
```

## Login Padrão

```
Usuário: admin
Senha: 1234
```

## Tutorial Completo

### 1️⃣ TELA DE LOGIN
```
┌─────────────────────────────────┐
│    Sistema PDV                  │
├─────────────────────────────────┤
│ 👤 Usuário                      │
│ [__________________]            │
│                                 │
│ 🔐 Senha                        │
│ [__________________]            │
│                                 │
│ [Entrar]                        │
└─────────────────────────────────┘

✅ Digite: admin
✅ Digite: 1234
✅ Clique em "Entrar"
```

### 2️⃣ DASHBOARD (Home)
```
Você verá:
✅ Seu nome logado no topo
✅ 3 Cards com estatísticas:
   • Vendas Hoje: R$ 0,00 (inicialmente vazio)
   • Produtos Vendidos: 0
   • Clientes Atendidos: 0

Sidebar esquerdo:
├─ 📊 Dashboard (atual)
├─ 🛒 PDV
├─ 📦 Produtos
├─ 📋 Vendas
├─ 📈 Relatórios
├─ ⚙️ Configurações
└─ [Sair]
```

### 3️⃣ PDV - FAZER UMA VENDA (O Coração do Sistema)

**Passo a Passo:**

```
1. Clique em "PDV" no menu esquerdo
   ↓
2. Você verá a tela dividida em 2 partes:
   
   ESQUERDA: Produtos Disponíveis
   DIREITA: Seu Carrinho
   
3. Busque um produto (ex: "Coca")
   • Digite na barra de busca
   • Produtos filtram automaticamente
   
4. Veja o produto:
   ┌──────────────┐
   │ Coca-Cola 2L │
   │ Bebidas      │
   │ R$ 9.00      │
   │ 50 em estoque│
   │ [+ Adicionar]│
   └──────────────┘
   
5. Clique em "+ Adicionar"
   ↓
   PRONTO! Aparece no carrinho à direita
   
6. Repita com outros produtos
   
7. No Carrinho você verá:
   • Produto
   • Quantidade
   • Valor unitário
   • Botão para remover
   
8. Total é calculado automaticamente
   
9. Clique em "[✓ Finalizar Venda]"
   ↓
   VENDA REALIZADA!
   
10. Veja a notificação de sucesso
    Carrinho limpa automaticamente
```

### 4️⃣ PRODUTOS - GERENCIAR ESTOQUE

**Ver Produtos:**
```
1. Clique em "Produtos" no menu
2. Veja tabela com:
   • ID do produto
   • Nome
   • Categoria (badge colorida)
   • Preço
   • Estoque (vermelho se baixo)
   • Ações (editar/deletar)
```

**Criar Novo Produto:**
```
1. Clique no botão "+ Novo Produto" (topo direito)
2. Modal abre com formulário:
   • Nome: [texto]
   • Categoria: [select]
   • Preço: [número]
   • Estoque: [número]
3. Clique em "Salvar"
4. Produto aparece na tabela
```

**Editar Produto:**
```
1. Clique no botão ✏️ (lápis) na linha do produto
2. Modal abre com dados preenchidos
3. Altere o que precisar
4. Clique "Salvar"
5. Mudanças refletem na tabela
```

**Deletar Produto:**
```
1. Clique no botão 🗑️ (lixo) na linha do produto
2. Confirmação aparece
3. Clique "OK"
4. Produto é removido
```

### 5️⃣ VENDAS - VER HISTÓRICO

```
1. Clique em "Vendas" no menu
2. Veja tabela com TODAS as vendas:
   • Data (01/11/2025)
   • Hora (10:30)
   • Produtos vendidos
   • Quantidade
   • Total da venda

3. Mostra histórico completo
   Inclui as vendas que você fez no PDV!
```

### 6️⃣ RELATÓRIOS - ANÁLISES VISUAIS

```
1. Clique em "Relatórios" no menu
2. Veja:

   RESUMO DE VENDAS (tabela):
   • Total de Vendas: R$ X.XXX
   • Número de Vendas: X
   • Ticket Médio: R$ XXX
   
   SITUAÇÃO DE ESTOQUE (tabela):
   • Total de Produtos: 8
   • Quantidade em Estoque: 285
   • Produtos com Baixo Estoque: X
   
   GRÁFICOS (visuais):
   • Gráfico Pizza: Vendas por categoria
   • Gráfico Barras: Estoque por categoria
   
3. Os dados atualizam quando você faz vendas!
```

### 7️⃣ CONFIGURAÇÕES - AJUSTES

```
1. Clique em "Configurações" no menu
2. Veja seções:

   ALTERAR SENHA:
   • Senha Atual: [__________]
   • Nova Senha: [__________]
   • Confirmar: [__________]
   • [Atualizar Senha]
   
   INFORMAÇÕES DA EMPRESA:
   • Nome: [Loja PDV]
   • CNPJ: [__________]
   • Telefone: [__________]
   • [Salvar Informações]
   
   PREFERÊNCIAS:
   ☑ Ativar Notificações
   ☑ Som nas Vendas
   ☑ Backup Automático
   
   GERENCIAMENTO DE DADOS:
   • [Exportar Dados] - Baixa JSON
   • [Limpar Dados] - ⚠️ Irreversível
```

### 8️⃣ LOGOUT - SAIR DO SISTEMA

```
1. Clique no botão [Sair] no menu esquerdo
2. Você será redirecionado para login
3. Pronto! Session encerrada
```

## 🎯 Fluxo Recomendado para Testar

```
1. Login (admin/1234)
   ↓
2. Ver Dashboard (estatísticas vazias)
   ↓
3. Ir em Produtos e ver os 8 produtos já carregados
   ↓
4. Ir em PDV e fazer sua primeira venda:
   • Busque "Coca"
   • Adicione 2 unidades
   • Busque "Pão"
   • Adicione 1 unidade
   • Finalize a venda
   ↓
5. Volte ao Dashboard
   • Veja as estatísticas atualizadas!
   ↓
6. Vá em Vendas
   • Veja seu histórico de compras
   ↓
7. Vá em Relatórios
   • Veja gráficos refletindo suas vendas
   ↓
8. Vá em Produtos
   • Note que o estoque diminuiu!
   ↓
9. Faça mais uma venda de teste
   ↓
10. Logout
```

## 📊 Dados Iniciais Carregados

### 8 Produtos
1. Coca-Cola 2L - R$ 9.00
2. Pão de Forma - R$ 7.50
3. Leite Integral - R$ 5.00
4. Arroz 5kg - R$ 22.90
5. Feijão 1kg - R$ 7.00
6. Suco Natural - R$ 8.50
7. Biscoito Integral - R$ 4.50
8. Iogurte Natural - R$ 6.00

## 🔑 Dicas Importantes

### ✅ O QUE FUNCIONA
```
✅ Login e logout
✅ Busca de produtos em tempo real
✅ Adicionar ao carrinho
✅ Calcular total automático
✅ Finalizar venda
✅ CRUD de produtos
✅ Ver histórico de vendas
✅ Gráficos em relatórios
✅ Alteração de senha
✅ Exportar dados
✅ Tudo é responsivo (mobile)
```

### ⚠️ O QUE SABER
```
⚠️ Dados são salvos em localStorage
   (quando fechar navegador, dados persistem)
   
⚠️ Está isolado no seu navegador
   (não sincroniza entre abas)
   
⚠️ Não há backend
   (é apenas frontend com localStorage)
   
⚠️ Admin e senha são fixos
   (admin / 1234)
```

## 🐛 Se Algo Não Funcionar

```
1. Pressione F12 (abrir DevTools)
2. Vá na aba "Console"
3. Procure por mensagens de erro vermelhas
4. Copie a mensagem
5. Ou recarregue a página (Ctrl+R ou Cmd+R)
6. Limpe o cache do navegador
```

## 💾 Exportar Dados

```
1. Vá em Configurações
2. Clique em "[Exportar Dados]"
3. Um arquivo JSON é baixado
4. Ele contém:
   • Todos os produtos
   • Todas as vendas
   • Data da exportação
5. Guarde para backup!
```

## 🎉 Próximos Passos

Após testar tudo, você pode:

```
✅ Usar como portfólio
✅ Mostrar para recrutadores
✅ Evoluir com backend
✅ Integrar com banco de dados
✅ Fazer app mobile
✅ Deploy para produção
```

## 📞 Suporte

Se tiver dúvidas sobre funcionalidades específicas:

```
1. Consulte o README.md
2. Veja ARQUITETURA.md para entender o design
3. Leia DESENVOLVIMENTO.md para coding
4. Confira MAPA_VISUAL.md para diagramas
```

## ✨ Enjoy Your System! 🚀

O sistema está 100% funcional e pronto para usar!

Divirta-se testando! 🎉
