### -bash: ./run.sh: /bin/bash^M: bad interpreter: No such file or directory 报错解决方法


shell脚本文件是dos格式，即每一行结尾以\r\n来标识，而unix格式的文件行尾则以\n来标识。

查看脚本文件是dos格式还是unix格式的几种办法。

- （1）cat -A filename  从显示结果可以判断，dos格式的文件行尾为^M$，unix格式的文件行尾为$。

- （2）od -t x1 filename 如果看到输出内容中存在0d 0a的字符，那么文件是dos格式，如果只有0a，则是unix格式
- （3）vi filename打开文件，执行 : set ff，如果文件为dos格式在显示为fileformat=dos，如果是unxi则显示为fileformat=unix。



**解决方法**

**方法一：**

```sh
 [root@localhost bin]# dos2unix run.sh
dos2unix: converting file run.sh to UNIX format ...
```


**方法二：**

```sh
vim mysell.sh

:get fileformat          #查看本文件的格式
:set fileformat=unix     #设置文件为unix
:wq                      #保存
```

**方法三：**

```sh
#使用sed命令，直接替换结尾符为unix格式

sed -i "s/\r//" run.sh
或者 
sed -i "s/^M//" run..sh
```

