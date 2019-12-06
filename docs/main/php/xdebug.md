# XDEBUG的使用指南

关于用xdebu的好处就是不用人肉调试，追代码的执行流程，先上一张效果图：

![UTOOLS1575612651755.png](https://i.loli.net/2019/12/06/w7PoszxEOGSukmZ.png)

在我看来有以下几个优点：

- 代码执行加载的文件顺序标出了，不用再去一个一个追代码的执行文件
- 不用再去写var_dump die然后增加删除，人肉debug，现在只需点点点
- 可视化每个变量值以及监听需要查看的变量值

## XDEBUG

问：为啥要使用XDEBUG，自带的var_dump不是很香吗？

答：程序只有一层的时候，var_dump确实香，但是，在中大规模项目中，多层继承与组合调用会让人肉DEBUG变得头昏脑胀，所以，抛弃人肉递归打断点，提高开发效率

问：啥是XDEBUG?

答：

Xdebug是PHP的扩展，用于协助调试和开发。

它包含一个用于IDE的调试器

它升级了PHP的var_dump()函数

它为通知，警告，错误和异常添加了堆栈跟踪

它具有记录每个函数调用和磁盘变量赋值的功能

它包含一个分析器

它提供了与PHPUnit一起使用的代码覆盖功能。

但不推荐在生产环境中使用xdebug，因为他太重了。

如果你只想知道怎么在你本机使用，请点击[这里](#phpstorm配置使用)
- 安装

（1）下载安装
https://xdebug.org/download.php 寻找对应的包

```cmd
 wget xxx.gz
 ./configure
 make && make install
```

注意：

crm_test用的是php7.3版本，因此configure需要选定php版本，使用添加这个命令````cmd --with-php-config=/usr/local/php7/bin/php-config```

（2）修改php.ini配置

crm_test环境使用的是php7.3版本

php.init路径是：/usr/local/php7/php.ini,同样编译扩展的时候也要选定

```cmd
[xdebug]
zend_extension=/usr/local/php7/lib/php/extensions/no-debug-non-zts-20180731/xdebug.so
xdebug.remote_enable=1
xdebug.remote_handler=dbgp
xdebug.remote_mode=req
xdebug.remote_connect_back=1
xdebug.remote_port=9001
xdebug.idekey=PHPSTORM
xdebug.overload_var_dump=0
;xdebug.auto_trace = 1
;xdebug.remote_log = /tmp/xdebug.log

```

注意：

1）以上是crm_test的配置，因为每个人都配置了一份代码目录，所以不设置具体的调试ip，开启了xdebug.remote_connect_back，靠xdebug自己找了，Xdebug将尝试连接到发出HTTP请求的客户端。它检查

Double subscripts: use braces to clarify_SERVER['REMOTE_ADDR']变量以找出要使用的IP地址

2）此外，不开启auto_trace，上次开了之后，把服务器磁盘给占满了

（3）xdebug常见参数配置以及注释

[基本配置](https://xdebug.org/docs/basic) 一般来说，无需修改，默认配置

[打印配置](https://xdebug.org/docs/display) Xdebug将替换PHP的var_dump()函数来显示变量。Xdebug版本包含了不同类型的不同颜色，并对数组元素/对象属性的数量、最大深度和字符串长度进行了限制。还有一些其他函数也处理变量显示。

[堆栈跟踪配置](https://xdebug.org/docs/stack_trace) 当Xdebug被激活时，当PHP决定显示一个通知、警告、错误等时，它将显示一个堆栈跟踪。堆栈跟踪显示的信息以及它们的显示方式可以配置为适合您的需要。

[函数调试配置](https://xdebug.org/docs/execution_trace) Xdebug允许记录所有函数调用，包括参数和以不同格式返回的值。
                                                  
[垃圾收集统计信息](https://xdebug.org/docs/garbage_collection) Xdebug的内置垃圾收集统计信息分析器允许您查明PHP内部垃圾收集器何时触发、它能够清理多少变量、它花费了多长时间以及实际释放了多少内存。

[远程调试配置](https://xdebug.org/docs/remote) Xdebug为与运行PHP脚本交互的调试器客户机提供了一个接口，phpstorm就是通过这个配置生效的
                                        


- 工作原理

![UTOOLS1575602344235.png](https://i.loli.net/2019/12/06/kKIPUmNpouayriM.png)

# phpstorm配置使用

- debug配置

>Languages & Frameworks > PHP > Debug,如图配置

配置监听的端口，因为上面php.init配置的端口是9001,所以要修改成9001

![UTOOLS1575602778614.png](https://i.loli.net/2019/12/06/kuCfpB7XeRbFx4J.png)

修改DBGP 代理的配置

![UTOOLS1575602955115.png](https://i.loli.net/2019/12/06/ZOw1VXDpHM2xIzg.png)

创建DEBUG配置文件，根据每个项目都要配置。

![UTOOLS1575603242141.png](https://i.loli.net/2019/12/06/V6PkejnbqcdRGZw.png)

![UTOOLS1575603716626.png](https://i.loli.net/2019/12/06/lC1nOw5bN4LuWkT.png)

![UTOOLS1575615454356.png](https://i.loli.net/2019/12/06/vtSUhc6Qb38kEzB.png)

- 关于phpstorm xdebug的使用按钮说明

![UTOOLS1575612875286.png](https://i.loli.net/2019/12/06/t32vxHaJWRmkyFC.png)

最后，用它，听我的，用它。

Happy Coding!