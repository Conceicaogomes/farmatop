export default function Favorites({
  favoritos
}) {

  return (
    <section className="products">

      <h2>
        Seus Favoritos
      </h2>

      <div className="products-grid">

        {favoritos.map((produto) => (

          <div
            className="product-card"
            key={produto.id}
          >

            <img
              src={produto.imagem}
              alt={produto.nome}
            />

            <h3>
              {produto.nome}
            </h3>

            <p className="price">
              R$ {produto.preco.toFixed(2)}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}