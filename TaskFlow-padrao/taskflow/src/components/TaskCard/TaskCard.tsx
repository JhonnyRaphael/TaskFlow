import { CalendarDays, Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import type { Tarefa } from "../../types/Tarefa";
import "./TaskCard.css";

type TaskCardProps = {
  tarefa: Tarefa;
  aoExcluir: (id: string) => void;
  aoEditar: (tarefa: Tarefa) => void;
  aoAlternar: (id: string) => void;
  bloqueado?: boolean;
};
const prioridades = { high: "Alta", medium: "Média", low: "Baixa" };
const situacoes = { pending: "Pendente", in_progress: "Em andamento", done: "Concluída" };

export function TaskCard({ tarefa, aoExcluir, aoEditar, aoAlternar, bloqueado = false }: Readonly<TaskCardProps>) {
  const concluida = tarefa.status === "done";
  return (
    <article className={concluida ? "task-card task-card--completed" : "task-card"}>
      <button className="task-card__check" type="button"
        aria-label={concluida ? "Reabrir tarefa" : "Concluir tarefa"}
        disabled={bloqueado} onClick={() => tarefa._id && aoAlternar(tarefa._id)}>
        {concluida ? <CircleCheckBig size={22} /> : <Circle size={22} />}
      </button>
      <div className="task-card__content">
        <div className="task-card__header">
          <h3>{tarefa.titulo}</h3>
          <div className="task-card__actions">
            <button type="button" aria-label="Editar tarefa" disabled={bloqueado} onClick={() => aoEditar(tarefa)}>
              <Pencil size={17} />
            </button>
            <button type="button" aria-label="Excluir tarefa" disabled={bloqueado}
              onClick={() => tarefa._id && aoExcluir(tarefa._id)}>
              <Trash2 size={17} />
            </button>
          </div>
        </div>
        <p>{tarefa.descricao}</p>
        <div className="task-card__meta">
          <span><CalendarDays size={15} />{tarefa.data ? tarefa.data.split("-").reverse().join("/") : "Sem prazo"}</span>
          <span>{situacoes[tarefa.status]}</span>
          <span>Prioridade {prioridades[tarefa.prioridade].toLowerCase()}</span>
        </div>
      </div>
    </article>
  );
}
