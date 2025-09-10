import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://3.110.95.205:8080/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Bookstore Frontend</h1>
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
