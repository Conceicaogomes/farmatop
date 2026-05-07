import {
  loginGoogle,
  logoutGoogle
} from "../firebase/auth";

export default function User({
  usuario,
  setUsuario
}) {

  async function handleLogin() {

    const user =
      await loginGoogle();

    if (user) {

      setUsuario(user);

    }

  }

  async function handleLogout() {

    await logoutGoogle();

    setUsuario(null);

  }

  return (

    <div className="user-area">

      {usuario ? (

        <div className="user-info">

          <img
            src={usuario.photoURL}
            alt={usuario.displayName}
          />

          <span>
            {usuario.displayName}
          </span>

          <button onClick={handleLogout}>
            Sair
          </button>

        </div>

      ) : (

        <button
          className="login-btn"
          onClick={handleLogin}
        >

          Login Cliente

        </button>

      )}

    </div>

  );

}