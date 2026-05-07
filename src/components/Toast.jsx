export default function Toast({ mensagem }) {
  if (!mensagem) {
    return null;
  }

  return (
    <div className="toast">
      {mensagem}
    </div>
  );
}