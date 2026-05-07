import { useState } from "react";

export default function TrabalheConosco() {

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [cargo, setCargo] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");

  function enviarFormulario(e) {

    e.preventDefault();

    alert(
      "Inscrição enviada com sucesso!"
    );

    setNome("");
    setEmail("");
    setCargo("");
    setMensagem("");

  }

  return (

    <section className="trabalhe-page">

      <div className="trabalhe-container">

        <h1>
          Trabalhe Conosco
        </h1>

        <p>
          Faça parte da equipe FarmaTop.
        </p>

        <form
          onSubmit={enviarFormulario}
        >

          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Cargo desejado"
            value={cargo}
            onChange={(e) =>
              setCargo(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Fale um pouco sobre você"
            value={mensagem}
            onChange={(e) =>
              setMensagem(e.target.value)
            }
            required
          />

          <button type="submit">
            Enviar Inscrição
          </button>

        </form>

      </div>

    </section>

  );

}