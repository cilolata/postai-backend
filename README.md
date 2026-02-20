<h1 align="center"> POSTAI API </h1>

[![TypeORM](https://img.shields.io/badge/TypeORM-FF0000?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

## Arquitetura

<img width="1232" height="573" alt="Screenshot 2026-02-19 at 22 08 06" src="https://github.com/user-attachments/assets/3273aa0d-d36a-42e2-8209-d3a03b282d81" />



## Banco de dados

- O banco de dados foi o relacional - postgres, e utilizamos o Supabase para armazenar em nuvem

#### tabelas

permission_type: PROFESSOR = 1 , ALUNO = 0

<img width="833" height="514" alt="Screenshot 2026-02-19 at 21 49 55" src="https://github.com/user-attachments/assets/0ca4ccda-7e31-4798-ab0e-3da337f42ca2" />

## Rotas

### Criação/Login de usuário
- POST: /cadastro
- POST: /login

### Professores: Criação/Edição/Delete de post
- POST: /posts
- PUT: /posts/:id
- DELETE: /posts/:id

### Alunos e Professores: Listagem de todos posts e busca
- GET: /posts
- GET: /posts/id
- GET: /posts/search=search

### Deploy

Criaçao de usuário
- POST: https://postai-latest.onrender.com/usuario

Professores
- POST: https://postai-latest.onrender.com/posts
- PUT: https://postai-latest.onrender.com/posts/:id
- DELETE: https://postai-latest.onrender.com/posts/:id

Professores / Alunos
- GET: https://postai-latest.onrender.com/posts
- GET: https://postai-latest.onrender.com/posts/id
- GET: https://postai-latest.onrender.com/posts/search=search

## Setup inicial

- npm run install/yarn 
- npm run start /yarn dev

## publicação da imagem dockerhub

[postai imagem](https://hub.docker.com/repository/docker/cilolata/postai/general)

## .env
SUPABASE_URL=
<br>
SUPABASE_KEY=
<br>
DB_PORT=
<br>
FIREBASE_PRIVATE_KEY=
<br>
FIREBASE_CLIENT_EMAIL=
<br>
FIREBASE_STORAGE_BUCKET=
<br>

## Swagger

- npm run start
- http://localhost:3000/postai








# postai-backend
