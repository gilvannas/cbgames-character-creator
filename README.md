#  Criador de Personagens - CB Games

Aplicação de desktop full-stack para criação e personalização de personagens, desenvolvida como um projeto para a empresa CB Games. O programa permite que usuários se cadastrem, façam login de forma segura e gerenciem uma lista de personagens com atributos customizáveis.

## ✨ Funcionalidades

- [x] **Sistema de Usuários:** Cadastro e Login com autenticação baseada em Token (JWT).
- [x] **Segurança:** Senhas de usuário criptografadas com `bcrypt`.
- [x] **Gerenciamento de Personagens (CRUD):**
    - [x] Criar novos personagens com atributos customizáveis (Força, Inteligência, etc.).
    - [x] Listar todos os personagens pertencentes ao usuário logado.
    - [x] Editar os atributos de um personagem existente.
    - [x] Excluir um personagem.
- [x] **Interface Intuitiva:** Frontend desenvolvido com React, utilizando CSS Modules para estilização e `react-router-dom` para navegação.
- [x] **Experiência do Usuário:** Feedback visual para o usuário através de notificações "toast" com `react-toastify`.
- [x] **Aplicação Desktop:** Empacotado como um programa de desktop instalável para Windows usando **Electron.js**.

## 🛠️ Tecnologias Utilizadas

* **Backend:**
    * Node.js, Express.js, MySQL2, JSON Web Token (JWT), bcrypt
* **Frontend:**
    * React.js, Vite, React Router Dom, Axios, React Toastify, CSS Modules
* **Banco de Dados & Desktop:**
    * MySQL (rodando em um container **Docker**)
    * Electron.js, Electron Builder

## 📂 Estrutura do Projeto

O código-fonte está organizado em três pastas principais, localizadas na raiz do projeto:

```
/
├── cbgames-app/          (Código-fonte do Backend)
├── frontend/             (Código-fonte do Frontend)
└── cbgames-desktop/      (Código-fonte do empacotador Electron)
```

## 🚀 Como Executar o Projeto a Partir do Código-Fonte

Siga os passos abaixo para rodar a aplicação em modo de desenvolvimento.

### Pré-requisitos

* **Node.js** (versão 18.x ou superior)
* **Docker Desktop** instalado e em execução

### 1. Backend (`cbgames-app`)

1.  Navegue até a pasta: `cd cbgames-app`
2.  **Banco de Dados:** Rode `docker-compose up -d` para iniciar o container do MySQL.
3.  **Variáveis de Ambiente:** Crie um arquivo `.env` na raiz desta pasta a partir do `.env.example` e preencha as credenciais.
4.  **Instale as dependências:** `npm install`
5.  **Inicie o servidor:** `npm start`
    * O backend estará rodando em `http://localhost:3001`. Deixe este terminal aberto.

### 2. Frontend (`frontend`)

1.  **Abra um novo terminal.**
2.  Navegue até a pasta: `cd frontend`
3.  **Instale as dependências:** `npm install`
4.  **Inicie o servidor de desenvolvimento:** `npm run dev`
    * O frontend estará acessível em `http://localhost:5173`.

### 3. Aplicação Desktop (`cbgames-desktop`)

1.  **Abra um terceiro terminal.**
2.  **Construa o frontend:** Na pasta `frontend`, rode `npm run build`.
3.  **Copie os arquivos:** Copie a pasta `dist` de dentro de `frontend` para dentro de `cbgames-desktop`.
4.  Navegue até a pasta: `cd cbgames-desktop`
5.  **Instale as dependências:** `npm install`
6.  **Inicie o programa:** `npm start`