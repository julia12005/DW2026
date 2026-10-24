# Relatório de validação

## Aprovado neste ambiente

- 13 testes de lógica/serviço HTTP executados com Node. Respostas controladas foram usadas exclusivamente nos testes, sem alimentar a aplicação.
- Análise sintática dos scripts e compilação dos templates dos cinco componentes com @vue/compiler-sfc 3.5.22.
- Formatação de código com Prettier.
- Testes limitados no Chromium: tratamento de HTTP 503 na listagem, modo escuro, persistência do tema, ausência de transbordamento horizontal a 390 px no estado de erro, rota de detalhes com erro, rota inexistente e ausência de exceções JavaScript nesses cenários.

Os testes de navegador usaram o runtime Vue 3.5.22 e uma transformação temporária dos componentes para validação. Isso NÃO é o build de produção do Vue CLI. A transformação e o runtime de teste não são usados pelo código entregue. Nenhum parlamentar fictício foi exibido como dado real.

## Não concluído / pendente

- Criação pela CLI: a tentativa de instalar/executar @vue/cli 5.0.8 não concluiu neste ambiente. O atalho CRIAR_PELA_CLI.cmd executa essa etapa na máquina da aluna.
- Instalação integral das dependências Vue CLI, lint e build de produção: não concluídos neste ambiente. Não há dist validado nem package-lock validado incluídos.
- Consulta ao vivo à API: acesso direto bloqueado pela política de rede deste ambiente. Não há confirmação ponta a ponta dos campos reais.
- Listagem e detalhes com dados reais, favoritos sobre cards reais e exportação de uma consulta real: precisam de teste local.
- Atalhos no Windows: escritos para Windows, não executados aqui.
- Prints obrigatórios: precisam ser capturados com a aplicação real.
- Deploy público e envio ao GitHub: não realizados. Não existe URL pública confirmada.

## Conclusão

Código implementado e parcialmente validado. Não é honesto classificar a entrega como 100% homologada antes de concluir os itens acima. O checklist do guia orienta essa conferência.
