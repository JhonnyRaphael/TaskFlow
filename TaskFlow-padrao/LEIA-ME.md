# TaskFlow no padrão do professor

Abra esta pasta no VS Code. Ela contém o frontend em `taskflow` e o backend em `taskflo_backend`, com os mesmos nomes e a mesma divisão de responsabilidades dos repositórios indicados.

Para formar um único repositório, consulte o README.md principal e GITHUB.md. O `.gitignore` na pasta principal já seleciona o que deve ser versionado. As cópias da pasta `referencia-professor` permanecem no pacote ZIP para consulta local, mas ficam fora do Git; os links e commits de origem estão no README principal.

O backend é o código original do professor, sem alterações. O frontend utiliza a estrutura original e contém adaptações documentadas para consumir esse backend e completar o CRUD na interface. Os dois repositórios publicados não se conectam diretamente: o frontend original usa CrudCrud e o backend próprio utiliza outro contrato.

## Começar

Use o Node.js 24, versão utilizada na verificação deste pacote. Não é necessário instalar banco de dados: o backend do professor grava as tarefas em JSON.

No VS Code, abra **Terminal > Novo Terminal** e execute:

```bash
cd taskflo_backend
npm ci
npm run dev
```

Mantenha esse terminal aberto. Abra um segundo terminal na pasta principal e execute:

```bash
cd taskflow
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

O frontend já inclui `.env` com:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

O serviço acrescenta `/tasks`, formando `http://localhost:3000/api/tasks`. O arquivo `.env.example` contém a mesma configuração. Ao alterar `.env`, reinicie o frontend.

Para conferir apenas se o backend está iniciado, abra `http://localhost:3000/health`. A resposta esperada é `{"status":"ok"}`.

Não é preciso criar outro projeto Vite nem usar Live Server. Os dois processos precisam permanecer abertos.

## O que foi mantido do professor

| Parte | Organização |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router, Axios, Lucide React, HTML de entrada e CSS separado por componente |
| Rotas | `/`, `/proximas`, `/tarefas`, `/concluidas` |
| Componentes | Header, Layout, Sidebar, TaskCard, TaskForm, TaskList |
| Estado e operações | A página Tasks usa useState/useEffect e chama tarefaService |
| Lista | TaskList percorre as tarefas com map e usa o identificador como key |
| Formulário | Campos controlados, onChange, onSubmit e preventDefault |
| Backend | Node.js, Express, TypeScript, Zod e persistência JSON |
| Camadas da API | routes, middlewares, controllers, services, domain, repositories, mappers, dtos e shared |
| Testes da API | Vitest e Supertest, com os arquivos originais do professor |

Não foram mantidas as pastas extras de hooks, utils e os serviços de demonstração/localStorage do ZIP anterior. A organização de referência está descrita em `COMPARACAO.md`.

## Usar a aplicação

- **Hoje:** tarefas pendentes ou em andamento cujo prazo é hoje, conforme a data local do navegador.
- **Próximas:** tarefas pendentes ou em andamento com prazo posterior a hoje.
- **Todas as tarefas:** todos os registros, inclusive concluídos, atrasados e sem prazo.
- **Concluídas:** registros com status `done`.
- **Nova tarefa:** abre o formulário diretamente na página, como na etapa implementada pelo professor.
- **Lápis:** reutiliza o formulário para editar uma tarefa com PUT.
- **Círculo:** conclui ou reabre com o PATCH `/toggle` do backend.
- **Lixeira:** exclui com DELETE, como no exemplo original.
- **Busca:** pesquisa título e descrição dentro da visão selecionada.

A API própria trabalha com três situações: `pending`, `in_progress` e `done`. Por isso o formulário tem o campo Situação. O backend não possui um campo Projeto; a versão integrada não oferece um cadastro que perderia essa informação ao salvar.

As tarefas começam vazias. Depois do primeiro cadastro, são gravadas em `taskflo_backend/data/tasks.json`. Elas permanecem após atualizar a página e reiniciar o backend. Os dados de verificação não fazem parte da entrega.

O arquivo `taskflow/src/data/tarefasIniciais.ts` foi mantido como exemplo da primeira etapa da aula. Ele não é importado pela aplicação nem enviado automaticamente à API.

## Código literalmente igual ao publicado

Dentro de `referencia-professor`, os arquivos `taskflow-original.zip` e `taskflo_backend-original.zip` preservam as versões consultadas dos repositórios. Eles servem para estudar e comparar o código sem as adaptações da versão integrada.

No frontend de referência, o único arquivo omitido é o `.env` publicado no GitHub. Para executar essa versão original, gere seu próprio endpoint do CrudCrud e crie `.env` com `VITE_API_URL=https://crudcrud.com/api/SEU_ENDPOINT`. Ela continua usando `/tarefas`; não basta apontar esse frontend original para a API própria.

O frontend original implementa principalmente GET, POST e DELETE em Todas as tarefas. As outras páginas e alguns botões ainda estão em uma etapa visual. A versão integrada completa essas interações. Consulte `COMPARACAO.md` para distinguir o original das extensões.

## Verificações

Frontend, dentro de `taskflow`:

```bash
npm run typecheck
npm run lint
npm run build
```

Backend, dentro de `taskflo_backend`:

```bash
npm run typecheck
npm run build
npm test
```

O resultado dos testes realizados nesta entrega está em `VERIFICACAO.md`.

## Leitura sugerida do código

1. `taskflow/src/main.tsx`: inicia o React e importa os estilos globais.
2. `taskflow/src/App.tsx`: define as rotas, preservadas do professor.
3. `taskflow/src/components/Layout/Layout.tsx`: combina Sidebar, Header e Outlet.
4. `taskflow/src/pages/Tasks/Tasks.tsx`: mantém o estado e coordena as operações.
5. `taskflow/src/components/TaskForm/TaskForm.tsx`: reúne os campos controlados.
6. `taskflow/src/components/TaskList/TaskList.tsx` e TaskCard: apresentam a coleção e comunicam as ações por props.
7. `taskflow/src/services/tarefaService.ts`: faz as requisições e converte os campos do backend.
8. `taskflo_backend/src/routes/task.routes.ts`: relaciona URLs, validações e controller.
9. Controller, service e repository: percorra as chamadas até a gravação em JSON.

Este pacote segue as referências fornecidas. A confirmação da etapa exata exigida para a entrega da disciplina depende do enunciado do professor; o código de referência está incluído para essa conferência.
