import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://3.110.95.205:8080/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setError("Invalid response from backend");
          console.error("Backend returned:", data);
        }
      })
      .catch((err) => {
        setError("Failed to fetch from backend");
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Bookstore </h1>
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {books.length === 0 && !error && <p>Loading books...</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <b>{book.title}</b> — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
