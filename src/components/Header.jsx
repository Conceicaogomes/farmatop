import { Link } from "react-router-dom";

import {
  FaMoon,
  FaSun,
  FaShoppingCart,
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
  return (
    <header className="header">
      <h1>FarmaTop</h1>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/trabalhe-conosco">
          Trabalhe Conosco
        </Link>
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