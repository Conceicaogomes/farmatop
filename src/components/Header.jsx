import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes
} from "react-icons/fa";

import User from "./User";
import AdminLogin from "./AdminLogin";
import AccessibilityButton from "./AccessibilityButton";

export default function Header({
  darkMode,
  setDarkMode,
  abrirCarrinho,
  quantidadeCarrinho,
  abrirFavoritos,
  quantidadeFavoritos,
  usuario,
  setUsuario,
  adminLogado,
  setAdminLogado
}) {
  const [menuCategorias, setMenuCategorias] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <h1>FarmaTop</h1>

        <div className="header-actions">
          <button
            className="cart-button"
            onClick={abrirCarrinho}
          >
            <FaShoppingCart />
            <span>{quantidadeCarrinho}</span>
          </button>

          <button
            className="favorite-header-btn"
            onClick={abrirFavoritos}
          >
            <FaHeart />
            <span>{quantidadeFavoritos}</span>
          </button>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <AccessibilityButton />

          <button
            className="category-menu-btn"
            onClick={() => setMenuCategorias(!menuCategorias)}
          >
            {menuCategorias ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuCategorias && (
        <div className="category-menu">
          <button>Beleza</button>
          <button>Cosméticos</button>
          <button>Cuidados Diários</button>
          <button>Pet</button>
          <button>Vitaminas e suplementos</button>

          <div className="menu-login-area">
            <User
              usuario={usuario}
              setUsuario={setUsuario}
            />

            {!adminLogado && (
              <AdminLogin
                setAdminLogado={setAdminLogado}
              />
            )}
          </div>
        </div>
      )}

      <nav>
        <Link to="/">Início</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/trabalhe-conosco">
          Trabalhe Conosco
        </Link>
      </nav>
    </header>
  );
}