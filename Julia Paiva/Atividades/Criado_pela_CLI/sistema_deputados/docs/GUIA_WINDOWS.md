# Guia completo para Windows • Sistema de Consulta de Deputados

Este guia se refere exclusivamente à atividade de Desenvolvimento de Interfaces. O projeto usa Vue 3, JavaScript e Vue CLI 5, conforme o projeto da aula que você enviou.

## 1. O que instalar

### Node.js com npm

Baixe pelo [site oficial do Node.js](https://nodejs.org/pt-br/download). Recomendo a linha **22 LTS** para esta base legada de Vue CLI; selecione o instalador Windows compatível com a arquitetura do seu computador. Se o site destacar outra linha LTS, a página de versões anteriores permite localizar a linha 22. Essa recomendação não significa que a compilação completa foi homologada neste ambiente.

Mantenha npm e a opção de adicionar ao PATH. Não precisa instalar Chocolatey apenas para esta atividade. Feche e reabra o terminal após instalar.

### Editor

Instale o [Visual Studio Code](https://code.visualstudio.com/download). A extensão **Vue - Official** é opcional para auxiliar na edição. O sistema não depende de uma extensão para funcionar.

### Git

Para enviar pelo fluxo do professor, instale [Git para Windows](https://git-scm.com/downloads/win). Não precisa instalar GitHub Desktop se preferir usar os comandos deste guia.

### Não é necessário

Python, XAMPP, MySQL, servidor próprio, conta na API da Câmara ou chave de API não fazem parte da configuração deste projeto. A aplicação faz consultas GET públicas e guarda somente tema/favoritos no navegador.

## 2. Baixar e extrair

1. Baixe o ZIP da entrega.
2. Clique com o botão direito e escolha **Extrair tudo**.
3. Extraia para uma pasta simples, por exemplo dentro de Documentos.
4. Não execute os atalhos de dentro do ZIP.
5. Na raiz extraída haverá este manual, `CRIAR_PELA_CLI.cmd` e a pasta `Julia Paiva`.
6. O código entregue está em `Julia Paiva/Atividades/sistema_deputados`.

## 3. Conferir a instalação

Abra o **Prompt de Comando**, não é necessário executar como administrador. Digite uma linha por vez:

```bat
node -v
npm -v
git --version
```

Os três comandos devem mostrar versões. Se um comando não for reconhecido, confira a instalação e reabra o terminal. Não altere a política de segurança do PowerShell para resolver isso; o Prompt de Comando evita o bloqueio de npm.ps1.

## 4. Cumprir a criação pela CLI

**Esta etapa é importante porque está no enunciado.** O pacote contém o código preparado para Vue CLI, mas a criação automática pela CLI não foi concluída no ambiente de geração.

1. Na raiz do ZIP extraído, dê dois cliques em **CRIAR_PELA_CLI.cmd**.
2. O atalho usa `npx` para executar Vue CLI 5.0.8 e criar uma pasta nova em `Criado_pela_CLI/sistema_deputados`.
3. O preset padrão do Vue CLI 5 é utilizado. Confira no resultado que a dependência Vue é da versão 3; o package.json final entregue mantém Vue 3.
4. Depois de a CLI terminar sem erro, o atalho aplica os arquivos do sistema de deputados e executa npm install novamente.
5. Se qualquer etapa falhar, o atalho para. Não considere a criação concluída.
6. Guarde um print do terminal mostrando a criação concluída, como evidência adicional.
7. Use a pasta `Criado_pela_CLI/sistema_deputados` como sua versão de trabalho final.
8. Não execute o atalho repetidamente para tentar sobrescrever uma pasta: ele bloqueia se a pasta de saída já existir. Renomeie a pasta anterior apenas depois de conferir o que contém.

### Alternativa manual

Em uma pasta vazia de sua escolha, execute:

```bat
npx --yes --package @vue/cli@5.0.8 vue create sistema_deputados --default --no-git --packageManager npm
```

Depois de concluir, copie os arquivos do projeto entregue para a pasta criada, substituindo os arquivos correspondentes. Não copie node_modules de outra instalação. Dentro da pasta final, execute `npm install` novamente. Isso preserva o uso real da CLI e aplica o código da atividade.

**Não use `npm create vue@latest` para esta etapa:** esse comando não é o Vue CLI 5 utilizado na aula.

## 5. Abrir o projeto

1. Abra o VS Code.
2. Vá em **Arquivo > Abrir Pasta**.
3. Escolha a pasta final `sistema_deputados`.
4. Confira se `package.json`, `src`, `public` e `vue.config.js` aparecem na raiz aberta.
5. Vá em **Terminal > Novo Terminal**.
6. Se o terminal for PowerShell e houver bloqueio do npm, selecione **Command Prompt/Prompt de Comando** no menu do terminal.

## 6. Instalar e executar

Dentro da pasta que contém package.json:

```bat
npm install
```

Se terminar sem erro:

```bat
npm run serve
```

O terminal mostrará um endereço **Local**. Abra exatamente esse endereço no navegador. Normalmente a porta inicial é 8080, mas o terminal pode escolher outra se ela estiver ocupada.

Não feche o terminal enquanto estiver usando o sistema. Para encerrar, pressione **Ctrl+C** e confirme se solicitado.

### Atalhos incluídos

- `instalar.cmd`: executa npm install.
- `iniciar.cmd`: executa npm run serve.
- `gerar-producao.cmd`: executa npm run build.

Não há executável .exe nem necessidade de instalar um servidor separado. O código-fonte precisa das dependências instaladas pelo npm.

## 7. Como utilizar o sistema

### Listagem

1. Abra o sistema com conexão à internet.
2. Aguarde o carregamento da consulta completa.
3. Confira os cards com foto, nome, partido e UF.
4. Use Próxima e Anterior para navegar pelas páginas visuais.

A API também tem paginação. O serviço percorre as páginas oficiais antes de mostrar o conjunto completo, por isso a primeira carga pode depender de várias requisições.

### Busca por nome

1. Digite o nome ou parte do nome no campo de busca.
2. Clique em **Buscar deputados** ou pressione Enter.
3. O nome é enviado à API oficial; não é apenas um filtro sobre a primeira página.
4. Para voltar ao conjunto inicial, clique em **Limpar filtros**.

### Filtros e ordenação

- Selecione UF e partido para combinar filtros.
- Use Nome A–Z ou Z–A.
- O contador informa o total após os filtros.
- Os filtros atuam sobre o conjunto completo da consulta atual, não sobre a página visual.

### Favoritos

1. Clique na estrela de um card.
2. Clique em **Favoritos** no cabeçalho.
3. Clique novamente na estrela para remover.
4. Favoritos ficam no mesmo navegador e dispositivo; não há sincronização por conta.
5. Limpar os dados do navegador pode remover os favoritos.

### Detalhes

1. Clique em **Conhecer deputado**.
2. Confira nome civil, nascimento, naturalidade e escolaridade.
3. Confira e-mail, telefone e localização do gabinete.
4. Use os links de redes sociais e site quando existirem.
5. Use **Copiar e-mail** ou **Imprimir perfil**, se desejar.
6. Use **Voltar à consulta** para retornar.

Quando a API não fornecer uma informação, o sistema mostra ausência de informação. Não substitui contatos por valores inventados.

### Outros extras

- Botão de lua/sol: alterna o tema e salva a preferência.
- **Exportar CSV**: exporta todos os resultados filtrados, não apenas os 12 cards visíveis.
- A impressão usa o diálogo do navegador. Se desejar PDF, selecione essa opção no próprio diálogo; não há biblioteca de geração PDF no projeto.

## 8. Testar antes de entregar

No terminal, execute uma linha por vez:

```bat
npm run test
npm run lint
npm run build
```

- Testes: regras de filtro, favoritos, datas, URLs, CSV e serviço HTTP.
- Lint: verifica problemas de código; pode aplicar correções conforme o serviço do Vue CLI.
- Build: precisa concluir e gerar dist para publicar.

**Não considere o projeto pronto para entrega se build ou lint falharem.** Guarde a mensagem completa para identificar a causa. Os testes unitários aprovados não substituem a execução real com a API.

### Conferência manual

- Busca por um nome que existe.
- Busca sem resultado.
- Combinação de UF e partido.
- Favoritar e recarregar a página.
- Abrir detalhes e conferir os contatos com a fonte.
- Abrir o link de detalhes diretamente.
- Usar Voltar/Avançar do navegador.
- Alternar o tema e recarregar.
- Conferir em tela pequena.
- Testar indisponibilidade de rede sem interpretar erro como ausência de deputados.

## 9. Capturar os prints obrigatórios

1. Execute o sistema com dados reais carregados.
2. Na listagem, deixe visíveis vários cards com foto, nome, partido e UF.
3. Capture a tela usando a ferramenta de captura do Windows.
4. Salve como `prints/listagem.png`.
5. Abra um deputado com informações do gabinete disponíveis.
6. Capture os detalhes. Se necessário, reduza um pouco o zoom ou faça uma segunda captura para mostrar os contatos.
7. Salve como `prints/detalhes.png`.
8. Prints extras podem mostrar favoritos, modo escuro e versão mobile.
9. Depois de salvar, acrescente ao README os links Markdown para essas imagens.

**O pacote não contém prints de deputados inventados.** Os dois prints obrigatórios continuam pendentes até essa captura com a aplicação real.

## 10. Publicar para obter o bônus

### Opção recomendada: Netlify com a pasta compilada

1. Primeiro execute `npm run build` e confira se terminou sem erro.
2. A pasta `dist` será criada.
3. Acesse [Netlify Drop](https://app.netlify.com/drop) e use sua própria conta para gerenciar o projeto.
4. Envie **a pasta dist**, não a pasta src e não apenas o ZIP do código-fonte.
5. Copie a URL que o serviço efetivamente gerar.
6. Confira se o projeto está público. Teste em janela anônima, sem estar logada.
7. Teste a listagem, a busca e um link de detalhes nessa URL.
8. Coloque a URL real no README e no envio da atividade.
9. Para atualizar, gere dist novamente e publique a versão atualizada.

A documentação do Netlify descreve o envio da pasta de saída compilada. Publicar no Netlify não substitui a entrega do código no GitHub da turma.

### Alternativa: conectar o repositório

Se optar por conectar o GitHub ao Netlify, selecione o repositório DW2026 e configure:

- Base directory: `Julia Paiva/Atividades/sistema_deputados`.
- Build command: `npm run build`.
- Publish directory: `dist`, relativa à base.
- Node: linha 22 como referência deste guia.

Os nomes dos campos podem variar na interface. Confirme no log que a pasta correta foi usada. O netlify.toml está dentro do projeto e ajuda quando essa pasta é a base. Não configure a raiz inteira da turma como se fosse um único aplicativo.

### Por que não há URL pronta no pacote?

Não houve publicação autenticada na sua conta. Uma URL só pode ser declarada após o serviço publicar e o acesso público ser verificado. Nenhum endereço fictício foi inserido.

## 11. Colocar no GitHub da turma

O destino exigido é:

```text
DW2026/
  Julia Paiva/
    Atividades/
      sistema_deputados/
```

### Se ainda não clonou o repositório

No Git Bash, em uma pasta de trabalho:

```sh
git clone https://github.com/julia12005/DW2026.git
cd DW2026
git pull origin main
```

Se já tem uma cópia local, não clone outra sem necessidade. Abra a cópia existente e confira se não há alterações locais antes de atualizar.

### Copiar e enviar

1. Copie a pasta final sistema_deputados para `Julia Paiva/Atividades` dentro do repositório clonado.
2. Não substitua a pasta Julia Paiva inteira: preserve as outras atividades.
3. Não envie node_modules ou apenas dist. O .gitignore exclui essas pastas.
4. Depois de instalar, mantenha o package-lock.json gerado e validado no projeto final.
5. Na raiz DW2026, execute:

```sh
git status
git add "Julia Paiva/Atividades/sistema_deputados"
git diff --cached --stat
git commit -m "Adiciona sistema de consulta de deputados em Vue 3"
git push origin main
```

Revise a lista antes de confirmar: somente os arquivos da atividade devem entrar nesse commit. Se Git pedir identificação, configure seu nome e e-mail reais na sua máquina. Não use credenciais inventadas nem compartilhe tokens.

### Pull request

Se DW2026 for seu fork do repositório da turma, siga o guia do professor: abra seu fork, use Contribute/Open pull request, confira a base e a branch de origem, revise os arquivos e crie o PR. O endereço do repositório original não foi confirmado neste pacote; não escolha um destino por suposição.

## 12. O que entender para apresentar

- `App.vue`: estado da busca, filtros, favoritos, tema e navegação por hash.
- `DeputyCard.vue`: recebe dados por props e emite evento de favorito.
- `DeputyPhoto.vue`: mostra foto ou iniciais se a imagem falhar.
- `StatusPanel.vue`: estados de carregamento, erro e vazio.
- `DeputyDetails.vue`: busca o deputado por ID e mostra os campos retornados.
- `api.mjs`: fetch, parâmetros, paginação, cache, timeout e cancelamento.
- `utils.mjs`: funções puras de filtro, datas, CSV e armazenamento.
- `styles.css`: responsividade, cores, foco, temas e impressão.

Conceitos Vue presentes: componentes, props, emits, v-model, v-if, v-for, computed, watch e ciclo de vida. O projeto usa Options API para manter a estrutura didática. A extensão .mjs identifica módulos JavaScript, não TypeScript.

## 13. Problemas comuns

### npm não é reconhecido

Reabra o terminal depois de instalar Node. Confira PATH e instalação.

### npm.ps1 bloqueado

Use o Prompt de Comando no VS Code ou execute os atalhos .cmd. Não é necessário desabilitar a política de segurança do computador.

### package.json não encontrado

O terminal está na pasta errada. Abra a pasta que contém package.json.

### vue-cli-service não encontrado

Execute npm install na pasta do projeto. Se falhar, resolva o erro de instalação antes de iniciar.

### Avisos de pacotes deprecated

Vue CLI está em manutenção e usa dependências antigas. Avisos não são, por si só, confirmação de falha ou de segurança. Não execute npm audit fix --force indiscriminadamente: pode alterar a base e quebrar o projeto. Confira o resultado final e os riscos antes de publicar.

### Porta ocupada

Use o endereço que o terminal informar; ele pode selecionar outra porta.

### API indisponível

Confira a conexão e a documentação oficial. Clique em Tentar novamente. Não substitua a API por dados fictícios para fingir funcionamento.

### Foto, telefone ou rede social ausente

O dado pode não existir na resposta da API. O sistema mostra a ausência; isso não deve ser confundido com um campo esquecido no código.

### Tela em branco depois da publicação

Confirme que enviou dist depois de um build bem-sucedido. Não publique public/index.html isoladamente. Confira o console e os arquivos carregados.

## 14. Checklist final

- [ ] Criação real pela CLI executada e conferida.
- [ ] npm install concluído e package-lock.json incluído.
- [ ] npm run serve funciona no Windows.
- [ ] API real retorna listagem e detalhes.
- [ ] Busca, filtros e favoritos testados.
- [ ] Dados do gabinete e redes sociais conferidos.
- [ ] npm run test aprovado.
- [ ] npm run lint aprovado.
- [ ] npm run build aprovado.
- [ ] Prints reais salvos em prints.
- [ ] README atualizado com os prints e a URL pública real.
- [ ] URL pública acessível em janela anônima.
- [ ] Código enviado na pasta correta.
- [ ] Pull request feito se exigido pela turma.
- [ ] Código compreendido e uso de IA tratado conforme a regra da disciplina.

Não há garantia de nota máxima. O objetivo é cobrir os critérios com implementação, testes e evidências reais, sem afirmar que etapas pendentes já foram concluídas.
