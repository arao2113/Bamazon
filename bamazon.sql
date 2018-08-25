create database bamazon_db;
use bamazon_db;

create table products (
	item_id int auto_increment,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price decimal(10,2) not null,
    stock_quantity int(30) not null,
    primary key(item_id)
);

insert into products (product_name, department_name, price, stock_quantity) values ("Blow dryer", "Home", 24.99, 4),
("Vacuum", "Home", 134.99, 2),
("Blender", "Home", 79.99, 4),
("BBQ grill", "Home", 349.99, 1),
("PS4", "Electronics", 249.99, 7),
("iPhone 8", "Electronics", 649.99, 2),
("WiFi Router", "Electronics", 74.00, 3),
("Canon printer", "Electronics", 44.09, 6),
("Shampoo", "Beauty", 13.99, 2),
("Toothpaste", "Beauty", 4.49, 11);

select * from products;

