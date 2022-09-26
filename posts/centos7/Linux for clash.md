#  Clash for linux 安装使用

clash客户端下载地址：【[https://github.com/Dreamacro/clash/releases](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FDreamacro%2Fclash%2Freleases)】

前提：已购买网络加速服务，导出配置文件（yaml格式文件，例如我的是FY-21329.yaml）

### 下载

下载对应的Linux-amd64版本，也可以直接在线下载



```cpp
wget https://github.com/Dreamacro/clash/releases/download/v1.8.0/clash-linux-amd64-v1.8.0.gz
```

### 安装

进入安装包存放目录，解压安装



```bash
gunzip clash-linux-amd64-v1.8.0.gz
sudo mv clash-linux-amd64-v1.8.0 /usr/local/bin/clash
sudo chmod +x /usr/local/bin/clash
./clash
```

clash启动后会在~/.config/clash 目录生成配置文件

 

 

![img](https://upload-images.jianshu.io/upload_images/23087403-f5db3a2a4b5a1298.png)

图片.png

### 修改配置

将你从机场导出的配置文件(路径根据你实际修改，我的放在tools目录下)，替换默认的配置



```jsx
sudo cat tools/FY-21329.yaml > ~/.config/clash/config.yaml
```

然后重新执行/usr/local/bin/clash

### 配置开机启动

在配置开机启动之前，将配置文件移动到 /etc 目录：



```jsx
sudo mv ~/.config/clash /etc
```

以后修改配置都记住修改 /etc/clash 目录下的这个配置文件。
然后使用 vim 增加 systemd 配置 ,：



```csharp
sudo vim /etc/systemd/system/clash.service
#放入如下内容
[Unit]
Description=Clash Daemon

[Service]
ExecStart=/usr/local/bin/clash -d /etc/clash/
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启用 clash service:



```bash
sudo systemctl enable clash.service  #设置开机自启动
sudo systemctl start clash.service  #手动启动
```

### 配置启用/关闭代理函数



```php
sudo vim .bashrc
#增加以下内容
# proxy on
# proxy off
function proxy_off() {
        unset http_proxy
            unset https_proxy
                unset no_proxy
                    echo -e "Proxy Off"
                }

function proxy_on(){
      export http_proxy="http://127.0.0.1:7890"
        export https_proxy=$http_proxy
          export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
            echo -e "Proxy On"
    }
$source .bashrc  #使配置生效
```

接下里就可以通过命令开关代理了



```undefined
proxy_on
proxy_off
```

 

![img](https://upload-images.jianshu.io/upload_images/23087403-46f39382cd835a53.png)