### tcpdump抓包简易教程

[TOC]



#### 1.tcpdump介绍

​		用简单的话来定义tcpdump，就是：dump the traffic on a network，根据使用者的定义对网络上的数据包进行截获的包分析工具。 tcpdump可以将网络中传送的数据包的“头”完全截获下来提供分析。它支持针对网络层、协议、主机、网络或端口的过滤，并提供and、or、not等逻辑语句来帮助你去掉无用的信息。

#### 2.tcpdump参数详解

**语法：**

```shell
tcpdump [-adeflnNOpqStvx][-c<数据包数目>][-dd][-ddd][-F<表达文件>][-i<网络界面>][-r<数据包文件>][-s<数据包大小>][-tt][-T<数据包类型>][-vv][-w<数据包文件>][输出数据栏位]
```

**参数说明**：

- -a 尝试将网络和广播地址转换成名称。
- -c<数据包数目> 指定要抓取的包数量。
- -d 把编译过的数据包编码转换成可阅读的格式，并倾倒到标准输出。
- -dd 把编译过的数据包编码转换成C语言的格式，并倾倒到标准输出。
- -ddd 把编译过的数据包编码转换成十进制数字的格式，并倾倒到标准输出。
- -e 在每列倾倒资料上显示连接层级的文件头。
- -f 用数字显示网际网络地址。
- -F<表达文件> 指定内含表达方式的文件。
- -i 指定tcpdump需要监听的接口。默认会抓取第一个网络接口。
- -l 使用标准输出列的缓冲区。
- -n 不把主机的网络地址转换成名字。
- -N 不列出域名。
- -O 不将数据包编码最佳化。
- -p 不让网络界面进入混杂模式。
- -q 快速输出，仅列出少数的传输协议信息。
- -r<数据包文件> 从指定的文件读取数据包数据。
- -s<数据包大小> 设置每个数据包的大小。
- -S 用绝对而非相对数值列出TCP关联数。
- -t 在每列倾倒资料上不显示时间戳记。
- -tt 在每列倾倒资料上显示未经格式化的时间戳记。
- -T<数据包类型> 强制将表达方式所指定的数据包转译成设置的数据包类型。
- -v 详细显示指令执行过程。
- -vv 更详细显示指令执行过程。
- -x 用十六进制字码列出数据包资料。
- -w<数据包文件> 把数据包数据写入指定的文件。

#### 3.tcpdump实例

**背景：**

​		使用jeesite框架开发的一个javaweb程序，现需要抓取接口调用时的数据；

**实际操作**：

前提：

- 项目所用的网口：ens33
- 端口号：8080

抓包：

- 命令

```shell
tcpdump -i ens33 port 8080 -w /root/package-content/jeesite/test3.cap
```

- -i 指定tcpdump需要监听的接口。默认会抓取第一个网络接口
- -w：把抓到的数据放入指定的文件内

#### 4.使用wireshark查看抓到的数据包

**获取数据**

​		将获得的数据复制windows中，使用的工具为winscp、

**查看数据**

​		1.直接使用wireshark打开数据。

![image-20210420171253315](C:%5CUsers%5Cxuzhif%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210420171253315.png)

	2. 在左上角的位置有个小箭头，表示数据的方向。

![image-20210420171520702](C:%5CUsers%5Cxuzhif%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210420171520702.png)

 	2. 传入的数据可以在request下，可以看到json格式的数据。

![image-20210420171709433](C:%5CUsers%5Cxuzhif%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210420171709433.png)

​	3.传出的数据可以在response下的data中查看。

![image-20210420171822841](C:%5CUsers%5Cxuzhif%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210420171822841.png)

4.分析数据。