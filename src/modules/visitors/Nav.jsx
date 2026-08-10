export default function Nav({ filters = [], filter, setFilter, filteredList }) {
  if (!filters.length || !setFilter || filter === undefined) return null;
  return (
    <div className="visitor-controls">
      <div className="filter-tabs">
        {filters.map((status) => {
          const capitalized = status.charAt(0).toUpperCase() + status.slice(1);
          const isActive = filter === status;

          return (
            <button
              key={status}
              className={`filter-tab ${isActive ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {isActive ? `${capitalized} (${filteredList.length})` : capitalized}
            </button>
          );
        })}
      </div>
    </div>
  );
}