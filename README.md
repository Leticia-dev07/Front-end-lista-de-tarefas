# 📋 TodoApp — Lista de Tarefas (React Native + Expo)

Aplicativo mobile de gerenciamento de tarefas desenvolvido com **React Native + Expo**, integrado a uma API REST Spring Boot. Permite criar, listar, editar, excluir e marcar tarefas como concluídas.

---

## 🚀 Funcionalidades

- Listar todas as tarefas
- Criar nova tarefa (título + descrição)
- Editar tarefa existente
- Excluir tarefa com confirmação
- Marcar/desmarcar tarefa como concluída
- Filtrar por: Todas · Pendentes · Concluídas
- Pull to refresh

---

## 🛠️ Tecnologias

| Tecnologia | Versão |
|---|---|
| React Native | 0.74.5 |
| Expo | ~51.0.0 |
| Node.js | ≥ 18 |

---

## 📦 Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Aplicativo **Expo Go** no celular **ou** emulador Android/iOS configurado

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/todo-app-mobile.git
cd todo-app-mobile

# 2. Instale as dependências
npm install

# 3. Configure a URL da API (veja seção abaixo)

# 4. Inicie o projeto
npx expo start
```

Após iniciar, escaneie o QR Code com o **Expo Go** (Android/iOS) ou pressione `a` para abrir no emulador Android.

---

## ⚙️ Configuração da API

Abra o arquivo `src/services/api.js` e ajuste a `BASE_URL` conforme seu ambiente:

```js
// Emulador Android (AVD)
const BASE_URL = 'http://10.0.2.2:8082';

// Dispositivo físico — use o IP local do seu PC (veja com `ipconfig` no Windows)
const BASE_URL = 'http://192.168.1.XXX:8082';

// Emulador iOS
const BASE_URL = 'http://127.0.0.1:8082';
```

> ⚠️ O celular físico e o PC devem estar **na mesma rede Wi-Fi**.

---

## 📁 Estrutura do projeto

```
TodoApp/
├── App.js                        # Entrada da aplicação
├── src/
│   ├── screens/
│   │   └── HomeScreen.js         # Tela principal com lista e filtros
│   ├── components/
│   │   ├── TarefaCard.js         # Card individual de tarefa
│   │   └── TarefaModal.js        # Modal de criação/edição
│   ├── services/
│   │   └── api.js                # Chamadas HTTP à API REST
│   └── styles/
│       └── theme.js              # Cores e estilos globais
└── package.json
```

---

## 🔗 Endpoints consumidos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/{id}` | Busca tarefa por ID |
| POST | `/tarefas` | Cria nova tarefa |
| PUT | `/tarefas/{id}` | Atualiza tarefa existente |
| DELETE | `/tarefas/{id}` | Remove uma tarefa |

---

## 🔗 Backend

Repositório da API: [Back-end Lista de Tarefas](https://github.com/Leticia-dev07/Back-end-lista-de-Tarefas.git)
