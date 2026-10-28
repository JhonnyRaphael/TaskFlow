# Comparação com o ZIP anterior e com o professor

## Diferença principal

O ZIP anterior já utilizava React e TypeScript. Ele havia avançado além da etapa publicada pelo professor: adicionava um hook compartilhado, regras em utils, diversos modais, indicadores, projetos locais e modo de demonstração com localStorage.

No repositório do professor, a aplicação é mais simples: o Layout organiza a interface; Tasks mantém os estados, carrega a API e coordena as ações; TaskForm coleta dados; TaskList organiza a coleção; TaskCard comunica ações; tarefaService concentra o HTTP.

| Aspecto | ZIP anterior | Referência adotada |
| --- | --- | --- |
| Estado das tarefas | Layout e useTarefas | Tasks, com useState/useEffect |
| Pastas adicionais | hooks, utils e vários componentes auxiliares | Pastas e seis componentes do frontend do professor |
| Formulário | Modais reutilizáveis | TaskForm exibido diretamente na página |
| Persistência | Demonstração local ou CrudCrud | Backend original com repository JSON |
| Acesso HTTP | Serviço com seleção de modo | Axios em tarefaService |
| Identificação | `_id` do CrudCrud ou identificador local | UUID do backend, convertido para `_id` na interface |
| Projeto | Nomes e cores locais | Não oferecido na versão integrada, pois não existe no DTO da API |
| Status | concluida booleano | pending, in_progress e done, conforme o backend |

## Por que os dois repositórios precisam de integração

O frontend original foi escrito para o CrudCrud. O backend próprio foi publicado com outro contrato. Os endpoints e os dados não são intercambiáveis apenas alterando a URL.

| Conceito | Frontend/CrudCrud original | Backend próprio |
| --- | --- | --- |
| Recurso | `/tarefas` | `/api/tasks` |
| Identificador | `_id` | `id`, UUID |
| Título | `titulo` | `title` |
| Descrição | `descricao` | `description` |
| Prazo | `data`, string | `dueDate`, string ou null |
| Prioridade | `prioridade` | `priority` |
| Conclusão | `concluida`, booleano | `status`, três valores |
| Projeto | `projeto` | Ausente |

Na versão integrada, `tarefaService.ts` contém o tipo da resposta da API e duas funções de conversão. Os componentes continuam utilizando os nomes em português da aula para título, descrição, prazo, prioridade e identificador. A situação usa os três estados do backend, sem reduzir uma tarefa em andamento a pendente durante a edição.

O POST e o PUT enviam somente `title`, `description`, `dueDate`, `priority` e `status`. O identificador é recebido do backend e utilizado na URL; o frontend não gera outro identificador.

## Partes preservadas

- Todos os arquivos do backend são os arquivos originais do commit consultado: código, configurações, dependências e testes.
- A configuração das quatro rotas em App.tsx, a inicialização em main.tsx, o Vite e as configurações de TypeScript/ESLint foram preservados.
- As versões e os arquivos de lock das dependências são os dos repositórios do professor.
- As classes CSS e a base visual do professor foram aproveitadas. As adições de estilo usam os mesmos blocos e a notação de elementos BEM.
- Não foram introduzidos banco SQL, ORM, autenticação, Redux ou um framework de backend diferente.

## Adaptações e extensões da versão integrada

| Arquivo ou grupo | Motivo |
| --- | --- |
| `.env` e `.env.example` | Apontar para `http://localhost:3000/api` |
| `src/services/tarefaService.ts` | Consumir `/tasks`, converter os DTOs, acrescentar PUT e PATCH/toggle e informar erros |
| `src/types/Tarefa.ts` | Representar os três status; retirar o campo Projeto que a API não persiste |
| TaskForm | Reutilizar o formulário em criação/edição, incluir Situação e preservar dados quando o envio falha |
| TaskCard e TaskList | Repassar callbacks de edição/conclusão e exibir situação, prazo e prioridade |
| Tasks | Manter o fluxo da aula e acrescentar edição, conclusão, nova tentativa de carregamento, busca e seleção de visão |
| Today, Upcoming e Completed | Reutilizar Tasks com filtros, em vez de apresentar somente os textos iniciais do repositório |
| Header e Sidebar | Conectar busca e Nova tarefa; acrescentar o botão de navegação mobile |
| Layout | Controlar somente a abertura do menu mobile, mantendo o estado das tarefas na página |
| CSS de Header, Layout, TaskForm, TaskCard e Tasks | Estilos das interações adicionadas, erros e textos longos |
| `src/data/tarefasIniciais.ts` | Adequar os exemplos ao tipo atual; arquivo continua fora do fluxo da API |
| `public/taskflow-logo.svg` | Usar a logo local já presente no ZIP enviado |
| `index.html` | Identificar o idioma como pt-BR e ajustar o título |
| `package.json` do frontend | Acrescentar somente o script typecheck; manter as dependências do professor |
| `readme.md` do frontend | Explicar a configuração desta versão integrada |

Essas alterações não são apresentadas como código literal do professor. As versões sem adaptações estão nos dois ZIPs de `referencia-professor`, e o patch `frontend-integracao.patch` registra as diferenças nos arquivos existentes.

## Correspondência com os materiais da aula

O material React de 43 páginas, enviado anteriormente como projeto site 2, apresenta React, TypeScript, React Router, Axios e CrudCrud. Ele pede navegação, carregamento com useEffect, formulário controlado, cadastro com POST e exclusão com DELETE. PUT aparece como extensão/continuidade.

A implementação principal segue essa organização de componentes, estado e serviços. A persistência foi conectada à API própria indicada nesta solicitação. Edição, conclusão, filtros das páginas e abertura do menu mobile são extensões funcionais documentadas; não devem ser confundidas com a etapa inicial do código publicado.

O protótipo visual contém recursos que não estão implementados no frontend de referência, como indicadores, projetos, preferências e modais. Eles não foram reintroduzidos nesta versão, pois o objetivo desta reorganização é seguir a estrutura efetivamente publicada.

## Proveniência

Os links, commits e hashes dos arquivos originais estão em `referencia-professor/FONTES.md` e `referencia-professor/manifesto-originais.json`, incluídos no pacote ZIP para consulta local. Essa pasta fica fora do Git. O README principal mantém os links e commits de origem para quem clonar o repositório. A origem dos arquivos foi conferida pelos hashes de blobs fornecidos pelo GitHub.
