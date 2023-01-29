drop database if exists food_order;
create database food_order;

\c food_order;

drop table if exists users;
create table users (
    user_id bigserial primary key,
    username varchar(60) not null,
    contact varchar(15) not null
);

drop table if exists foods;
create table foods (
    food_id bigserial primary key,
    food_name varchar(60) not null,
    food_img varchar(256) not null
);

drop table if exists orders;
create table orders (
    order_id bigserial primary key,
    user_id int references users(user_id),
    food_id int references foods(food_id),
    count int 
);
insert into users(username,contact) values ('Ali','975664215');
insert into users(username,contact) values ('Abbos','975642215');
insert into users(username,contact) values ('Nosir','975645215');
insert into users(username,contact) values ('Halil','975123215');

insert into foods (food_name,food_img) values ('burger cheese','./img/burger_cheese.jpeg');
insert into foods (food_name,food_img) values ('chicken togora','./img/chicken_togora.jpeg');
insert into foods (food_name,food_img) values ('chicken wings','./img/chicken_wings.jpeg');
insert into foods (food_name,food_img) values ('cola','./img/cola.jpeg');
insert into foods (food_name,food_img) values ('combo','./img/combo.jpeg');
insert into foods (food_name,food_img) values ('fanta','./img/fanta.jpeg');
insert into foods (food_name,food_img) values ('spinner','./img/spinner.jpeg');


insert into orders (user_id, food_id, count) values (1,2,4);
insert into orders (user_id, food_id, count) values (2,3,2);
insert into orders (user_id, food_id, count) values (3,1,1);

