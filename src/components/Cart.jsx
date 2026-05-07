import { FaTimes } from "react-icons/fa";

export default function Cart({
  carrinho,
  removerDoCarrinho,
  fecharCarrinho
}) {

  const total = carrinho.reduce(

    (acc, item) =>

      acc +
      item.preco * item.quantidade,

    0
  );

  return (
    <section className="cart-sidebar">

      <div className="cart-top">

        <h2>Seu Carrinho</h2>

        <button
          className="close-cart"
          onClick={fecharCarrinho}
        >
          <FaTimes />
        </button>

      </div>

      {carrinho.length === 0 ? (

        <p>
          Seu carrinho está vazio.
        </p>

      ) : (

        <>

          {carrinho.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <div>

                <h3>{item.nome}</h3>

                <p>
                  Quantidade:
                  {" "}
                  {item.quantidade}
                </p>

              </div>

              <div className="cart-right">

                <strong>
                  R$
                  {" "}
                  {(
                    item.preco *
                    item.quantidade
                  ).toFixed(2)}
                </strong>

                <button
                  onClick={() =>
                    removerDoCarrinho(
                      item.id
                    )
                  }
                >
                  Remover
                </button>

              </div>

            </div>

          ))}

          <div className="payment">

            <h3>
              Forma de Pagamento
            </h3>

            <select>

              <option>PIX</option>

              <option>
                Cartão de Crédito
              </option>

              <option>
                Cartão de Débito
              </option>

            </select>

          </div>

          <h2 className="total">

            Total:
            {" "}
            R$ {total.toFixed(2)}

          </h2>

          <button className="finish-btn">
            Finalizar Compra
          </button>

        </>

      )}

    </section>
  );
}