### Centos7搭建Squid代理服务器

#### 1.无需验证版----http

1.1 安装

- yum install squid

1.2 修改配置文件

- 打开文件: vim  /etc/squid/squid.conf
- 修改
  http_access allow all
  为
  http_access deny all

![Screen Shot 2021-04-19 at 23.49.59](/Users/xzf-naber/Documents/记录/resource/Screen Shot 2021-04-19 at 23.49.59.png)

可以看到默认端口是 3128

1.3  启动squid服务

- service squid start

1.4 在代理软件配置你的公网IP和端口号为3128

#### 2.验证版-----https

2.1 安装

```powershell
yum install squid -y
yum install httpd-tools -y
```

2.2 生成密码文件

创建文件夹

```shell
mkdir /etc/squid3/
#sumu 是用户名
htpasswd -cd /etc/squid3/passwords sumu
#提示输入密码，比如输入123456
```

测试密码文件

```powershell
/usr/lib64/squid/basic_ncsa_auth /etc/squid3/passwords
#输入用户名 密码
sumu  123456
#提示ok说明成功
ok
#ctrl+c退出
```

2.3 修改配置文件

- 打开文件：vim /etc/squid/squid.conf
- 添加以下内容

```powershell

#在最后添加
auth_param basic program /usr/lib64/squid/basic_ncsa_auth /etc/squid3/passwords
auth_param basic realm proxy
acl authenticated proxy_auth REQUIRED
http_access allow authenticated

# And finally deny all other access to this proxy
http_access allow all

#这里是端口号，可以按需修改
#http_port 3128 这样写会同时监听ipv6和ipv4的端口，推荐适应下面的配置方法。
http_port 0.0.0.0:3128
```

- 修改：
  - 将 `http_access deny CONNECT !SSL_ports`改为`http_access allow CONNECT !SSL_ports`

2.4 日志文件

- squid的日志位于/var/log/squid/目录下。

#### 3.常用命令

```powershell
#启动start
systemctl start squid.service
#停止stop
systemctl stop squid.service
#重启restart
systemctl restart squid.service
#配置开机自启动
systemctl enable squid.service
#关闭开机自启动
systemctl disable squid.service
#查看运行状态
systemctl status squid.service
```