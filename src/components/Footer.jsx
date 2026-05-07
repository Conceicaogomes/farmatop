import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram,
  FaWhatsapp,
  FaClock
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-box">
        <h2>FarmaTop</h2>
        <p>Sua farmácia online com cuidado, rapidez e confiança.</p>
      </div>

      <div className="footer-box">
        <h3>Contato</h3>
        <p><FaPhoneAlt /> (81) 99999-9999</p>
        <p><FaWhatsapp /> WhatsApp disponível</p>
        <p><FaInstagram /> @farmatop</p>
      </div>

      <div className="footer-box">
        <h3>Localização</h3>
        <p><FaMapMarkerAlt /> Recife - PE</p>
        <p><FaClock /> Seg a Sáb: 8h às 20h</p>
      </div>

      <div className="footer-copy">
        © 2026 FarmaTop. Todos os direitos reservados.
      </div>
    </footer>
  );
}