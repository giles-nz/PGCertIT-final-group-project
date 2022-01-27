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
avatar varchar(150),
authToken varchar(128)
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
timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
parent_comment_id integer default 0,
level integer default 0,
content varchar(500),
user_id integer not null,
primary key (id, article_id),
foreign key (user_id) references users (id),
foreign key (article_id) references articles (id)
);

insert into users (id, fname, lname, bio, username, password, dob, avatar) values (1,'Bryson','Newman','User number one of our site','user1','pa55word','1967-12-03',1);
insert into users (id, fname, lname, bio, username, password, dob, avatar) values (2,'Miles','Hartman','User number two of our site','user2','pa55word','1954-12-03',1);