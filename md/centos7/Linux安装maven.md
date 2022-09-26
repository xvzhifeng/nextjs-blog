## Linux 安装maven

### 一. 下载压缩包:

[官网地址]( http://maven.apache.org/download.cgi)

### 二. 上传到linux的/usr/local目录

```shell
cd /usr/local
```

可以使用rz目录上传

### 三. 解压文件

```shell
tar -zxvf apache-maven-3.8.4-bin.tar.gz
```

### 四.  配置环境变量

```
vim /etc/profile

export MAVEN_HOME=/usr/local/apache-maven-3.8.4
export PATH=$MAVEN_HOME/bin:$PATH 
```

### 五. 刷新环境变量 

```shell
source /etc/profile
```

### 六. 检查版本

```shell
mvn -v 
```