## 配置网卡为静态ip

### 1、查看当前网卡信息

```sh
ip addr
或
ifconfig
```

![image-20220723223502787](https://raw.githubusercontent.com/xvzhifeng/pic/main/ImgTypora/202207232239473.png)

### 2、网卡信息文件

centos7网卡配置文件路径

```sh
cd /etc/sysconfig/network-scripts/
```

![image-20220723224116166](https://raw.githubusercontent.com/xvzhifeng/pic/main/ImgTypora/202207232241420.png)

选择需要修改的网卡名称。

```sh
cat /etc/sysconfig/network-scripts/ifcfg-ens33
```

```sh
TYPE=Ethernet                # 网卡类型：为以太网
PROXY_METHOD=none            # 代理方式：关闭状态
BROWSER_ONLY=no                # 只是浏览器：否
BOOTPROTO=dhcp                # 网卡的引导协议：DHCP[中文名称: 动态主机配置协议]
DEFROUTE=yes                # 默认路由：是, 不明白的可以百度关键词 `默认路由` 
IPV4_FAILURE_FATAL=no        # 是不开启IPV4致命错误检测：否
IPV6INIT=yes                # IPV6是否自动初始化: 是[不会有任何影响, 现在还没用到IPV6]
IPV6_AUTOCONF=yes            # IPV6是否自动配置：是[不会有任何影响, 现在还没用到IPV6]
IPV6_DEFROUTE=yes            # IPV6是否可以为默认路由：是[不会有任何影响, 现在还没用到IPV6]
IPV6_FAILURE_FATAL=no        # 是不开启IPV6致命错误检测：否
IPV6_ADDR_GEN_MODE=stable-privacy            # IPV6地址生成模型：stable-privacy [这只一种生成IPV6的策略]
NAME=ens33                    # 网卡物理设备名称
UUID=f47bde51-fa78-4f79-b68f-d5dd90cfc698    # 通用唯一识别码, 每一个网卡都会有, 不能重复, 否两台linux只有一台网卡可用
DEVICE=ens33                    # 网卡设备名称, 必须和 `NAME` 值一样
ONBOOT=no                        # 是否开机启动， 要想网卡开机就启动或通过 `systemctl restart network`控制网卡,必须设置为 `yes` 
```



### 3、修改网卡信息

```sh
vim ifcfg-enp0s8
```

![image-20220723224232314](https://raw.githubusercontent.com/xvzhifeng/pic/main/ImgTypora/202207232242505.png)

以上为修改后的结果。

主要需要注意点：

- 设置网卡引导协议为 `静态`

  ```
  BOOTPROTO=static
  ```

- 设置网卡自启动

  ```
  ONBOOT=yes
  ```

- 设置网卡ip等信息

  ```
  IPADDR=192.168.1.111
  NETMASK=255.255.255.0
  GATEWAY=192.168.1.1
  ```

如果想要虚拟机可以和主机互通，需要在同一网段。

例如：

![image-20220723224619997](https://raw.githubusercontent.com/xvzhifeng/pic/main/ImgTypora/202207232246189.png)

所以我需要将ip改为这个网段

```sh
IPADDR=192.168.56.111
NETMASK=255.255.255.0
GATEWAY=192.168.56.1
```



### 4、重启网卡

```sh
systemctl restart network
# 查看网卡信息
ifconfig
```

