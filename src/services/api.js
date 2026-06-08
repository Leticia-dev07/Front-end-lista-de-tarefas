// Troque pelo IP da sua máquina se rodar no dispositivo físico
// Ex: 'http://192.168.1.100:8081'
const BASE_URL = 'http://192.168.1.7:8081'; // Android Emulator → localhost do PC

const api = {
  async listar() {
    const res = await fetch(`${BASE_URL}/tarefas`);
    if (!res.ok) throw new Error('Erro ao listar tarefas');
    return res.json();
  },

  async buscarPorId(id) {
    const res = await fetch(`${BASE_URL}/tarefas/${id}`);
    if (!res.ok) throw new Error('Tarefa não encontrada');
    return res.json();
  },

  async criar(tarefa) {
    const res = await fetch(`${BASE_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa),
    });
    if (!res.ok) throw new Error('Erro ao criar tarefa');
    return res.json();
  },

  async atualizar(id, tarefa) {
    const res = await fetch(`${BASE_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa),
    });
    if (!res.ok) throw new Error('Erro ao atualizar tarefa');
    return res.json();
  },

  async excluir(id) {
    const res = await fetch(`${BASE_URL}/tarefas/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erro ao excluir tarefa');
  },
};

export default api;
