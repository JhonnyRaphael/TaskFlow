import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.css";

export function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <div className="app-layout">
      <Sidebar aberto={menuAberto} aoNavegar={() => setMenuAberto(false)} />
      {menuAberto && (
        <button type="button" className="app-layout__overlay" aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)} />
      )}
      <div className="app-layout__content">
        <Header menuAberto={menuAberto} aoAlternarMenu={() => setMenuAberto((atual) => !atual)} />
        <main className="app-layout__main"><Outlet /></main>
      </div>
    </div>
  );
}
