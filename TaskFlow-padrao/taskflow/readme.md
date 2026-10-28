# TaskFlow - frontend integrado

Projeto utiliza de React, TypeScript, Vite, React Router, Axios, Lucide React, HTML e CSS.


## Executar

Primeiro inicie o backend seguindo `../LEIA-ME.md`. Depois, dentro desta pasta:

```bash
npm ci
npm run dev
```

O arquivo `.env` já define `VITE_API_URL=http://localhost:3000/api`. O serviço acrescenta `/tasks` às requisições.

## Organização

| Pasta/arquivo | Responsabilidade |
| --- | --- |
| `src/main.tsx` | Inicialização do React e estilos globais |
| `src/App.tsx` | BrowserRouter, Routes e Route |
| `src/components/Layout` | Sidebar, Header e Outlet; abertura do menu mobile |
| `src/components/Sidebar` | Navegação com NavLink |
| `src/components/Header` | Busca e ação Nova tarefa |
| `src/pages/Tasks` | Estado, useEffect e coordenação do CRUD |
| `src/pages/Today`, `Upcoming`, `Completed` | Reutilização da página de tarefas com a visão correspondente |
| `src/components/TaskForm` | Formulário controlado de criação e edição |
| `src/components/TaskList` | map da coleção com key pelo identificador |
| `src/components/TaskCard` | Apresentação de uma tarefa e callbacks das ações |
| `src/services/tarefaService.ts` | Axios e conversão entre os campos da interface e o DTO do backend |
| `src/types/Tarefa.ts` | Tipo utilizado pela interface |
| `src/styles` | Estilos globais e variáveis do professor |
| `src/data/tarefasIniciais.ts` | Exemplo didático não utilizado na execução |

As tarefas são persistidas pelo backend em JSON. Não há modo de demonstração nem gravação de tarefas no localStorage.

## Operações

| Ação | Método e rota da API |
| --- | --- |
| Carregar | GET `/api/tasks` |
| Criar | POST `/api/tasks` |
| Editar | PUT `/api/tasks/:id` |
| Concluir/reabrir | PATCH `/api/tasks/:id/toggle` |
| Excluir | DELETE `/api/tasks/:id` |

A página atualiza o estado após uma resposta bem-sucedida da API. Uma falha ao salvar preserva o formulário. Uma falha ao excluir mantém o registro na lista.

## Verificar

```bash
npm run typecheck
npm run lint
npm run build
```


