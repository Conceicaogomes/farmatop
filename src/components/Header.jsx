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

  const [menuCategorias,
    setMenuCategorias] =
      useState(false);

  return (

    <header className="header">

      <div className="header-left">

        <h1>
          FarmaTop
        </h1>

        <button
          className="category-menu-btn"
          onClick={() =>
            setMenuCategorias(
              !menuCategorias
            )
          }
        >

          {menuCategorias
            ? <FaTimes />
            : <FaBars />}

        </button>

      </div>

      {menuCategorias && (

        <div className="category-menu">

          <button>
            Beleza
          </button>

          <button>
            Cosméticos
          </button>

          <button>
            Cuidados Diários
          </button>

          <button>
            Pet
          </button>

          <button>
            Vitaminas e suplementos
          </button>

        </div>

      )}

      <nav>

        <Link to="/">
          Início
        </Link>

        <Link to="/produtos">
          Produtos
        </Link>

        <Link to="/trabalhe-conosco">
          Trabalhe Conosco
        </Link>

      </nav>

      <div className="header-actions">

        <User
          usuario={usuario}
          setUsuario={setUsuario}
        />

        <button
          className="favorite-header-btn"
          onClick={abrirFavoritos}
        >

          <FaHeart />

          <span>
            {quantidadeFavoritos}
          </span>

        </button>

        <button
          className="cart-button"
          onClick={abrirCarrinho}
        >

          <FaShoppingCart />

          <span>
            {quantidadeCarrinho}
          </span>

        </button>

        <AccessibilityButton />

        {!adminLogado && (

          <AdminLogin
            setAdminLogado={
              setAdminLogado
            }
          />

        )}

        <button
          className="theme-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {darkMode
            ? <FaSun />
            : <FaMoon />}

        </button>

      </div>

    </header>

  );

}