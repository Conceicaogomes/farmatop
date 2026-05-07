import { FaUniversalAccess } from "react-icons/fa";

export default function AccessibilityButton() {
  function ativarAcessibilidade() {
    document.body.classList.toggle("accessibility-mode");
  }

  return (
    <button
      className="accessibility-btn"
      onClick={ativarAcessibilidade}
      title="Aumentar fonte e contraste"
    >
      <FaUniversalAccess />
    </button>
  );
}