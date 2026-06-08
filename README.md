# 📋 Todo App — React Native + Expo

Front-end mobile integrado ao back-end Spring Boot de Lista de Tarefas.

## Estrutura

```
TodoApp/
├── App.js
├── src/
│   ├── screens/
│   │   └── HomeScreen.js       # Tela principal (lista + filtros)
│   ├── components/
│   │   ├── TarefaCard.js       # Card de cada tarefa
│   │   └── TarefaModal.js      # Modal de criar/editar
│   ├── services/
│   │   └── api.js              # Chamadas HTTP ao back-end
│   └── styles/
│       └── theme.js            # Cores e estilos globais
```

## Funcionalidades

- ✅ Listar todas as tarefas
- ✅ Criar nova tarefa
- ✅ Editar tarefa existente
- ✅ Excluir tarefa (com confirmação)
- ✅ Marcar/desmarcar como concluída (toggle)
- ✅ Filtrar por: Todas / Pendentes / Concluídas
- ✅ Pull-to-refresh

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar a URL do back-end

Abra `src/services/api.js` e ajuste `BASE_URL`:

| Cenário | URL |
|---|---|
| **Android Emulator** (padrão) | `http://10.0.2.2:8081` |
| **Dispositivo físico** | `http://SEU_IP_LOCAL:8081` |
| **iOS Simulator** | `http://localhost:8081` |

Para descobrir seu IP local: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux).

### 3. Subir o back-end Spring Boot

```bash
# Na pasta do back-end
./mvnw spring-boot:run
```

O servidor sobe na porta `8081`.

### 4. Rodar o app

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios
```

## Endpoints utilizados

| Método | Rota | Descrição |
|---|---|---|
| GET | `/tarefas` | Lista todas |
| GET | `/tarefas/{id}` | Busca por ID |
| POST | `/tarefas` | Cria tarefa |
| PUT | `/tarefas/{id}` | Atualiza tarefa |
| DELETE | `/tarefas/{id}` | Exclui tarefa |

## Modelo de dados

```json
{
  "id": 1,
  "titulo": "Estudar React Native",
  "descricao": "Focar em hooks e navegação",
  "concluida": false
}
```
