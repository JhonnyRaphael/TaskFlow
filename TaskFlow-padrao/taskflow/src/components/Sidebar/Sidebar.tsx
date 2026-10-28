import { CalendarDays, CircleCheckBig, Inbox, Plus, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

const itensMenu = [
  { titulo: "Hoje", caminho: "/", icone: Sun },
  { titulo: "Próximas", caminho: "/proximas", icone: CalendarDays },
  { titulo: "Todas as tarefas", caminho: "/tarefas", icone: Inbox },
  { titulo: "Concluídas", caminho: "/concluidas", icone: CircleCheckBig },
];
type SidebarProps = { aberto: boolean; aoNavegar: () => void };

export function Sidebar({ aberto, aoNavegar }: Readonly<SidebarProps>) {
  return (
    <aside className={aberto ? "sidebar sidebar--open" : "sidebar"} id="navegacao-principal">
      <div className="sidebar__brand">
        <img src="/taskflow-logo.svg" alt="TaskFlow" className="sidebar__logo" />
        <div><strong>TaskFlow</strong><span>Gerenciador de tarefas</span></div>
      </div>
      <Link className="sidebar__new-task" to="/tarefas?nova=1" onClick={aoNavegar}>
        <Plus size={18} />Nova tarefa
      </Link>
      <nav className="sidebar__nav" aria-label="Navegação principal">
        {itensMenu.map((item) => {
          const Icone = item.icone;
          return (
            <NavLink key={item.caminho} to={item.caminho} end={item.caminho === "/"} onClick={aoNavegar}
              className={({ isActive }) => isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"}>
              <Icone size={19} /><span>{item.titulo}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
