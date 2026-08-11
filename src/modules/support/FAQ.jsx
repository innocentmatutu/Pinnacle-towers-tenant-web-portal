import { useState } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./support.css";
import { faqs } from "../../constants";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleFAQ = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="faq-section">
      <div className="search-wrap faq-search">
        <Icon name="search" size={16} />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="empty-state">
          <Icon name="help" size={48} />
          <h3>No FAQs found</h3>
          <p>No results match your search. Try adjusting your search terms.</p>
        </Card>
      ) : (
        <div className="faq-list">
          {filtered.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${open === faq.id ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>
                  <span className="faq-category">{faq.category}</span>
                  <strong>{faq.question}</strong>
                </span>
                <Icon name={open === faq.id ? "close" : "arrow"} size={16} />
              </button>
              {open === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
