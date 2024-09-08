
# Remind-me

Este projeto consiste em uma aplicação de gerenciamento de tarefas desenvolvida com uma arquitetura moderna, utilizando tecnologias de ponta tanto no frontend quanto no backend. Abaixo estão as especificações e instruções de uso do projeto.

## 🖥️ Frontend

### Tecnologias Utilizadas:
- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento de front-end.
- **TypeScript**: Superset de JavaScript que adiciona tipos ao código, aumentando a segurança e a qualidade.
- **Shadcn UI**: Um conjunto de componentes estilizados prontos para uso.
- **TanStack Query**: Ferramenta para gerenciamento de estado assíncrono (fetching, caching, synchronization de dados).
- **React Hook Form**: Biblioteca leve para gerenciamento de formulários em React.
- **Zod**: Validação de dados e parsing utilizando schemas.

### Funcionalidades:
- Tela de Login e Registro com formulários validados.
- Interface amigável e responsiva para gerenciamento de tarefas.
- Edição e exclusão de tarefas diretamente na interface.
- Validação de formulários usando `React Hook Form` e `Zod`.

### Como Executar o Frontend:
1. Clone o repositório:
  ```bash
  git clone <URL_DO_REPOSITORIO>
  cd frontend
  ```
2. Instale as dependências:
  ```bash
  yarn
  ```
  OU
 ```bash
 npm install
 ```
4. Inicie o projeto:
 ```bash
  yarn dev
  ```
  OU
 ```bash
 npm run dev
 ```
5. Acesse o projeto via [http://localhost:5173](http://localhost:5173/).

## 🛠️ Backend

### Tecnologias Utilizadas:
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Fastify**: Framework web rápido e focado em baixo overhead para Node.js.
- **TypeScript**: Utilizado para garantir tipagem estática no projeto.
- **Zod**: Utilizado para validação de schemas e tipos de dados no backend.

### Arquitetura:
O backend foi desenvolvido seguindo os princípios do **SOLID**, garantindo uma melhor organização e escalabilidade do código. Foi implementado um **in-memory database** para realizar testes unitários com mais facilidade e o uso de **Factory** para a instanciação das classes de casos de uso.

### Funcionalidades:
- API REST para criação, leitura, atualização e exclusão (CRUD) de tarefas.
- Validação de dados no backend com **Zod**.
- Testes unitários com banco de dados in-memory.
- Integração com o frontend para gerenciamento completo de tarefas.

### Como Executar o Backend:
1. Clone o repositório:
  ```bash
  git clone <URL_DO_REPOSITORIO>
  cd backend
  ```
2. Instale as dependências:
  ```bash
  yarn
  ```
  OU
  ```bash
  npm install
  ```
3. Inicie o servidor:
  ```bash
  yarn dev
  ```
  OU
  ```bash
  npm run dev
  ```
4. O backend estará rodando na porta [http://localhost:3333](http://localhost:3333).

### Testes:
- Para rodar os testes unitários:
  ```bash
  yarn test
  ```
  OU
 ```bash
 npm run test
 ```

### Ferramentas de Testes:
- **Vitest**: Framework de testes para o Node.js.
- **In-Memory Database**: Simula um banco de dados em memória para testes mais rápidos e sem dependências externas.


## 🚀 Deploy
### **Usuário de teste**
**Email:** **demo@demo.com**<br>
**Senha:** **demo**<br>
O projeto está no ar. Para visitar e experimentar o sistema, basta acessar a URL.: [Remind-me](https://remind-me-omega.vercel.app/)

## 🖼️ Capturas de Tela

### **Mobile**
![login](https://github.com/user-attachments/assets/dfa11f75-292d-471c-b64a-24ded6b5c10e)
![home](https://github.com/user-attachments/assets/52a8040e-873c-4bfd-abc3-0e0b975ed7e7)

### **Desktop**
![login](https://github.com/user-attachments/assets/0a50fad9-1348-4973-985f-ba0dd13162f1)
![home](https://github.com/user-attachments/assets/b4146cb9-201c-4b4b-8b84-fb63981e4871)
