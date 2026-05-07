import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Cart({
  carrinho,
  removerDoCarrinho,
  fecharCarrinho
}) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [pagamento, setPagamento] = useState("PIX");

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  async function buscarCep() {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido.");
      return;
    }

    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const dados = await resposta.json();

      if (dados.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setEndereco(dados);
    } catch {
      alert("Erro ao buscar CEP.");
    }
  }

  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!endereco) {
      alert("Pesquise o CEP antes de finalizar.");
      return;
    }

    alert(
      `Compra finalizada com sucesso!\n\nPagamento: ${pagamento}\nTotal: R$ ${total.toFixed(2)}`
    );

    fecharCarrinho();
  }

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
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item) => (
            <div
              className="cart-item"
              key={item.firebaseId}
            >
              <div>
                <h3>{item.nome}</h3>
                <p>Quantidade: {item.quantidade}</p>
              </div>

              <div className="cart-right">
                <strong>
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </strong>

                <button
                  onClick={() => removerDoCarrinho(item.firebaseId)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}

          <div className="cep-box">
            <h3>Entrega</h3>

            <div className="cep-row">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />

              <button onClick={buscarCep}>
                Buscar
              </button>
            </div>

            {endereco && (
              <div className="address-box">
                <p>{endereco.logradouro}</p>
                <p>
                  {endereco.bairro} - {endereco.localidade}/{endereco.uf}
                </p>
              </div>
            )}
          </div>

          <div className="payment">
            <h3>Forma de Pagamento</h3>

            <select
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
            >
              <option value="PIX">PIX</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Dinheiro na entrega">Dinheiro na entrega</option>
            </select>
          </div>

          <h2 className="total">
            Total: R$ {total.toFixed(2)}
          </h2>

          <button
            className="finish-btn"
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </button>
        </>
      )}
    </section>
  );
}