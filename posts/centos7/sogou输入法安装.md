## 搜狗输入法安装

### 1、卸载相关冲突软件

```sh
单独卸载ibus软件，不卸载依赖包！

rpm -e --nodeps ibus
```



### 2、安装相关软件以及依赖

```sh
安装epel库源

yum -y install epel-release

安装fcitx

yum -y install fcitx fcitx-pinyin fcitx-configtool

vim ~/.bashrc
.配置fcitx环境：在~/.bashrc中加入内容
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx

yum -y install qtwebkit
yum -y install dpkg
yum -y install alien
#添加QT依赖
yum -y install fcitx-qt5 fcitx-configtool
yum -y install wget
```



### 3、下载搜狗包

```sh

#下载deb包
wget http://cdn2.ime.sogou.com/dl/index/1524572264/sogoupinyin_2.2.0.0108_amd64.deb

```



### 4、将搜狗安装包转为rpm格式

```sh
yum install alien
# deb -> rpm包转换
alien -r --scripts sogoupinyin_2.2.0.0108_amd64.deb
```



### 5、安装搜狗输入法

```sh
# rpm包安装

rpm -ivh --force sogoupinyin-2.2.0.0108-2.x86_64.rpm
cp /usr/lib/x86_64-linux-gnu/fcitx/fcitx-sogoupinyin.so /usr/lib64/fcitx/
#修改权限
chown -R 776 /usr/share/fcitx-sogoupinyin/
# 搜狗拼音的库,创建软链接：

ln -s /usr/lib/x86_64-linux-gnu/fcitx/fcitx-sogoupinyin.so /usr/lib64/fcitx/fcitx-sogoupinyin.so

ln -s /usr/lib/x86_64-linux-gnu/fcitx/fcitx-punc-ng.so /usr/lib64/fcitx/fcitx-punc-ng.so

# 重启
reboot
```





### 问题

```sh
[root@localhost sougou]# rpm -ivh --force sogoupinyin-2.2.0.0108-2.x86_64.rpm
error: Failed dependencies:
        libQtWebKit.so.4()(64bit) is needed by sogoupinyin-2.2.0.0108-2.x86_64
# 安装相关依赖
yum install libQtWebKit*
```



