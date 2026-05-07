import {
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

export default function ProductCard({
  produto,
  adicionarAoCarrinho,
  favoritos = [],
  toggleFavorito = () => {}
}) {

  if (!produto) {
    return null;
  }

  const favorito =
    favoritos.some(
      (item) => item.id === produto.id
    );

  return (
    <div className="product-card">

      <button
        className="favorite-btn"
        onClick={() =>
          toggleFavorito(produto)
        }
      >

        {favorito
          ? <FaHeart />
          : <FaRegHeart />
        }

      </button>

      <img
        src={produto.imagem}
        alt={produto.nome}
      />

      <h3>{produto.nome}</h3>

      <p className="price">
        R$ {produto.preco.toFixed(2)}
      </p>

      <button
        onClick={() =>
          adicionarAoCarrinho(produto)
        }
      >
        Adicionar ao Carrinho
      </button>

    </div>
  );
}