export type Prioridade = "high" | "medium" | "low";
export type StatusTarefa = "pending" | "in_progress" | "done";

// A interface mantém os nomes da aula; o serviço converte o DTO do backend.
export type Tarefa = {
  _id?: string;
  titulo: string;
  descricao: string;
  data: string;
  prioridade: Prioridade;
  status: StatusTarefa;
};
