import { Menu, Plus, Search, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import "./Header.css";

type HeaderProps = { menuAberto: boolean; aoAlternarMenu: () => void };

export function Header({ menuAberto, aoAlternarMenu }: Readonly<HeaderProps>) {
  const [parametros, setParametros] = useSearchParams();
  return (
    <header className="header">
      <button className="header__menu" type="button" aria-label={menuAberto ? "Fechar navegação" : "Abrir navegação"}
        aria-expanded={menuAberto} aria-controls="navegacao-principal" onClick={aoAlternarMenu}>
        {menuAberto ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className="header__search">
        <Search size={18} />
        <input type="search" placeholder="Buscar tarefas..." aria-label="Buscar tarefas"
          value={parametros.get("busca") || ""}
          onChange={(evento) => {
            const novos = new URLSearchParams(parametros);
            if (evento.target.value) novos.set("busca", evento.target.value);
            else novos.delete("busca");
            setParametros(novos, { replace: true });
          }} />
      </div>
      <Link className="header__new-task" to="/tarefas?nova=1"><Plus size={18} />Nova tarefa</Link>
    </header>
  );
}
