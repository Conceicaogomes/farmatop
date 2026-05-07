import { useEffect, useState } from "react";

import Header from "../components/Header";
import Products from "../components/Products";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Favorites from "./Favorites";
import User from "../components/User";
import Admin from "./Admin";
import AdminLogin from "../components/AdminLogin";

export default function Home() {

  const produtosIniciais = [
    {
      id: 1,
      nome: "Dipirona",
      preco: 12.9,
      imagem:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800",
    },

    {
      id: 2,
      nome: "Vitamina C",
      preco: 29.9,
      imagem:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=800",
    },

    {
      id: 3,
      nome: "Dorflex",
      preco: 15.5,
      imagem:
        "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=800",
    },

    {
      id: 4,
      nome: "Ibuprofeno",
      preco: 18.9,
      imagem:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800",
    },
  ];

  const [produtos, setProdutos] = useState(
    JSON.parse(
      localStorage.getItem("produtos")
    ) || produtosIniciais
  );

  const [darkMode, setDarkMode] = useState(
    JSON.parse(
      localStorage.getItem("darkMode")
    ) || false
  );

  const [busca, setBusca] =
    useState("");

  const [favoritos, setFavoritos] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "favoritos"
        )
      ) || []
    );

  const [mostrarFavoritos,
    setMostrarFavoritos] =
      useState(false);

  const [carrinhoAberto,
    setCarrinhoAberto] =
      useState(false);

  const [carrinho, setCarrinho] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "carrinho"
        )
      ) || []
    );

  const [toast, setToast] =
    useState("");

  const [usuario, setUsuario] =
    useState(null);

  const [adminLogado,
    setAdminLogado] =
      useState(
        JSON.parse(
          localStorage.getItem(
            "adminLogado"
          )
        ) || false
      );

  /* STORAGE */

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

  useEffect(() => {

    localStorage.setItem(
      "produtos",
      JSON.stringify(produtos)
    );

  }, [produtos]);

  /* TOAST */

  function mostrarToast(mensagem) {

    setToast(mensagem);

    setTimeout(() => {

      setToast("");

    }, 2500);

  }

  /* FAVORITOS */

  function toggleFavorito(produto) {

    const existe =
      favoritos.some(
        (item) => item.id === produto.id
      );

    if (existe) {

      setFavoritos(
        favoritos.filter(
          (item) => item.id !== produto.id
        )
      );

      mostrarToast(
        "Produto removido dos favoritos"
      );

    } else {

      setFavoritos([
        ...favoritos,
        produto
      ]);

      mostrarToast(
        "Produto adicionado aos favoritos"
      );

    }

  }

  /* CARRINHO */

  function adicionarAoCarrinho(produto) {

    const produtoExistente =
      carrinho.find(
        (item) => item.id === produto.id
      );

    if (produtoExistente) {

      setCarrinho(
        carrinho.map((item) =>

          item.id === produto.id

            ? {
                ...item,
                quantidade:
                  item.quantidade + 1
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

          item.id === id

            ? {
                ...item,
                quantidade:
                  item.quantidade - 1
              }

            : item

        )

        .filter(
          (item) => item.quantidade > 0
        )

    );

    mostrarToast(
      "Produto removido do carrinho"
    );

  }

  function logoutAdmin() {

    setAdminLogado(false);

    localStorage.removeItem(
      "adminLogado"
    );

  }

  const quantidadeCarrinho =
    carrinho.reduce(

      (acc, item) =>
        acc + item.quantidade,

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
        quantidadeCarrinho={
          quantidadeCarrinho
        }
        abrirFavoritos={() =>
          setMostrarFavoritos(
            !mostrarFavoritos
          )
        }
        quantidadeFavoritos={
          favoritos.length
        }
      />

      <div className="top-logins">

        <User
          usuario={usuario}
          setUsuario={setUsuario}
        />

        {!adminLogado && (

          <AdminLogin
            setAdminLogado={
              setAdminLogado
            }
          />

        )}

      </div>

      <Toast mensagem={toast} />

      {adminLogado && (

        <>

          <div className="admin-top">

            <h2>
              Painel Administrativo
            </h2>

            <button
              onClick={logoutAdmin}
            >

              Sair do Admin

            </button>

          </div>

          <Admin
            produtos={produtos}
            setProdutos={setProdutos}
          />

        </>

      )}

      {mostrarFavoritos ? (

        <Favorites favoritos={favoritos} />

      ) : (

        <>

          <section className="hero">

            <div>

              <h2>
                Sua saúde em primeiro lugar
              </h2>

              <p>
                Medicamentos,
                vitaminas e cuidados
                para toda família.
              </p>

              <button>
                Comprar Agora
              </button>

            </div>

          </section>

          <Products
            produtos={produtos}
            adicionarAoCarrinho={
              adicionarAoCarrinho
            }
            busca={busca}
            setBusca={setBusca}
            favoritos={favoritos}
            toggleFavorito={
              toggleFavorito
            }
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