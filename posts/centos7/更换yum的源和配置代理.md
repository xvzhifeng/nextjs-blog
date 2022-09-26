### centos更换源和配置代理

#### 1.更换yum的源

​	1.1 备份(针对所有CentOS可用，备份文件在当前路径下)

```shell
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```



​	1.2下载新的CentOS-Base.repo 到/etc/yum.repos.d/

```shell
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

或者

curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```



​	1.3 之后运行yum makecache生成缓存

- yum makecache

#### 2.配置代理

配置文件路径：/etc/yum.conf

修改配置文件：

>  在配置文件中添加 :proxy = http://username:password@yourproxy:8080/
>
> 注：没有用户名和密码的可以省略

![image-20210419180224105](C:%5CUsers%5Cxuzhif%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210419180224105.png)

清理缓存：sudo yum clean all

重新生成缓存：sudo yum makecache



