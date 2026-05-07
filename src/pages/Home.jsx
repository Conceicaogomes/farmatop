import { useState } from "react";

import Header from "../components/Header";
import Products from "../components/Products";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Favorites from "./Favorites";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [toast, setToast] = useState("");

  function mostrarToast(mensagem) {
    setToast(mensagem);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function toggleFavorito(produto) {
    const existe = favoritos.some((item) => item.id === produto.id);

    if (existe) {
      setFavoritos(favoritos.filter((item) => item.id !== produto.id));
      mostrarToast("Produto removido dos favoritos");
    } else {
      setFavoritos([...favoritos, produto]);
      mostrarToast("Produto adicionado aos favoritos");
    }
  }

  function adicionarAoCarrinho(produto) {
    const produtoExistente = carrinho.find((item) => item.id === produto.id);

    if (produtoExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }

    mostrarToast(`${produto.nome} adicionado ao carrinho`);
  }

  function removerDoCarrinho(id) {
    setCarrinho(
      carrinho
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );

    mostrarToast("Produto removido do carrinho");
  }

  const quantidadeCarrinho = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        abrirCarrinho={() => setCarrinhoAberto(true)}
        quantidadeCarrinho={quantidadeCarrinho}
        abrirFavoritos={() => setMostrarFavoritos(!mostrarFavoritos)}
        quantidadeFavoritos={favoritos.length}
      />

      <Toast mensagem={toast} />

      {mostrarFavoritos ? (
        <Favorites favoritos={favoritos} />
      ) : (
        <>
          <section className="hero">
            <div>
              <h2>Sua saúde em primeiro lugar</h2>

              <p>Medicamentos, vitaminas e cuidados para toda família.</p>

              <button>Comprar Agora</button>
            </div>
          </section>

          <Products
            adicionarAoCarrinho={adicionarAoCarrinho}
            busca={busca}
            setBusca={setBusca}
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
        </>
      )}

      {carrinhoAberto && (
        <>
          <div
            className="overlay"
            onClick={() => setCarrinhoAberto(false)}
          />

          <Cart
            carrinho={carrinho}
            removerDoCarrinho={removerDoCarrinho}
            fecharCarrinho={() => setCarrinhoAberto(false)}
          />
        </>
      )}

      <Footer />
    </div>
  );
}