import axios from "axios";
import type { Prioridade, StatusTarefa, Tarefa } from "../types/Tarefa";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});
const RECURSO = "/tasks";

// Contrato do taskflo_backend, diferente do contrato do CrudCrud.
type TarefaApi = {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  priority: Prioridade;
  status: StatusTarefa;
};

function paraInterface(tarefa: TarefaApi): Tarefa {
  return {
    _id: tarefa.id,
    titulo: tarefa.title,
    descricao: tarefa.description,
    data: tarefa.dueDate?.slice(0, 10) || "",
    prioridade: tarefa.priority,
    status: tarefa.status,
  };
}

function paraApi(tarefa: Omit<Tarefa, "_id">) {
  return {
    title: tarefa.titulo,
    description: tarefa.descricao,
    dueDate: tarefa.data || null,
    priority: tarefa.prioridade,
    status: tarefa.status,
  };
}

export async function listarTarefas(): Promise<Tarefa[]> {
  const resposta = await api.get<TarefaApi[]>(RECURSO);
  return resposta.data.map(paraInterface);
}

export async function criarTarefa(tarefa: Omit<Tarefa, "_id">): Promise<Tarefa> {
  const resposta = await api.post<TarefaApi>(RECURSO, paraApi(tarefa));
  return paraInterface(resposta.data);
}

export async function atualizarTarefa(id: string, tarefa: Omit<Tarefa, "_id">): Promise<Tarefa> {
  const resposta = await api.put<TarefaApi>(`${RECURSO}/${encodeURIComponent(id)}`, paraApi(tarefa));
  return paraInterface(resposta.data);
}

export async function alternarConclusao(id: string): Promise<Tarefa> {
  const resposta = await api.patch<TarefaApi>(`${RECURSO}/${encodeURIComponent(id)}/toggle`);
  return paraInterface(resposta.data);
}

export async function excluirTarefa(id: string): Promise<void> {
  await api.delete(`${RECURSO}/${encodeURIComponent(id)}`);
}

export function mensagemErro(erro: unknown, mensagem: string): string {
  if (axios.isAxiosError(erro)) {
    if (!erro.response) return `${mensagem} Verifique se o backend está iniciado.`;
    const detalhes = erro.response.data?.details as { message: string }[] | undefined;
    if (detalhes?.length) return `${mensagem} ${detalhes.map((item) => item.message).join("; ")}`;
    if (erro.response.data?.error) return `${mensagem} ${erro.response.data.error}`;
  }
  return mensagem;
}
