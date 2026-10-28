import { useState, type FormEvent } from "react";
import type { Prioridade, StatusTarefa, Tarefa } from "../../types/Tarefa";
import "./TaskForm.css";

type NovaTarefa = Omit<Tarefa, "_id">;
type TaskFormProps = {
  aoSalvar: (tarefa: NovaTarefa) => Promise<void>;
  aoCancelar: () => void;
  tarefaInicial?: Tarefa;
  bloqueado?: boolean;
};
const estadoInicial: NovaTarefa = {
  titulo: "",
  descricao: "",
  data: "",
  prioridade: "medium",
  status: "pending",
};

export function TaskForm({ aoSalvar, aoCancelar, tarefaInicial, bloqueado = false }: Readonly<TaskFormProps>) {
  const [formulario, setFormulario] = useState<NovaTarefa>(tarefaInicial ?? estadoInicial);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  function alterarCampo(campo: keyof NovaTarefa, valor: string) {
    setFormulario((estadoAtual) => ({ ...estadoAtual, [campo]: valor }));
  }

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (salvando || bloqueado) return;
    if (!formulario.titulo.trim()) {
      setErro("Informe um título para a tarefa.");
      return;
    }
    try {
      setErro("");
      setSalvando(true);
      await aoSalvar({ ...formulario, titulo: formulario.titulo.trim() });
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : "Não foi possível salvar a tarefa.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="task-form" onSubmit={enviarFormulario} aria-label={tarefaInicial ? "Editar tarefa" : "Nova tarefa"}>
      <h2>{tarefaInicial ? "Editar tarefa" : "Nova tarefa"}</h2>
      {erro && <p className="task-form__error" role="alert">{erro}</p>}
      <label>
        <span>Título</span>
        <input required maxLength={100} value={formulario.titulo}
          onChange={(evento) => alterarCampo("titulo", evento.target.value)}
          placeholder="Ex.: Revisar proposta comercial" disabled={salvando || bloqueado} />
      </label>
      <label>
        <span>Descrição</span>
        <textarea rows={3} maxLength={400} value={formulario.descricao}
          onChange={(evento) => alterarCampo("descricao", evento.target.value)}
          placeholder="Adicione contexto ou observações" disabled={salvando || bloqueado} />
      </label>
      <label>
        <span>Prazo</span>
        <input type="date" value={formulario.data}
          onChange={(evento) => alterarCampo("data", evento.target.value)} disabled={salvando || bloqueado} />
      </label>
      <label>
        <span>Prioridade</span>
        <select value={formulario.prioridade}
          onChange={(evento) => alterarCampo("prioridade", evento.target.value as Prioridade)} disabled={salvando || bloqueado}>
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="low">Baixa</option>
        </select>
      </label>
      <label>
        <span>Situação</span>
        <select value={formulario.status}
          onChange={(evento) => alterarCampo("status", evento.target.value as StatusTarefa)} disabled={salvando || bloqueado}>
          <option value="pending">Pendente</option>
          <option value="in_progress">Em andamento</option>
          <option value="done">Concluída</option>
        </select>
      </label>
      <div className="task-form__actions">
        <button type="button" onClick={aoCancelar} disabled={salvando || bloqueado}>Cancelar</button>
        <button type="submit" disabled={salvando || bloqueado}>
          {salvando ? "Salvando..." : tarefaInicial ? "Salvar alterações" : "Criar tarefa"}
        </button>
      </div>
    </form>
  );
}
