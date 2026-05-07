import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

export default function Products({
  adicionarAoCarrinho,
  busca = "",
  setBusca = () => {},
  favoritos,
  toggleFavorito
}) {

  const produtos = [
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

  const produtosFiltrados =
    produtos.filter((produto) =>
      produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase())
    );

  return (
    <section className="products">

      <h2>Produtos Populares</h2>

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