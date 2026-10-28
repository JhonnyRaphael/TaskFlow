// Exemplos da etapa inicial da aula. Não são carregados nem enviados à API.
import type { Tarefa } from "../types/Tarefa";
export const tarefasIniciais: Tarefa[] = [
  {
    _id: "1",
    titulo: "Revisar proposta comercial",
    descricao: "Revisar valores e prazo antes do envio.",
    data: "2026-09-18",
    prioridade: "high",
    status: "pending",
  },
  {
    _id: "2",
    titulo: "Preparar apresentação",
    descricao: "Organizar os principais resultados do projeto.",
    data: "2026-09-20",
    prioridade: "medium",
    status: "pending",
  },
  {
    _id: "3",
    titulo: "Atualizar documentação",
    descricao: "Registrar as últimas alterações realizadas.",
    data: "2026-09-16",
    prioridade: "low",
    status: "done",
  },
];
