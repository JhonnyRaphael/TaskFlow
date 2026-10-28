# TaskFlow

Projeto acadêmico de gerenciamento de tarefas, organizado em um único repositório com frontend e backend separados. A implementação segue a organização dos exemplos do professor José Carmino Gomes Jr.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `taskflow/` | Frontend com React, TypeScript, Vite, React Router, Axios, HTML e CSS |
| `taskflo_backend/` | API com Node.js, Express, TypeScript, Zod e persistência em JSON |
| `README.md` | Apresentação do projeto e instalação |
| `.gitignore` | Regras compartilhadas do repositório |
| `GITHUB.md` | Passo a passo do primeiro commit e envio ao GitHub |
| `LEIA-ME.md` | Explicação detalhada de execução e leitura do código |
| `COMPARACAO.md` | Relação com os exemplos do professor e adaptações |
| `VERIFICACAO.md` | Registro das verificações realizadas |

Cada aplicação mantém seu próprio `package.json` e `package-lock.json`. Não é necessário juntar os arquivos-fonte nem criar um terceiro package.json para versionar o projeto.

## Funcionalidades

- Cadastro, consulta, edição e exclusão de tarefas.
- Conclusão e reabertura de tarefas.
- Situações Pendente, Em andamento e Concluída.
- Visões Hoje, Próximas, Todas as tarefas e Concluídas.
- Busca por título e descrição.
- Persistência em arquivo JSON pelo backend.
- Interface responsiva e feedback de erros.

## Executar localmente

Utilize Node.js 24 e npm, ambiente utilizado na verificação do projeto.

No primeiro terminal, a partir da pasta principal:

```bash
cd taskflo_backend
npm ci
npm run dev
```

No segundo terminal, também a partir da pasta principal:

```bash
cd taskflow
npm ci
```

Copie `taskflow/.env.example` para `taskflow/.env`. O conteúdo de desenvolvimento é:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Ainda no segundo terminal, dentro de `taskflow`, execute:

```bash
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`. Os dois terminais precisam permanecer abertos.

Health check da API: `http://localhost:3000/health`.

As tarefas começam vazias. O backend cria `taskflo_backend/data/tasks.json` quando há um cadastro. Cada pessoa que clonar o projeto terá seus próprios dados locais.

## Verificação

Dentro de `taskflow`:

```bash
npm run typecheck
npm run lint
npm run build
```

Dentro de `taskflo_backend`:

```bash
npm run typecheck
npm run build
npm test
```
