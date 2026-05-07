import { useState } from "react";

import {
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHeart
} from "react-icons/fa";

export default function Header({
  darkMode,
  setDarkMode,
  abrirCarrinho,
  quantidadeCarrinho,
  abrirFavoritos,
  quantidadeFavoritos
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="header">
      <h1>FarmaTop</h1>

      <button
        className="menu-btn"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        {menuAberto ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={menuAberto ? "nav-active" : ""}>
        <a href="">Início</a>
        <a href="">Produtos</a>
        <a href="">Contato</a>
      </nav>

      <div className="header-actions">
        <button
          className="favorite-header-btn"
          onClick={abrirFavoritos}
        >
          <FaHeart />

          <span>{quantidadeFavoritos}</span>
        </button>

        <button
          className="cart-button"
          onClick={abrirCarrinho}
        >
          <FaShoppingCart />

          <span>{quantidadeCarrinho}</span>
        </button>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}