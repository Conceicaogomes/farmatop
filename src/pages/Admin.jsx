import { useState } from "react";

import {
  adicionarProduto,
  editarProduto,
  excluirProduto,
} from "../services/productService";

export default function Admin({ produtos }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  function cadastrarProduto(e) {
    e.preventDefault();

    const novoProduto = {
      id: Date.now(),
      nome,
      preco: Number(preco),
      imagem,
    };

    adicionarProduto(novoProduto);

    setNome("");
    setPreco("");
    setImagem("");
  }

  function handleEditarProduto(produto) {
    const novoNome = prompt("Novo nome:", produto.nome);
    const novoPreco = prompt("Novo preço:", produto.preco);
    const novaImagem = prompt("Nova URL da imagem:", produto.imagem);

    if (!novoNome || !novoPreco || !novaImagem) {
      return;
    }

    editarProduto(produto.firebaseId, {
      nome: novoNome,
      preco: Number(novoPreco),
      imagem: novaImagem,
    });
  }

  function handleExcluirProduto(produto) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir ${produto.nome}?`
    );

    if (confirmar) {
      excluirProduto(produto.firebaseId);
    }
  }

  return (
    <section className="admin">
      <h2>Painel Admin</h2>

      <form onSubmit={cadastrarProduto}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          required
        />

        <button type="submit">Adicionar Produto</button>
      </form>

      <div className="admin-products">
        {produtos.map((produto) => (
          <div className="admin-product-card" key={produto.firebaseId}>
            <img src={produto.imagem} alt={produto.nome} />

            <h3>{produto.nome}</h3>

            <p>R$ {Number(produto.preco).toFixed(2)}</p>

            <div>
              <button onClick={() => handleEditarProduto(produto)}>
                Editar
              </button>

              <button
                className="delete-btn"
                onClick={() => handleExcluirProduto(produto)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}