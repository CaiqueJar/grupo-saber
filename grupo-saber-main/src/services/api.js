import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const usuarioService = {
  cadastrar: (dados) => api.post('/usuarios', dados),
  listar: () => api.get('/usuarios'),
  buscarPorId: (id) => api.get(`/usuarios/${id}`),
  atualizar: (id, dados) => api.put(`/usuarios/${id}`, dados),
  excluir: (id) => api.delete(`/usuarios/${id}`)
};

export default api;