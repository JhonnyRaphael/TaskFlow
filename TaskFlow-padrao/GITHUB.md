# Publicar o TaskFlow em um único repositório

## Uma pasta principal e duas aplicações

Use esta pasta principal como raiz do Git. `taskflow` e `taskflo_backend` continuam como pastas irmãs dentro dela. Não misture os arquivos das duas aplicações nem junte os dois package.json.

O nome do repositório remoto pode ser `taskflow`. Ele não precisa ser igual ao nome da pasta principal no computador.

No pacote entregue não existem repositórios Git internos. Execute git init somente na pasta principal, onde estão este arquivo, README.md e as duas pastas das aplicações.

## O que entra no Git

| Parte | Arquivos incluídos |
| --- | --- |
| Frontend | `src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, `tsconfig*.json`, `vite.config.ts`, `eslint.config.js`, `.env.example`, `.gitignore` e readme |
| Backend | `src/`, `tests/`, `package.json`, `package-lock.json`, `tsconfig*.json`, `vitest.config.mts`, `.gitignore` e README |
| Pasta principal | `.gitignore`, `README.md`, `GITHUB.md`, `LEIA-ME.md`, `COMPARACAO.md` e `VERIFICACAO.md` |

Os dois package-lock.json devem entrar. Eles permitem reinstalar as dependências com npm ci.

O `.gitignore` principal já exclui:

- node_modules das duas aplicações;
- dist e cobertura;
- .env e suas variantes locais, mantendo .env.example;
- o JSON com os dados de execução do backend;
- a pasta referencia-professor, que contém cópias para consulta no pacote ZIP;
- logs e arquivos temporários de compilação.

Mantenha as referências ao professor no README principal. Não é necessário versionar as cópias ZIP para preservar essa atribuição.

## Primeiro envio

É necessário ter o Git instalado e uma conta no GitHub. No VS Code, abra a pasta principal e depois Terminal > Novo Terminal.

Inicialize o repositório local e prepare os arquivos:

```bash
git init -b main
git add .
git status
```

Confira a lista. Os arquivos `.env`, `node_modules`, `dist` e `taskflo_backend/data/tasks.json` devem ficar fora dela. O `.env.example` e os dois package-lock.json devem aparecer.

Faça o primeiro commit:

```bash
git commit -m "Estrutura inicial do TaskFlow com frontend e backend"
```

Se o Git solicitar a identidade do autor, configure seu próprio nome e e-mail neste repositório e repita o commit:

```bash
git config user.name "SEU NOME"
git config user.email "SEU EMAIL"
```

No GitHub, crie um novo repositório chamado taskflow. Escolha a visibilidade conforme a atividade. Deixe desmarcada a criação de README, .gitignore e licença, porque os arquivos locais serão enviados no primeiro push.

Copie a URL HTTPS do repositório recém-criado. No terminal da pasta principal, substitua SEU_USUARIO na URL e execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/taskflow.git
git push -u origin main
```

Se aparecer a solicitação de autenticação, conclua o login na sua conta do GitHub. Envie o projeto extraído, com os arquivos-fonte e pastas visíveis; o repositório não deve conter apenas o ZIP do projeto.

## Próximos commits

Um commit reúne uma mudança lógica. Ele pode afetar uma aplicação ou as duas.

Para uma alteração somente no frontend:

```bash
git add taskflow
git commit -m "Ajusta o formulário de tarefas"
git push
```

Para uma alteração que conecta as duas partes:

```bash
git add taskflow taskflo_backend
git commit -m "Integra novo campo entre frontend e API"
git push
```

Você não precisa executar git init novamente nem fazer dois commits obrigatórios a cada alteração. Os dois projetos pertencem ao mesmo histórico.

## Referências

- [Adicionar código local ao GitHub](https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
- [Ignorar arquivos com .gitignore](https://docs.github.com/pt/get-started/git-basics/ignoring-files).
