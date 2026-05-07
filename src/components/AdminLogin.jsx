import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function AdminLogin({ setAdminLogado }) {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function fazerLogin(e) {
    e.preventDefault();

    if (email === "admin@farmatop.com" && senha === "123456") {
      setAdminLogado(true);
      localStorage.setItem("adminLogado", "true");
      setErro("");
    } else {
      setErro("Email ou senha inválidos.");
    }
  }

  function fecharLogin() {
    setMostrarLogin(false);
    setEmail("");
    setSenha("");
    setErro("");
  }

  return (
    <div className="admin-login-small">
      {!mostrarLogin ? (
        <button
          className="admin-small-btn"
          onClick={() => setMostrarLogin(true)}
        >
          Login Funcionário
        </button>
      ) : (
        <form className="admin-mini-form" onSubmit={fazerLogin}>
          <button
            type="button"
            className="close-admin-login"
            onClick={fecharLogin}
          >
            <FaTimes />
          </button>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className="admin-error">{erro}</p>}

          <button type="submit">Entrar</button>
        </form>
      )}
    </div>
  );
}