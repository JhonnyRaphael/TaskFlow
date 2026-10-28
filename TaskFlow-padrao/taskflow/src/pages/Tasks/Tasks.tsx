import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { TaskList } from "../../components/TaskList/TaskList";
import { alternarConclusao, atualizarTarefa, criarTarefa, excluirTarefa, listarTarefas, mensagemErro } from "../../services/tarefaService";
import type { Tarefa } from "../../types/Tarefa";
import "./Tasks.css";

type Visao = "todas" | "hoje" | "proximas" | "concluidas";
const textos = {
  todas: { titulo: "Todas as tarefas", apoio: "Visualização completa das tarefas cadastradas.", etiqueta: "VISÃO GERAL" },
  hoje: { titulo: "Hoje", apoio: "Concentre-se nas tarefas que vencem hoje.", etiqueta: "FOCO DO DIA" },
  proximas: { titulo: "Próximas", apoio: "Tarefas previstas para os próximos dias.", etiqueta: "PLANEJAMENTO" },
  concluidas: { titulo: "Concluídas", apoio: "Tarefas que já foram finalizadas.", etiqueta: "RESULTADOS" },
};

export function Tasks({ visao = "todas" }: Readonly<{ visao?: Visao }>) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [cargaConcluida, setCargaConcluida] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [emOperacao, setEmOperacao] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [parametros, setParametros] = useSearchParams();
  const editando = parametros.has("nova") ? null : tarefaEmEdicao;
  const aberto = formularioAberto || parametros.has("nova");

  useEffect(() => {
    let ativo = true;
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await listarTarefas();
        if (ativo) {
          setTarefas(dados);
          setCargaConcluida(true);
        }
      } catch (falha) {
        if (ativo) setErro(mensagemErro(falha, "Não foi possível carregar as tarefas."));
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    void carregarTarefas();
    return () => { ativo = false; };
  }, [tentativa]);

  function fecharFormulario() {
    setFormularioAberto(false);
    setTarefaEmEdicao(null);
    const novos = new URLSearchParams(parametros);
    novos.delete("nova");
    setParametros(novos, { replace: true });
  }

  function abrirFormulario(tarefa?: Tarefa) {
    setTarefaEmEdicao(tarefa ?? null);
    setFormularioAberto(true);
    setMensagem("");
    const novos = new URLSearchParams(parametros);
    novos.delete("nova");
    setParametros(novos, { replace: true });
  }

  async function salvarTarefa(novaTarefa: Omit<Tarefa, "_id">) {
    try {
      setEmOperacao(true);
      setErro("");
      setMensagem("");
      if (editando?._id) {
        const atualizada = await atualizarTarefa(editando._id, novaTarefa);
        setTarefas((atuais) => atuais.map((tarefa) => tarefa._id === atualizada._id ? atualizada : tarefa));
        setMensagem("Tarefa atualizada.");
      } else {
        const criada = await criarTarefa(novaTarefa);
        setTarefas((atuais) => [criada, ...atuais]);
        setMensagem("Tarefa criada.");
      }
      fecharFormulario();
    } catch (falha) {
      // O TaskForm recebe a falha e mantém os campos preenchidos.
      throw new Error(mensagemErro(falha, "Não foi possível salvar a tarefa."), { cause: falha });
    } finally {
      setEmOperacao(false);
    }
  }

  async function removerTarefa(id: string) {
    try {
      setEmOperacao(true);
      setErro("");
      setMensagem("");
      await excluirTarefa(id);
      setTarefas((atuais) => atuais.filter((tarefa) => tarefa._id !== id));
      if (editando?._id === id) fecharFormulario();
      setMensagem("Tarefa excluída.");
    } catch (falha) {
      setErro(mensagemErro(falha, "Não foi possível excluir a tarefa."));
    } finally {
      setEmOperacao(false);
    }
  }

  async function concluirOuReabrir(id: string) {
    try {
      setEmOperacao(true);
      setErro("");
      setMensagem("");
      const atualizada = await alternarConclusao(id);
      setTarefas((atuais) => atuais.map((tarefa) => tarefa._id === id ? atualizada : tarefa));
      if (editando?._id === id) fecharFormulario();
      setMensagem(atualizada.status === "done" ? "Tarefa concluída." : "Tarefa reaberta.");
    } catch (falha) {
      setErro(mensagemErro(falha, "Não foi possível alterar a situação da tarefa."));
    } finally {
      setEmOperacao(false);
    }
  }

  const agora = new Date();
  const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;
  const busca = (parametros.get("busca") || "").trim().toLocaleLowerCase("pt-BR");
  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (visao === "hoje" && (tarefa.status === "done" || tarefa.data !== hoje)) return false;
    if (visao === "proximas" && (tarefa.status === "done" || tarefa.data <= hoje)) return false;
    if (visao === "concluidas" && tarefa.status !== "done") return false;
    return `${tarefa.titulo} ${tarefa.descricao}`.toLocaleLowerCase("pt-BR").includes(busca);
  });
  const texto = textos[visao];

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">{texto.etiqueta}</p>
          <h1>{texto.titulo}</h1>
          <p>{texto.apoio}</p>
        </div>
        <button type="button" onClick={() => abrirFormulario()} disabled={emOperacao}>Nova tarefa</button>
      </div>
      {erro && (
        <div className="tasks-page__error" role="alert">
          <p>{erro}</p>
          <button type="button" onClick={() => setTentativa((valor) => valor + 1)} disabled={carregando || emOperacao}>
            Tentar novamente
          </button>
        </div>
      )}
      {mensagem && <p className="tasks-page__success" role="status">{mensagem}</p>}
      {aberto && (
        <TaskForm key={editando?._id ?? "nova"} tarefaInicial={editando ?? undefined}
          aoSalvar={salvarTarefa} aoCancelar={fecharFormulario} bloqueado={emOperacao} />
      )}
      {carregando ? <p role="status">Carregando tarefas...</p> : cargaConcluida && (
        <TaskList tarefas={tarefasVisiveis} aoExcluir={removerTarefa} aoEditar={abrirFormulario}
          aoAlternar={concluirOuReabrir} bloqueado={emOperacao} />
      )}
    </section>
  );
}
