import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

export default function Products({
  adicionarAoCarrinho,
  busca = "",
  setBusca = () => {},
  favoritos,
  toggleFavorito,
  produtos
}) {

  const produtosFiltrados =
    produtos.filter((produto) =>

      produto.nome
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        )

    );

  return (

    <section className="products">

      <h2>
        Produtos Populares
      </h2>

      <SearchBar
        busca={busca}
        setBusca={setBusca}
      />

      <div className="products-grid">

        {produtosFiltrados.map(
          (produto) => (

            <ProductCard
              key={produto.id}
              produto={produto}
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
              favoritos={favoritos}
              toggleFavorito={
                toggleFavorito
              }
            />

          )
        )}

      </div>

    </section>

  );

}