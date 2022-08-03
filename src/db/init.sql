CREATE TABLE
  client(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE
  );

CREATE TABLE
  task(
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES client(id),
    description TEXT NOT NULL,
    done BOOL NOT NULL DEFAULT FALSE
  );

CREATE TABLE
  administrator(
    id SERIAL PRIMARY KEY,
    client_id INT,
    CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES client(id),
    pass TEXT NOT NULL
  );

INSERT INTO
  client(name)
VALUES
  ('admin');

INSERT INTO
  administrator(client_id, pass)
VALUES
  (
    1,
    '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'
  ) returning *;