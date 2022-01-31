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
timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
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
primary key (id),
foreign key (user_id) references users (id),
foreign key (article_id) references articles (id)
);

insert into users (id, fname, lname, bio, username, password, dob, avatar) values (1,'Bryson','Newman','User number one of our site','user1','pa55word','1967-12-03',1);
insert into users (id, fname, lname, bio, username, password, dob, avatar) values (2,'Miles','Hartman','User number two of our site','user2','pa55word','1954-12-03',1);


INSERT INTO articles ("id", "title", "image", "ingredients", "method", "creator_user_id", "timestamp") VALUES ('1', 'Women''s Day March changed the game', 'protest.jpg', 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis ante vitae urna lacinia, non tincidunt magna ultricies. Morbi tellus erat, placerat non arcu ut, commodo fermentum nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ut imperdiet neque. Fusce placerat felis sed neque rutrum, nec tincidunt est semper. Integer nibh diam, scelerisque ac vulputate vel, interdum eu est. Donec fringilla sapien in elit viverra faucibus. Vestibulum ipsum justo, viverra a sagittis quis, vehicula non ante. Vivamus vel mattis tortor. Phasellus luctus nulla a leo gravida viverra. Suspendisse eros nunc, imperdiet eget mi at, euismod faucibus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, libero eu accumsan hendrerit, nunc lectus volutpat urna, ac malesuada justo est eget mi.</p>
    <p>Donec elementum ipsum est, ut mollis risus commodo ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vel suscipit ante. Aenean pellentesque dapibus felis, eget lobortis orci hendrerit pretium. Pellentesque blandit lacus elementum, vestibulum nunc quis, volutpat magna. Nunc commodo volutpat congue. Morbi sodales, massa vel lobortis pretium, erat velit placerat risus, vitae luctus purus sapien in sapien.</p>
    <p>Integer nibh ipsum, elementum et facilisis at, efficitur vitae nulla. Aenean eget lacinia massa. Donec dui elit, maximus vel lorem ac, varius consequat nisi. Nam placerat odio eget est tristique, luctus consequat sapien auctor. In non arcu risus. Sed fermentum vitae neque a consequat. Nam scelerisque placerat elementum. Praesent eleifend sed lectus ut vestibulum. Donec ante ligula, feugiat ut urna vitae, sagittis eleifend felis. Mauris non ipsum felis. In commodo tellus sed sagittis fringilla. Vestibulum a nisl in mi efficitur dictum. In massa ipsum, dignissim sed mollis posuere, finibus at mauris.</p>', '1', '2022-01-19 10:03:56');
INSERT INTO articles ("id", "title", "image", "ingredients", "method", "creator_user_id", "timestamp") VALUES ('2', 'Let''s talk social reform', 'group-young.jpg', 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis ante vitae urna lacinia, non tincidunt magna ultricies. Morbi tellus erat, placerat non arcu ut, commodo fermentum nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ut imperdiet neque. Fusce placerat felis sed neque rutrum, nec tincidunt est semper. Integer nibh diam, scelerisque ac vulputate vel, interdum eu est. Donec fringilla sapien in elit viverra faucibus. Vestibulum ipsum justo, viverra a sagittis quis, vehicula non ante. Vivamus vel mattis tortor. Phasellus luctus nulla a leo gravida viverra. Suspendisse eros nunc, imperdiet eget mi at, euismod faucibus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, libero eu accumsan hendrerit, nunc lectus volutpat urna, ac malesuada justo est eget mi.</p>
    <p>Donec elementum ipsum est, ut mollis risus commodo ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vel suscipit ante. Aenean pellentesque dapibus felis, eget lobortis orci hendrerit pretium. Pellentesque blandit lacus elementum, vestibulum nunc quis, volutpat magna. Nunc commodo volutpat congue. Morbi sodales, massa vel lobortis pretium, erat velit placerat risus, vitae luctus purus sapien in sapien.</p>
    <p>Integer nibh ipsum, elementum et facilisis at, efficitur vitae nulla. Aenean eget lacinia massa. Donec dui elit, maximus vel lorem ac, varius consequat nisi. Nam placerat odio eget est tristique, luctus consequat sapien auctor. In non arcu risus. Sed fermentum vitae neque a consequat. Nam scelerisque placerat elementum. Praesent eleifend sed lectus ut vestibulum. Donec ante ligula, feugiat ut urna vitae, sagittis eleifend felis. Mauris non ipsum felis. In commodo tellus sed sagittis fringilla. Vestibulum a nisl in mi efficitur dictum. In massa ipsum, dignissim sed mollis posuere, finibus at mauris.</p>', '1', '2022-01-20 10:03:56');
INSERT INTO articles ("id", "title", "image", "ingredients", "method", "creator_user_id", "timestamp") VALUES ('3', 'France prepares for Election Day', 'france.jpg', 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis ante vitae urna lacinia, non tincidunt magna ultricies. Morbi tellus erat,placerat non arcu ut, commodo fermentum nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ut imperdiet neque. Fusce placerat felis sed neque rutrum, nec tincidunt est semper. Integer nibh diam, scelerisque ac vulputate vel, interdum eu est. Donec fringilla sapien in elit viverra faucibus. Vestibulum ipsum justo, viverra a sagittis quis, vehicula non ante. Vivamus vel mattis tortor. Phasellus luctus nulla a leo gravida viverra. Suspendisse eros nunc, imperdiet eget mi at, euismod faucibus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, libero eu accumsan hendrerit, nunc lectus volutpat urna, ac malesuada justo est eget mi.</p>
    <p>Donec elementum ipsum est, ut mollis risus commodo ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vel suscipit ante. Aenean pellentesque dapibus felis, eget lobortis orci hendrerit pretium. Pellentesque blandit lacus elementum, vestibulum nunc quis, volutpat magna. Nunc commodo volutpat congue. Morbi sodales, massa vel lobortis pretium, erat velit placerat risus, vitae luctus purus sapien in sapien.</p>
    <p>Integer nibh ipsum, elementum et facilisis at, efficitur vitae nulla. Aenean eget lacinia massa. Donec dui elit, maximus vel lorem ac, varius consequat nisi. Nam placerat odio eget est tristique, luctus consequat sapien auctor. In non arcu risus. Sed fermentum vitae neque a consequat. Nam scelerisque placerat elementum. Praesent eleifend sed lectus ut vestibulum. Donec ante ligula, feugiat ut urna vitae, sagittis eleifend felis. Mauris non ipsum felis. In commodo tellus sed sagittis fringilla. Vestibulum a nisl in mi efficitur dictum. In massa ipsum, dignissim sed mollis posuere, finibus at mauris.</p>', '1', '2022-01-26 10:03:56');
INSERT INTO articles ("id", "title", "image", "ingredients", "method", "creator_user_id", "timestamp") VALUES ('4', 'Demonstrations across EU break out', 'army.jpg', 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis ante vitae urna lacinia, non tincidunt magna ultricies. Morbi tellus erat, placerat non arcu ut, commodo fermentum nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ut imperdiet neque. Fusce placerat felis sed neque rutrum, nec tincidunt est semper. Integer nibh diam, scelerisque ac vulputate vel, interdum eu est. Donec fringilla sapien in elit viverra faucibus. Vestibulum ipsum justo, viverra a sagittis quis, vehicula non ante. Vivamus vel mattis tortor. Phasellus luctus nulla a leo gravida viverra. Suspendisse eros nunc, imperdiet eget mi at, euismod faucibus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, libero eu accumsan hendrerit, nunc lectus volutpat urna, ac malesuada justo est eget mi.</p>
    <p>Donec elementum ipsum est, ut mollis risus commodo ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vel suscipit ante. Aenean pellentesque dapibus felis, eget lobortis orci hendrerit pretium. Pellentesque blandit lacus elementum, vestibulum nunc quis, volutpat magna. Nunc commodo volutpat congue. Morbi sodales, massa vel lobortis pretium, erat velit placerat risus, vitae luctus purus sapien in sapien.</p>
    <p>Integer nibh ipsum, elementum et facilisis at, efficitur vitae nulla. Aenean eget lacinia massa. Donec dui elit, maximus vel lorem ac, varius consequat nisi. Nam placerat odio eget est tristique, luctus consequat sapien auctor. In non arcu risus. Sed fermentum vitae neque a consequat. Nam scelerisque placerat elementum. Praesent eleifend sed lectus ut vestibulum. Donec ante ligula, feugiat ut urna vitae, sagittis eleifend felis. Mauris non ipsum felis. In commodo tellus sed sagittis fringilla. Vestibulum a nisl in mi efficitur dictum. In massa ipsum, dignissim sed mollis posuere, finibus at mauris.</p>', '1', '2022-01-10 10:03:56');
INSERT INTO articles ("id", "title", "image", "ingredients", "method", "creator_user_id", "timestamp") VALUES ('5', 'Air raids across Syria', 'airplant.jpg', 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis ante vitae urna lacinia, non tincidunt magna ultricies. Morbi tellus erat, placerat non arcu ut, commodo fermentum nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ut imperdiet neque. Fusce placerat felis sed neque rutrum, nec tincidunt est semper. Integer nibh diam, scelerisque ac vulputate vel, interdum eu est. Donec fringilla sapien in elit viverra faucibus. Vestibulum ipsum justo, viverra a sagittis quis, vehicula non ante. Vivamus vel mattis tortor. Phasellus luctus nulla a leo gravida viverra. Suspendisse eros nunc, imperdiet eget mi at, euismod faucibus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, libero eu accumsan hendrerit, nunc lectus volutpat urna, ac malesuada justo est eget mi.</p>
    <p>Donec elementum ipsum est, ut mollis risus commodo ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vel suscipit ante. Aenean pellentesque dapibus felis, eget lobortis orci hendrerit pretium. Pellentesque blandit lacus elementum, vestibulum nunc quis, volutpat magna. Nunc commodo volutpat congue. Morbi sodales, massa vel lobortis pretium, erat velit placerat risus, vitae luctus purus sapien in sapien.</p>
    <p>Integer nibh ipsum, elementum et facilisis at, efficitur vitae nulla. Aenean eget lacinia massa. Donec dui elit, maximus vel lorem ac, varius consequat nisi. Nam placerat odio eget est tristique, luctus consequat sapien auctor. In non arcu risus. Sed fermentum vitae neque a consequat. Nam scelerisque placerat elementum. Praesent eleifend sed lectus ut vestibulum. Donec ante ligula, feugiat ut urna vitae, sagittis eleifend felis. Mauris non ipsum felis. In commodo tellus sed sagittis fringilla. Vestibulum a nisl in mi efficitur dictum. In massa ipsum, dignissim sed mollis posuere, finibus at mauris.</p>', '1', '2022-01-24 10:03:56');
INSERT INTO articles ("id", "title", "image", "ingredients", "method", "creator_user_id", "timestamp") VALUES ('6', 'Rugby World Cup 2023 Semi-Finals', 'rouby.jpg', 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis ante vitae urna lacinia, non tincidunt magna ultricies. Morbi tellus erat, placerat non arcu ut, commodo fermentum nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ut imperdiet neque. Fusce placerat felis sed neque rutrum, nec tincidunt est semper. Integer nibh diam, scelerisque ac vulputate vel, interdum eu est. Donec fringilla sapien in elit viverra faucibus. Vestibulum ipsum justo, viverra a sagittis quis, vehicula non ante. Vivamus vel mattis tortor. Phasellus luctus nulla a leo gravida viverra. Suspendisse eros nunc, imperdiet eget mi at, euismod faucibus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, libero eu accumsan hendrerit, nunc lectus volutpat urna, ac malesuada justo est eget mi.</p>
    <p>Donec elementum ipsum est, ut mollis risus commodo ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam vel suscipit ante. Aenean pellentesque dapibus felis, eget lobortis orci hendrerit pretium. Pellentesque blandit lacus elementum, vestibulum nunc quis, volutpat magna. Nunc commodo volutpat congue. Morbi sodales, massa vel lobortis pretium, erat velit placerat risus, vitae luctus purus sapien in sapien.</p>
    <p>Integer nibh ipsum, elementum et facilisis at, efficitur vitae nulla. Aenean eget lacinia massa. Donec dui elit, maximus vel lorem ac, varius consequat nisi. Nam placerat odio eget est tristique, luctus consequat sapien auctor. In non arcu risus. Sed fermentum vitae neque a consequat. Nam scelerisque placerat elementum. Praesent eleifend sed lectus ut vestibulum. Donec ante ligula, feugiat ut urna vitae, sagittis eleifend felis. Mauris non ipsum felis. In commodo tellus sed sagittis fringilla. Vestibulum a nisl in mi efficitur dictum. In massa ipsum, dignissim sed mollis posuere, finibus at mauris.</p>', '1', '2022-01-30 10:03:56');
	
	


INSERT INTO comments ("id", "article_id", "timestamp", "parent_comment_id", "level", "content", "user_id") VALUES ('1', '1', '2019-01-31 10:11:01', '0', '0', 'very nice', '1');
INSERT INTO comments ("id", "article_id", "timestamp", "parent_comment_id", "level", "content", "user_id") VALUES ('2', '1', '2020-01-31 10:11:01', '0', '0', 'cool', '1');
INSERT INTO comments ("id", "article_id", "timestamp", "parent_comment_id", "level", "content", "user_id") VALUES ('3', '1', '2022-01-31 10:11:01', '0', '0', 'best article I have seen!', '2');

	