# TugasAPI

API RESTful de lista de tarefas. Com esta API você pode cadastrar usuários e criar tarefas.

# Tecnologias
- Node.js
- Express.js
- Sequelize
- MySQL
- Morgan
- Bcrypt
- JWT

***

# Rodando localmente
1. Clone o repositório 
```bash
git clone https://github.com/dev-gsilv/tugasapi
```
2. Instale as dependências
```bash
  npm install
```
3. Crie um banco de dados local com mySQL;
4. Na raiz do projeto clonado, crie um arquivo de variáveis de ambiente `.env`;
5. Adicione as seguintes variáveis de ambiente: 
- `DB_NAME`: nome do banco de dados criado na etapa 3.
- `DB_USER`: nome de usuário de seu banco de dados mySQL;
- `DB_PASS`: senha de seu banco de dados mySQL;
- `DB_HOST`: localhost;
- `DB_PORT`: 3306
- `JWT_SECRET`: uma string aleatória para configuração do token de acesso JWT.
- `API_DEV_PORT`: 9999;

> Por exemplo:
> ```node
> DB_NAME=testedb
> DB_USER=root
> DB_PASS=root
> DB_HOST=localhost
> DB_PORT=3306
> JWT_SECRET='%Q!o*3RB&PPTKNimiEZ2H$uZJuerSTu6Yo!AR6xLQa43Qj35k$V&Dc$w8eR3'
> API_DEV_PORT=9999
> ```

6. Inicie o servidor
```bash
  npm start
```
7. Sua API estará rodando localmente, teste a resposta do servidor na rota 'healthcheck'.

***
***

# Documentação da API

#### Acesso via Basic Auth

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. E-mail e identificação única do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

***


#### Criar um novo usuário

```http
  POST /register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário. |
| `email` | `string` | **Obrigatório**. E-mail e identificação única do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |
***

#### Buscar dados do usuário

```http
  GET /users
```
> Autorização por Bearer token JWT*

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `none` | `N/A` | Nenhum parâmetro necessário. |

***

#### Buscar dados de todos os usuários

```http
  GET /users/all
```
> Autorização por Bearer token JWT*. **Exclusivo para usuário do tipo '_admin_'**.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `none` | `N/A` | Nenhum parâmetro necessário. |

***

#### Editar dados do usuário

```http
  PUT /users
```
> Autorização por Bearer token JWT*

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do usuário. |
| `email` | `string` | E-mail e identificação única do usuário |
| `password` | `string` | Senha do usuário |
***

#### Remover um usuário

```http
  DELETE /users
```
> Autorização por Bearer token JWT*

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `none` | `N/A` | Nenhum parâmetro necessário. |

***

#### Criar uma nova tarefa

```http
  POST /tasks
```
> Autorização por Bearer token JWT*

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. Título da tarefa. |
| `description` | `string` | Descrição da tarefa. |
| `status` | `string` | Estado da tarefa. Escolha entre: 'pending,' 'in_progress' or 'completed'. Default: 'pending' |
| `dueDate` | `string` | Data e hora limite da tarefa. Use o formato 'YYYY-MM-DD HH:MM:SS' ou apenas 'YYYY-MM-DD'.|
***

#### Buscar os dados de todas as tarefas

```http
  GET /tasks/all
```
> Autorização por Bearer token JWT*. **Exclusivo para usuário do tipo '_admin_'**.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `none` | `N/A` | Nenhum parâmetro necessário. |

***

#### Buscar os dados de uma tarefas

```http
  GET /tasks/:id
```
> Autorização por Bearer token JWT*. 

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID da tarefa. Path Param. |

***

#### Editar os dados de uma tarefa

```http
  PUT /tasks/:id
```
> Autorização por Bearer token JWT*

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | Título da tarefa. |
| `description` | `string` | Descrição da tarefa. |
| `status` | `string` | Estado da tarefa. Escolha entre: 'pending,' 'in_progress' or 'completed'.
| `dueDate` | `string` | Data e hora limite da tarefa. Use o formato 'YYYY-MM-DD HH:MM:SS' ou apenas 'YYYY-MM-DD'.|
| `id` | `string` | ID da tarefa. Path Param. |
***

#### Remover uma tarefa

```http
  DELETE /tasks/:id
```
> Autorização por Bearer token JWT*. 

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID da tarefa. Path Param. |
***

> ***Para rotas com autenticação por token**
>
> | Auth type | Token |
> | :---- | :---- |
> | Bearer |  Token JWT fornecido no login. |

***
***

# Autor

- [@dev-gsilv](https://dev-guilhermesilva.vercel.app/)
