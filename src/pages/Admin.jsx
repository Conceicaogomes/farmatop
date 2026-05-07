import { useState } from "react";

export default function Admin({
  produtos,
  setProdutos
}) {

  const [nome, setNome] =
    useState("");

  const [preco, setPreco] =
    useState("");

  const [imagem, setImagem] =
    useState("");

  function adicionarProduto(e) {

    e.preventDefault();

    const novoProduto = {

      id: Date.now(),

      nome,

      preco: Number(preco),

      imagem

    };

    setProdutos([
      ...produtos,
      novoProduto
    ]);

    setNome("");
    setPreco("");
    setImagem("");

  }

  return (

    <section className="admin">

      <h2>
        Painel Admin
      </h2>

      <form onSubmit={adicionarProduto}>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) =>
            setPreco(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imagem}
          onChange={(e) =>
            setImagem(e.target.value)
          }
          required
        />

        <button type="submit">
          Adicionar Produto
        </button>

      </form>

    </section>

  );

}