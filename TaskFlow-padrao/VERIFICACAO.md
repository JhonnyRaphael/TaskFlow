# Verificação da entrega

Verificações realizadas em 28/10/2026, com Node.js 24.22.1 e npm 11.9.0.

## Compilação e análise

| Projeto | Comando | Resultado |
| --- | --- | --- |
| Frontend | `npm ci --no-audit --no-fund` | Dependências instaladas com o lock do professor |
| Frontend | `npm run build` | TypeScript e compilação Vite concluídos |
| Frontend | `npm run lint` | Sem erros |
| Backend | `npm ci --no-audit --no-fund` | Dependências instaladas com o lock do professor |
| Backend | `npm run typecheck` | Sem erros |
| Backend | `npm run build` | Compilação concluída |
| Backend | `npm test` | 8 arquivos e 89 testes aprovados |

O script typecheck foi acrescentado ao frontend como atalho para a mesma verificação TypeScript utilizada pelo build. As dependências e os locks não foram atualizados.

## Integração no navegador

A versão integrada foi executada em Chromium com o frontend Vite e o backend Express reais. Os cadastros normais utilizaram o repository JSON do professor, com um arquivo de teste separado do pacote entregue.

- As quatro rotas carregaram os registros da API e apresentaram os filtros correspondentes.
- A navegação pelo React Router preservou o documento HTML.
- A busca encontrou título/descrição e exibiu o estado vazio quando não havia resultado.
- Um título composto somente por espaços foi recusado sem criar registro.
- O POST enviou somente os cinco campos do DTO, recebeu um UUID e persistiu o registro no JSON.
- Uma tarefa sem prazo enviou `dueDate: null`.
- A atualização da página manteve os registros.
- O PUT alterou título, prazo e prioridade, preservando o status `in_progress`.
- O PATCH/toggle concluiu e reabriu registros, atualizando as listas filtradas.
- O DELETE removeu o registro da interface e da API; a consulta posterior respondeu 404.
- Após reiniciar o backend, o mesmo arquivo JSON manteve as tarefas.
- Não ocorreram erros JavaScript não tratados no navegador.

## Falhas verificadas

Respostas 503 foram simuladas somente nos testes de falha, por interceptação no navegador. Os fluxos normais acima utilizaram o backend real.

| Falha | Comportamento conferido |
| --- | --- |
| GET | Mensagem compreensível e recuperação por Tentar novamente |
| POST | Formulário permaneceu preenchido; a nova tentativa criou apenas um registro |
| PUT | Campos editados permaneceram no formulário; o backend manteve os dados anteriores |
| DELETE | O registro permaneceu na lista até uma exclusão bem-sucedida |

## Layout

Foi conferida a ausência de rolagem horizontal nas larguras 320, 390, 600, 768, 960, 1024 e 1440 pixels. No mobile, foram verificadas a abertura do menu, a navegação e a ação Nova tarefa.

Também foram inspecionadas capturas da lista no desktop, do formulário e da navegação mobile. O estilo-base permanece o do professor, com as adições identificadas em COMPARACAO.md.

## Integridade das referências

Os 42 arquivos do frontend e os 44 arquivos do backend consultados no GitHub foram conferidos pelos hashes de blobs informados na árvore de cada commit.

- O ZIP de referência do frontend preserva os 41 arquivos restantes após omitir somente o `.env` publicado.
- O ZIP de referência do backend preserva todos os 44 arquivos.
- A pasta principal do backend mantém o conteúdo original desses 44 arquivos.
- As alterações do frontend estão relacionadas em COMPARACAO.md e no patch de integração.

O pacote não contém node_modules, dist, cobertura nem os dados utilizados nos testes. A API da entrega inicia vazia e cria `data/tasks.json` quando uma tarefa é cadastrada.

## Preparação para um repositório único

Foram acrescentados `.gitignore`, README.md e GITHUB.md na pasta principal, mantendo intacto o código das duas aplicações.

Uma cópia temporária do projeto foi inicializada no Git para conferir o primeiro git add. Os dois arquivos package-lock.json, o `.env.example`, os arquivos-fonte e os 44 arquivos originais do backend foram incluídos. Dependências, compilação, cobertura, dados de execução, `.env`, variantes locais e a pasta de referência ficaram fora da seleção.

Nenhum repositório remoto foi criado nem recebeu arquivos nesta preparação.
