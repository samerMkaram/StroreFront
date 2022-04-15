CREATE TABLE orders (
  id serial PRIMARY KEY,
  username varchar(255) NOT NULL REFERENCES users(username),
  status varchar(20) NOT NULL
);