# TaskFlow

Projeto acadêmico de gerenciamento de tarefas, organizado em um único repositório com frontend e backend separados. A implementação segue a organização dos exemplos do professor José Carmino Gomes Jr., com as adaptações de integração descritas em [COMPARACAO.md](COMPARACAO.md).

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

## Versionamento

O repositório é iniciado uma vez na pasta principal. Um commit pode conter alterações do frontend, do backend ou de ambos.

São versionados o código-fonte, os arquivos públicos da interface, os testes, as configurações, os dois arquivos de lock, os modelos `.env.example` e a documentação.

O `.gitignore` mantém fora do Git dependências instaladas, compilação, cobertura, configuração `.env`, dados de execução e as cópias ZIP de referência. Os `.gitignore` existentes nas duas aplicações continuam válidos.

Consulte [GITHUB.md](GITHUB.md) para criar o repositório remoto e enviar o primeiro commit.

## Referências e autoria

Este projeto adapta os exemplos didáticos publicados pelo professor:

- [Frontend TaskFlow](https://github.com/prof-carmino-aulas/taskflow), commit `bfbd24f5cdb9df4432e2c7e68d41e6dcd7640f00`.
- [TaskFlow Backend](https://github.com/prof-carmino-aulas/taskflo_backend), commit `2fe5b7c2d2df7ec385f4c52405e9872abbbecdb8`.

O código do backend foi preservado. O frontend recebeu adaptações para consumir essa API e completar o CRUD na interface. A organização e os metadados dos arquivos de origem foram mantidos; a documentação distingue o código de referência das adaptações.
