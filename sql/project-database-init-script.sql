/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists users;
drop table if exists articles;
drop table if exists comments;
drop table if exists test;


create table test (
    id integer not null primary key,
    stuff text  
);

insert into test (stuff) values
    ('Things'),
    ('More things');

create table users(
id integer not null primary key,
fname varchar(32),
lname varchar(32),
bio varchar(500),
username varchar(32),
password varchar(150),
dob date,
avatar varchar(150)
);

create table articles(
id integer not null primary key,
title varchar(32),
image varchar(150),
ingredients varchar(2000),
method varchar(5000),
creator_user_id integer,
foreign key (creator_user_id) references users (id)
);

create table comments(
id integer not null,
article_id integer not null,
time_created timestamp,
parent_comment_id integer default 0,
level integer default 0,
content varchar(500),
user_id integer not null,
primary key (id, article_id),
foreign key (user_id) references users (id),
foreign key (article_id) references articles (id)
);