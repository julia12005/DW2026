# Radar Cívico — Sistema de Consulta de Deputados

Aplicação web desenvolvida para consultar deputados federais brasileiros e visualizar informações públicas disponibilizadas pela Câmara dos Deputados.

**Acesse a aplicação:** https://super-tarsier-a1c51f.netlify.app

## Sobre o projeto

O Radar Cívico reúne informações públicas de deputados federais em uma interface de pesquisa. A aplicação consome a API de Dados Abertos da Câmara dos Deputados e permite consultar a listagem de parlamentares, aplicar filtros e acessar páginas com informações individuais.

## Funcionalidades

- Pesquisa de deputados pelo nome.
- Exibição de fotografia, nome, partido e unidade federativa.
- Filtros por estado (UF) e partido.
- Ordenação alfabética crescente e decrescente.
- Paginação dos resultados.
- Página de detalhes do deputado, com informações disponíveis na API.
- Acesso a e-mail, telefone, localização do gabinete e canais oficiais, quando disponíveis.
- Adição e remoção de deputados favoritos, com armazenamento no navegador.
- Alternância entre tema claro e escuro.
- Exportação dos resultados filtrados para CSV.
- Cópia do e-mail do gabinete, impressão do perfil e acesso a links de contato.
- Interface responsiva e tratamento de carregamento, erros e resultados vazios.

Os favoritos e as preferências de tema são armazenados no navegador por meio de `localStorage`; não há sincronização entre dispositivos.

## Tecnologias utilizadas

- **Vue.js 3** — construção da interface e dos componentes.
- **JavaScript** — lógica da aplicação e integração com a API.
- **HTML e CSS** — estrutura, estilos e responsividade.
- **Vue CLI 5** — ambiente de desenvolvimento e compilação.
- **API REST da Câmara dos Deputados** — consulta aos dados públicos.

### API

A aplicação utiliza a API de Dados Abertos da Câmara dos Deputados:

- API: https://dadosabertos.camara.leg.br/api/v2
- Documentação: https://dadosabertos.camara.leg.br/swagger/api.html

Entre os recursos utilizados estão a listagem de deputados (`GET /deputados`) e a consulta de um deputado específico (`GET /deputados/{id}`).

## Como executar localmente

### Requisitos

- Node.js e npm.
- Editor de código de sua preferência.

### Instalação e execução

Na pasta raiz do projeto, execute:

```bash
npm install
npm run serve
```

Abra no navegador o endereço local informado pelo terminal (normalmente `http://localhost:8080/`).

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

O projeto também inclui os arquivos `instalar.cmd`, `iniciar.cmd` e `gerar-producao.cmd`, que auxiliam, respectivamente, na instalação das dependências, na inicialização da aplicação e na geração da versão de produção no Windows.

## Testes e comandos

Os comandos disponíveis no `package.json` são:

```bash
npm run test
npm run lint
npm run build
```

- `npm run test`: executa os testes automatizados localizados em `tests/`.
- `npm run lint`: verifica o código da pasta `src/` com ESLint.
- `npm run build`: gera a versão de produção na pasta `dist/`.

O projeto inclui testes para funções utilitárias e para o serviço HTTP, além de documentação dos procedimentos e resultados de validação em `docs/`.

## Estrutura do projeto

```text
sistema_deputados/
├── prints/
│   ├── Captura de Tela (92).png
│   └── Captura de Tela (93).png
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── logo.png
│   │   └── styles.css
│   ├── components/
│   │   ├── DeputyCard.vue
│   │   ├── DeputyPhoto.vue
│   │   ├── HelloWorld.vue
│   │   └── StatusPanel.vue
│   ├── pages/
│   │   └── DeputyDetails.vue
│   ├── services/
│   │   └── api.mjs
│   ├── App.vue
│   ├── main.js
│   └── utils.mjs
├── tests/
│   ├── api.test.mjs
│   └── utils.test.mjs
├── .gitignore
├── babel.config.js
├── gerar-producao.cmd
├── iniciar.cmd
├── instalar.cmd
├── jsconfig.json
├── netlify.toml
├── package.json
├── package-lock.json
├── README.md
└── vue.config.js
```

### Principais arquivos

| Arquivo | Responsabilidade |
|---|---|
| `src/App.vue` | Interface principal, pesquisa, filtros, favoritos e navegação. |
| `src/components/DeputyCard.vue` | Exibição resumida de cada deputado. |
| `src/components/DeputyPhoto.vue` | Exibição da fotografia do deputado. |
| `src/components/StatusPanel.vue` | Estados de carregamento, erro e ausência de resultados. |
| `src/pages/DeputyDetails.vue` | Página com informações detalhadas do deputado. |
| `src/services/api.mjs` | Requisições e tratamento das respostas da API. |
| `src/utils.mjs` | Funções auxiliares utilizadas pela aplicação. |
| `src/assets/styles.css` | Estilos, temas e responsividade. |
| `tests/` | Testes automatizados. |
| `docs/` | Critérios, orientações e registros de validação. |

## Publicação

A versão publicada está disponível no Netlify:

**https://super-tarsier-a1c51f.netlify.app**

Para gerar uma versão de produção localmente, execute:

```bash
npm run build
```

Os arquivos gerados ficarão na pasta `dist/`.

## Referências

- Dados Abertos da Câmara dos Deputados: https://dadosabertos.camara.leg.br/swagger/api.html
- Vue.js: https://vuejs.org/
- Vue CLI: https://cli.vuejs.org/
- Netlify: https://www.netlify.com/
