# Radar Cívico • Sistema de Consulta de Deputados

**Disciplina:** Desenvolvimento de Interfaces  
**Aluna:** Julia Paiva  
**Tecnologias:** Vue 3, JavaScript, Vue CLI 5, HTML e CSS.

Aplicação acadêmica para consultar deputados federais por nome e visualizar dados pessoais e canais de contato do gabinete, consumindo a API pública oficial da Câmara dos Deputados.

## Executar no Windows

Instale Node.js LTS e abra o Prompt de Comando nesta pasta:

```bat
npm install
npm run serve
```

Abra o endereço Local informado no terminal. Para encerrar, use Ctrl+C. Alternativamente, execute `instalar.cmd` e depois `iniciar.cmd`.

**Não abra public/index.html diretamente.** Os componentes Vue precisam ser processados pelo Vue CLI.

## Criação pela CLI: requisito da atividade

A base foi preparada com a estrutura do Vue CLI 5 e as dependências do projeto da aula fornecido pela aluna. A execução de `vue create` não foi concluída neste ambiente. Para cumprir e comprovar esse requisito, execute **CRIAR_PELA_CLI.cmd**, na raiz do pacote extraído. Ele cria uma base real pela CLI em uma pasta nova, aplica o código entregue e reinstala as dependências. Não sobrescreve sua pasta de atividades existente.

Depois use a pasta `Criado_pela_CLI/sistema_deputados` como projeto final, copiando-a para `Julia Paiva/Atividades/sistema_deputados` no repositório. Consulte o manual antes de executar. Não declare a etapa concluída antes de rodar o atalho e conferir o resultado.

O Vue CLI está em modo de manutenção, mas foi mantido aqui para acompanhar a tecnologia usada em sala, conforme o package.json enviado. Não foi substituído por Vite.

## Funcionalidades obrigatórias implementadas

- Busca por nome enviada à API oficial.
- Cards com foto, nome, partido e UF.
- Página de detalhes acessível por URL com hash.
- Nome civil, nascimento, naturalidade e escolaridade, quando fornecidos.
- E-mail e telefone do gabinete, localização do gabinete e redes sociais.
- Tratamento explícito de campos ausentes: não inventa contatos ou informações.
- Código separado em componentes, página, serviço de API e funções utilitárias.

## Diferenciais

- Filtros combinados por UF e partido.
- Ordenação A–Z e Z–A.
- Favoritos persistidos em localStorage, sem cadastro.
- Modo claro/escuro persistido no navegador.
- Paginação visual e contagem de resultados.
- Exportação CSV de todos os resultados filtrados, não apenas da página atual.
- Cópia do e-mail, links de contato e impressão do perfil.
- Layout responsivo, foco visível, rótulos e link de salto para o conteúdo.
- Estados de carregamento, erro, nenhum resultado, imagem indisponível e rota inexistente.
- Cancelamento de consultas antigas, timeout e cache em memória por cinco minutos.
- Percorre a paginação da API antes de aplicar os filtros locais.

## API utilizada

- Base: [Dados Abertos da Câmara](https://dadosabertos.camara.leg.br/api/v2).
- Listagem: `GET /deputados`, com `nome`, `itens`, `pagina`, `ordem` e `ordenarPor`.
- Detalhes: `GET /deputados/{id}`.
- [Documentação oficial](https://dadosabertos.camara.leg.br/swagger/api.html).

A consulta não fixa uma legislatura. O resultado é o conjunto retornado pela API para os parâmetros utilizados, não uma contagem fixa declarada pelo aplicativo. Os filtros de UF e partido atuam sobre a consulta completa carregada. Não há dados de deputados pré-cadastrados ou fallback fictício.

## Navegação

- `#/`: listagem.
- `#/deputado/ID`: página de detalhes.
- Outras rotas: página não encontrada.

A navegação por hash foi implementada sem Vue Router para reduzir dependências e facilitar hospedagem estática. Voltar/avançar do navegador funciona. A página de detalhes pode ser aberta diretamente.

## Comandos

```bat
npm run serve
npm run test
npm run lint
npm run build
```

- `serve`: servidor de desenvolvimento.
- `test`: testes de lógica e serviço HTTP com respostas controladas.
- `lint`: verificação de código do Vue CLI.
- `build`: versão de produção em `dist`.

Node 22 LTS é a referência recomendada para a instalação local deste pacote; a compilação completa nessa versão ainda precisa ser confirmada. Não há package-lock validado incluído: a primeira instalação o gera. Inclua esse arquivo no GitHub após instalar e validar.

## Estrutura

```text
sistema_deputados/
  public/index.html
  src/
    assets/styles.css
    components/DeputyCard.vue
    components/DeputyPhoto.vue
    components/StatusPanel.vue
    pages/DeputyDetails.vue
    services/api.mjs
    utils.mjs
    App.vue
    main.js
  tests/
  docs/
  prints/
  package.json
  babel.config.js
  vue.config.js
  jsconfig.json
  netlify.toml
```

## Prints obrigatórios: ainda precisam ser capturados

A pasta `prints` contém as instruções, não imagens simuladas. Após executar com dados reais, salve:

1. `prints/listagem.png`: cards com deputados carregados.
2. `prints/detalhes.png`: perfil com dados pessoais e contato do gabinete.

Opcionalmente, inclua prints mobile, favoritos e modo escuro. Não entregue imagens do estado de erro como substitutas dos dois prints obrigatórios.

## Publicação

O projeto ainda não está publicado e não tem URL pública confirmada. O manual explica como gerar `dist` e publicar no Netlify. Depois de publicar, acrescente aqui a URL real e teste em janela anônima. Não apresente o link do repositório como se fosse o link do sistema em execução.

## Validação e limitações

Consulte `docs/VALIDACAO.md`. Foram aprovados 13 testes de lógica e validados os cinco templates Vue. Testes limitados de navegador foram realizados com falha HTTP controlada, sem dados fictícios de parlamentares. Não foi concluído o build completo pelo Vue CLI neste ambiente, nem validada a consulta ao vivo à API, cujo acesso direto foi bloqueado. Isso não equivale a uma homologação integral.

## Entrega no repositório

Destino: `Julia Paiva/Atividades/sistema_deputados` no repositório DW2026 informado pela aluna. Não enviar node_modules, ZIP ou apenas dist como substitutos do código-fonte. Não alterar trabalhos de outras pessoas.

## Uso acadêmico responsável

O projeto foi preparado com auxílio de IA. Revise, teste, personalize e compreenda o código antes de apresentar. Os extras não garantem nota nem dispensam a política da disciplina. Não declare autoria sem assistência se isso não refletir o processo real.

## Referências

- [Guia de criação Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html)
- [Guia de publicação Vue CLI](https://cli.vuejs.org/guide/deployment.html)
- [Guia GitHub do professor](https://fernandodx.github.io/help-github/guia_github.html)
- [Netlify: publicação](https://docs.netlify.com/site-deploys/create-deploys/)
