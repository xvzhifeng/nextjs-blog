## centos7 安装jdk

```sh
# 查看云端目前支持安装的jdk版本
yum search java|grep jdk

# 安装
yum install java-11-openjdk.x86_64

# 卸载jdk
yum erase java
```



## 查找现在有的版本，删除更新

```sh
[root@localhost iumpak]# rpm -qa | grep jdk
java-1.7.0-openjdk-headless-1.7.0.261-2.6.22.2.el7_8.x86_64
copy-jdk-configs-3.3-10.el7_5.noarch
java-1.8.0-openjdk-headless-1.8.0.262.b10-1.el7.x86_64
java-11-openjdk-headless-11.0.15.0.9-2.el7_9.x86_64
java-11-openjdk-11.0.15.0.9-2.el7_9.x86_64
[root@localhost iumpak]#
[root@localhost iumpak]#
[root@localhost iumpak]# rpm -e --nodeps java-1.7.0-openjdk-headless-1.7.0.261-2.6.22.2.el7_8.x86_64
[root@localhost iumpak]# rpm -e --nodeps java-1.8.0-openjdk-headless-1.8.0.262.b10-1.el7.x86_64

```

## 查看java安装路径

```sh
which java
ls -lrt /bin/java
ls -lrt /etc/alternatives/java
```

## 添加环境变量

```sh
[root@localhost ~]# vi /etc/profile.d/java.sh
[root@localhost ~]# cat /etc/profile.d/java.sh
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-11.0.15.0.9-2.el7_9.x86_64
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
[root@localhost ~]# source   /etc/profile.d/java.sh
[root@localhost ~]#
[root@localhost ~]# echo $JAVA_HOME
/usr/lib/jvm/java-11-openjdk-11.0.15.0.9-2.el7_9.x86_64

```

