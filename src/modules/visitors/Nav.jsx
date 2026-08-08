export default function Nav({ filters = [], filter, setFilter }) {
  if (!filters || !setFilter || !filter) return;
  return (
    <div className="visitor-controls">
      <div className="filter-tabs">
        {filters.map((status) => (
          <button
            key={status}
            className={`filter-tab ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}