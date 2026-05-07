import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import TrabalheConosco from "./pages/TrabalheConosco";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home paginaAtual="inicio" />}
        />

        <Route
          path="/produtos"
          element={<Home paginaAtual="produtos" />}
        />

        <Route
          path="/trabalhe-conosco"
          element={<TrabalheConosco />}
        />
      </Routes>
    </BrowserRouter>
  );
}