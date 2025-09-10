CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL
);

INSERT INTO books (title, author) VALUES 
('The DevOps Handbook', 'Gene Kim'),
('Kubernetes in Action', 'Marko Lukša'),
('Node.js Design Patterns', 'Mario Casciaro');
