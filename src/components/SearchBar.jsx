export default function SearchBar({
  busca,
  setBusca
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar medicamento..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
      />
    </div>
  );
}