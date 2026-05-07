import { useEffect, useState } from "react";

import Header from "../components/Header";
import Products from "../components/Products";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Favorites from "./Favorites";
import Admin from "./Admin";

import { listarProdutos } from "../services/productService";

export default function Home({
  paginaAtual = "inicio"
}) {
  const [produtos, setProdutos] =
    useState([]);

  const [darkMode, setDarkMode] =
    useState(
      JSON.parse(
        localStorage.getItem("darkMode")
      ) || false
    );

  const [busca, setBusca] =
    useState("");

  const [favoritos, setFavoritos] =
    useState(
      JSON.parse(
        localStorage.getItem("favoritos")
      ) || []
    );

  const [mostrarFavoritos, setMostrarFavoritos] =
    useState(false);

  const [carrinhoAberto, setCarrinhoAberto] =
    useState(false);

  const [carrinho, setCarrinho] =
    useState(
      JSON.parse(
        localStorage.getItem("carrinho")
      ) || []
    );

  const [toast, setToast] =
    useState("");

  const [usuario, setUsuario] =
    useState(null);

  const [adminLogado, setAdminLogado] =
    useState(
      JSON.parse(
        localStorage.getItem("adminLogado")
      ) || false
    );

  useEffect(() => {
    listarProdutos(setProdutos);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem(
      "carrinho",
      JSON.stringify(carrinho)
    );
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  function mostrarToast(mensagem) {
    setToast(mensagem);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function toggleFavorito(produto) {
    const existe =
      favoritos.some(
        (item) =>
          item.firebaseId === produto.firebaseId
      );

    if (existe) {
      setFavoritos(
        favoritos.filter(
          (item) =>
            item.firebaseId !== produto.firebaseId
        )
      );

      mostrarToast("Produto removido dos favoritos");
    } else {
      setFavoritos([...favoritos, produto]);
      mostrarToast("Produto adicionado aos favoritos");
    }
  }

  function adicionarAoCarrinho(produto) {
    const produtoExistente =
      carrinho.find(
        (item) =>
          item.firebaseId === produto.firebaseId
      );

    if (produtoExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.firebaseId === produto.firebaseId
            ? {
                ...item,
                quantidade: item.quantidade + 1
              }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produto,
          quantidade: 1
        }
      ]);
    }

    mostrarToast(
      `${produto.nome} adicionado ao carrinho`
    );
  }

  function removerDoCarrinho(id) {
    setCarrinho(
      carrinho
        .map((item) =>
          item.firebaseId === id
            ? {
                ...item,
                quantidade: item.quantidade - 1
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );

    mostrarToast("Produto removido do carrinho");
  }

  function logoutAdmin() {
    setAdminLogado(false);
    localStorage.removeItem("adminLogado");
  }

  const quantidadeCarrinho =
    carrinho.reduce(
      (acc, item) => acc + item.quantidade,
      0
    );

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        abrirCarrinho={() =>
          setCarrinhoAberto(true)
        }
        quantidadeCarrinho={quantidadeCarrinho}
        abrirFavoritos={() =>
          setMostrarFavoritos(!mostrarFavoritos)
        }
        quantidadeFavoritos={favoritos.length}
        usuario={usuario}
        setUsuario={setUsuario}
        adminLogado={adminLogado}
        setAdminLogado={setAdminLogado}
      />

      <Toast mensagem={toast} />

      {adminLogado && (
        <>
          <div className="admin-top">
            <h2>Painel Administrativo</h2>

            <button onClick={logoutAdmin}>
              Sair do Admin
            </button>
          </div>

          <Admin produtos={produtos} />
        </>
      )}

      {mostrarFavoritos ? (
        <Favorites favoritos={favoritos} />
      ) : (
        <>
          {paginaAtual === "inicio" && (
            <section className="hero">
              <div>
                <h2>Sua saúde em primeiro lugar</h2>

                <p>
                  Medicamentos, vitaminas e cuidados
                  para toda família.
                </p>

                <button>
                  Comprar Agora
                </button>
              </div>
            </section>
          )}

          <Products
            produtos={produtos}
            adicionarAoCarrinho={
              adicionarAoCarrinho
            }
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
            onClick={() =>
              setCarrinhoAberto(false)
            }
          />

          <Cart
            carrinho={carrinho}
            removerDoCarrinho={
              removerDoCarrinho
            }
            fecharCarrinho={() =>
              setCarrinhoAberto(false)
            }
          />
        </>
      )}

      <Footer />
    </div>
  );
}