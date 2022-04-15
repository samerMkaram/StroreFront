CREATE TABLE order_prod (
  id SERIAL PRIMARY KEY ,
  order_id integer NOT NULL REFERENCES orders(id),
  product_id integer NOT NULL REFERENCES product(id),
  quantity integer NOT NULL
);