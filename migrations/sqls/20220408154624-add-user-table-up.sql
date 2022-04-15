CREATE TABLE users (
  id serial PRIMARY KEY,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL 
);