## 安装

``` Shell
# 必要依赖
sudo yum install lksctp-tools-devel
sudo yum install install libpcap-devel
# 添加
yum install ncurses-devel ncurses


# 编译似乎需要 gcc 9.3.1 以上
# 确保 scl enable devtoolset-9 'gcc -v' 的结果显示 gcc version 9.3.1
sudo yum install devtoolset-9

1、手动编译gcc大于4.9的版本
2、安装 devtoolset-9(使用高版本gcc version 9.3.1 20200408 (Red Hat 9.3.1-2) (GCC))编译安装Redis 6.0.5

如果以下命令无法安装需要先执行命令：yum install centos-release-scl -y
yum install devtoolset-9 -y

# sipp 官方下载地址: https://github.com/SIPp/sipp/releases
# 下载其中的 sipp-3.6.1.tar.gz
wget https://github.com/SIPp/sipp/releases/download/v3.6.1/sipp-3.6.1.tar.gz
tar zxf sipp-3.6.1.tar.gz
cd sipp-3.6.1

# 使用 gcc 9.3.1 编译
# 如果在下一步报错，提示cmake没找到，需要使用命令yum install cmake
sudo scl enable devtoolset-9 -- ./build.sh --none
sudo make install
```

-----