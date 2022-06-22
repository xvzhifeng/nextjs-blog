# Next.js Hello world
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## 前言：
**涉及到的模块**

- npm install remark remark-html
- npm install gray-matter
- npm install date-fns


## mysql

```
create database my_blog  character set utf8;

use `my_blog`

create table blog_content (
id int auto_increment NOT NULL ,
file_name varchar(40),
content LongBlob,
create_date datetime,
update_date datetime,
 PRIMARY KEY (id)
);

ALTER TABLE `my_blog`.blog_content ADD CONSTRAINT blog_content_PK PRIMARY KEY (id);

ALTER TABLE `my_blog`.blog_content MODIFY COLUMN id int auto_increment NOT NULL;

SELECT  CURDATE()

select * from blog_content

delete from blog_content

desc blog_content

alter table blog_content
modify create_date datetime

alter table blog_content
modify update_date datetime

select file_name from blog_content where file_name like '%md'

select * from blog_content where file_name like '%md' and file_name ='ssg-ssr.md'

create table blog_scurity (
id int auto_increment NOT NULL,
auth_code varchar(60),
create_date datetime,
update_date datetime,
 PRIMARY KEY (id)
)

insert into blog_scurity(auth_code, create_date)
values('2f7e4c8e09a8d34c6b3c5e8952fd8d92', Curdate())

select * from blog_scurity


```