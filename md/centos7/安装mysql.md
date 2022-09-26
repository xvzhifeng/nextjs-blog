## centos7 安装 mysql

在CentOS中默认安装有MariaDB，这个是MySQL的分支，但为了需要，还是要在系统中安装MySQL，而且安装完成之后可以直接覆盖掉MariaDB。

### 前言：

​		在安装软件最好，先更新一下源；

```shell
yum update
```



### 1、下载并安装

MySQL官方的 Yum Repository

```shell
# cd /user/local/mysql

# wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```


  使用上面的命令就直接下载了安装用的Yum Repository，大概25KB的样子，然后就可以直接yum安装了。

```shell
# yum -y install mysql57-community-release-el7-10.noarch.rpm
```

之后就开始安装MySQL服务器。

```shell
# yum -y install mysql-community-server
```

这步可能会花些时间，安装完成后就会覆盖掉之前的mariadb。

```log
Install  3 Packages (+2 Dependent packages)

Total size: 203 M
Downloading packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : mysql-community-common-5.7.37-1.el7.x86_64                   1/6
  Installing : mysql-community-libs-5.7.37-1.el7.x86_64                     2/6
  Installing : mysql-community-client-5.7.37-1.el7.x86_64                   3/6
  Installing : mysql-community-server-5.7.37-1.el7.x86_64                   4/6
  Installing : mysql-community-libs-compat-5.7.37-1.el7.x86_64              5/6
  Erasing    : 1:mariadb-libs-5.5.68-1.el7.x86_64                           6/6
  Verifying  : mysql-community-libs-compat-5.7.37-1.el7.x86_64              1/6
  Verifying  : mysql-community-libs-5.7.37-1.el7.x86_64                     2/6
  Verifying  : mysql-community-common-5.7.37-1.el7.x86_64                   3/6
  Verifying  : mysql-community-server-5.7.37-1.el7.x86_64                   4/6
  Verifying  : mysql-community-client-5.7.37-1.el7.x86_64                   5/6
  Verifying  : 1:mariadb-libs-5.5.68-1.el7.x86_64                           6/6

Installed:
  mysql-community-libs.x86_64 0:5.7.37-1.el7
  mysql-community-libs-compat.x86_64 0:5.7.37-1.el7
  mysql-community-server.x86_64 0:5.7.37-1.el7

Dependency Installed:
  mysql-community-client.x86_64 0:5.7.37-1.el7
  mysql-community-common.x86_64 0:5.7.37-1.el7

Replaced:
  mariadb-libs.x86_64 1:5.5.68-1.el7

Complete!

```

出现上面输出，即表示安装成功。



### 2、MySQL数据库设置

- 首先启动MySQL

```shell
systemctl start  mysqld.service
```

- 查看MySQL运行状态，运行状态如图：

```shell
systemctl status mysqld.service
```

![image-20220214130116769](https://raw.githubusercontent.com/xvzhifeng/pic/main/ImgTypora/image-20220214130116769.png)

- 通过如下命令可以在日志文件中找出密码：

```shell
grep "password" /var/log/mysqld.log

2022-02-14T05:00:45.171552Z 1 [Note] A temporary password is generated for root@localhost: TyUCe8&U.q%o

# 密码为：TyUCe8&U.q%o
```

- 如下命令进入数据库：

```shell
mysql -uroot -p
```

- 修改密码

```shell
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```

这时基本配置已经结束了；



### 3、开启mysql的远程访问

- 执行一下命令开启远程访问权限(% 代表所有的ip)

```shell
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
flush privileges; 
quit
```

- 创建用户

### 4、修改默认编码

```shell
mysql> status
--------------
mysql  Ver 14.14 Distrib 5.7.37, for Linux (x86_64) using  EditLine wrapper

Connection id:          5
Current database:
Current user:           root@localhost
SSL:                    Not in use
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         5.7.37 MySQL Community Server (GPL)
Protocol version:       10
Connection:             Localhost via UNIX socket
Server characterset:    latin1
Db     characterset:    latin1
Client characterset:    utf8
Conn.  characterset:    utf8
UNIX socket:            /var/lib/mysql/mysql.sock
Uptime:                 27 min 41 sec

Threads: 1  Questions: 71  Slow queries: 0  Opens: 146  Flush tables: 1  Open tables: 139  Queries per second avg: 0.042
--------------

```

- 修改mysql配置文件：
  - /etc/my.cnf

```shell
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[client]
default-character-set=utf8

[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
character-set-server=utf8

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

[mysql]
default-character-set=utf8


```

- 重启mysql

具体修改位置：

```shell
vim  /etc/my.cnf
①在[client]字段里加入default-character-set=utf8，如下：

[client]
default-character-set=utf8

②在[mysqld]字段里加入character-set-server=utf8，如下：

[mysqld]
character-set-server=utf8

datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

③在[mysql]字段里加入default-character-set=utf8，如下：

[mysql]
default-character-set=utf8
	保存更改后的my.cnf文件后，重启下mysql，然后输入status再次查看，你就会发现变化啦
```

### 5、修改存入大小限制

```shell
查看限制大小信息
show VARIABLES like '%max_allowed_packet%';

设置最大允许的值
set global max_allowed_packet = 2*1024*1024*10*10;
```



### 问题1-安装失败：

#### 报错原文

Public key for mysql-community-server-5.7.37-1.el7.x86_64.rpm is not installed
Failing package is: mysql-community-server-5.7.37-1.el7.x86_64
GPG Keys are configured as: file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

#### Mysql安装失败

操作系统：CentOS 7.6
Mysql版本：mysql5.7
CentOS7.6 安装mysql5.7的时候报错，提示某一个包安装不成功。

#### 失败原因

GPG对于包的源key的验证没有通过

#### 解决办法

在yum install 版本后面加上 --nogpgcheck，即可绕过GPG验证成功安装。比如yum install mysql-community-server --nogpgcheck



### 问题2-修改密码失败：

#### **报错原文**

ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

#### **失败原因**

密码的复杂度不符合要求

#### 解决方法

密码的复杂度不符合默认规定，如下命令查看mysql默认密码复杂度： 

```shell
SHOW VARIABLES LIKE 'validate_password%';

如需修改密码复杂度参考如下命令：
set global validate_password_policy=LOW;
set global validate_password_length=6;
```

结果显示：

```
mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+-------+
| Variable_name                        | Value |
+--------------------------------------+-------+
| validate_password_check_user_name    | OFF   |
| validate_password_dictionary_file    |       |
| validate_password_length             | 6     |
| validate_password_mixed_case_count   | 1     |
| validate_password_number_count       | 1     |
| validate_password_policy             | LOW   |
| validate_password_special_char_count | 1     |
+--------------------------------------+-------+
7 rows in set (0.00 sec)
```

