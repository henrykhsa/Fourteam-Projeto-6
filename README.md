# Fourteam: Projeto 6
# Visão geral do projeto

Este guia abrange as Aulas 22 e 25 do projeto fullstack, onde desenvolveremos um Assistente 
de IA Web completo usando HTML, CSS e JavaScript puro (sem frameworks).

## Objetivos Gerais

- Criar uma aplicação web interativa do zero 
- Integrar com APIs externas (OpenAI/Gemini) 
- Implementar validação de formulários 
- Gerenciar estados de loading e erro 
- Usar APIs do navegador (localStorage, clipboard) 
- Criar interfaces responsivas e acessíveis 
- Aplicar boas práticas de UX/UI 

## Estrutura do Projeto 
````
assistente-ia/ 
├── index.html 
├── style.css 
└── script.js
````

### Conceito da Aplicação:

1. Usuário digita uma pergunta 
2. Clica em "Perguntar" 
3. App faz requisição para API da OpenAI 
4. Exibe a resposta da IA

# Funcionalidades do Projeto

### Requisitos Básicos 

Serão 04 requisitos básicos para esse projeto:

#### 01 - Estrutura HTML Básica 
- Cabeçalho com título da aplicação 
- Input para inserir a chave de API da OpenAI 
- Área principal com input para pergunta e botão de envio 
- Seção para exibir a resposta da IA 
#### 02 - Interface de Entrada 
- Input de texto para a pergunta do usuário 
- Botão "Perguntar" para enviar a pergunta 
- Input para API Key (tipo password) 
#### 03 - Exibição da Resposta 
- Área dedicada para mostrar a resposta da IA 
- Texto deve ser legível e bem formatado 
- Área deve ficar oculta até haver uma resposta 
#### 04 - Integração com API da IA 
- Fazer requisição POST para endpoint da OpenAI 
- Enviar pergunta e API Key corretamente 
- Processar resposta e exibir para o usuário 
- Usar fetch() e async/await 
### Requisitos Extras (Opcionais) 
### Estados e Validação 
- Estados de loading/carregamento enquanto aguarda resposta 
- Botão desabilitado durante carregamento 
- Validação de formulários (API Key e pergunta não vazias) 
- Tratamento e exibição de erros de conexão 
- Mensagens de erro amigáveis 
Funcionalidades de Interação 
- Botão para limpar resposta da tela 
- Copiar resposta da IA para área de transferência 
- Salvar API Key no localStorage 
- Atalhos de teclado (Ctrl+Enter para enviar) 
Melhorias na Interface 
- Mostrar a pergunta junto com a resposta 
- Ícones nos botões 
- Animações suaves e feedback visual 
- Contador de caracteres 
- Scroll automático para resposta 
- Dropdown para seleção de diferentes modelos de IA configurações Avançadas 
- Histórico de conversas anteriores 
- Temas (dark mode / light mode) 

# Configuração e Uso 
## Pré-requisitos 
- Navegador moderno (Chrome, Firefox, Safari, Edge) 
- Chave de API da OpenAI 
- Editor de código (VS Code recomendado) 
- Conhecimentos básicos em HTML, CSS e JavaScript 
## Fluxo da Aplicação 
1. Usuário obtém uma API Key da OpenAI 
2. Usuário abre a aplicação no navegador 
3. Usuário insere sua API Key no campo apropriado 
4. Usuário digita sua pergunta no textarea 
5. Usuário clica em "Perguntar" ou usa Ctrl+Enter 
6. Aplicação exibe a resposta da IA 
7. Usuário pode copiar a resposta ou limpar para nova pergunta 

# Como Obter uma API Key
## OpenAI API Key (Modelos Pago) 
Para usar a API da OpenAI, você precisará criar uma conta e obter uma chave de API: 
1. Acesse: https://platform.openai.com/ 
2. Crie uma conta ou faça login 
3. Vá para API Keys: No painel, procure por "API Keys" no menu 
4. Gere nova chave: Clique em "Create new secret key" 
5. Copie e guarde a chave em local seguro (não será mostrada novamente) 

___Importante: A OpenAI oferece créditos gratuitos limitados para novos usuários. Consulte os preços e limites no site oficial.___

## Google Gemini API Key (Alternativa Gratuita) 

Uma excelente alternativa gratuita é usar o Google Gemini: 
### Passo a Passo para Gemini 
1. Acesse o Google AI Studio 
- Vá para: https://aistudio.google.com/ 
- Faça login com sua conta Google 
2. Gere sua API Key 
- Clique em "Get API Key" ou "Obter chave da API" 
- Selecione "Create API Key" 
- Copie e guarde sua chave em local seguro 
3. Limites do Plano Gratuito 
- O Gemini oferece uso gratuito generoso para desenvolvimento 
- Consulte os limites atuais na documentação oficial 
- Ideal para aprender e testar aplicações 
- NÃO ADICIONE DADOS DE PAGAMENTO para conseguir obter os limites 
gratuitos. 
### Modificando o Código para Gemini 
O Google Gemini oferece uma API compatível com a OpenAI, permitindo usar praticamente o 
mesmo código JavaScript. Você só precisa trocar algumas configurações: 
Para usar Gemini (compatível com OpenAI): 
- Use a url: https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
- Obtenha API Key do Google AI Studio (como mostrado acima).