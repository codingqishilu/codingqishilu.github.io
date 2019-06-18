# php的快速学习路径
---

## 前言

其实，php要学的基础点很少，翻翻官方手册大概就上手了，但是要完全掌握还是需要时间来学习的，最好是按照下面按照关键字搜索知识点自己上手敲，以下推荐基本入门书籍

- [​php the right way](http://wulijun.github.io/php-the-right-way/)
- 深入PHP：面向对象、模式与实践（第3版）

以下参考[淡兰色的海洋的《php零基础学习大纲》](https://blog.bingxuecandong.com/?p=348)

## 基本功
如果你熟练掌握php的基本语法，请跳过这一章节。

参考PHP w3school的内容，学习以下知识点并完成小目标。

- 使用xampp安装集成环境，能够输出hello world
- 了解PHP基本语法
- 语法
- 变量/常量
- 函数定义
- if...else/while循环/for循环
- 字符串
- 数组 (注意：页面中充斥着类似\$a = array();这样的代码，PHP5.6及以后版本，可以使用\$a = [];代替。推荐后者)
- 索引数组
- 关联数组
- 多维数组
- foreach循环
- 更多Array函数
- 类定义 参考PHP手册
- include
- 文件处理 filesystem函数大全

### 小任务

- 使用PHP语法实现快速排序函数
- 熟练掌握PHP基本语法
- 熟练使用PHP数组
- 掌握函数的使用
- 实现一个简单工厂模式的类代码 参考《大话设计模式》第一章
- 理解工厂模式
- 学会PHP的class相关语法

## 入门
如果你已经能熟练运用PHP开发留言板，可跳过本章节

- 什么是web开发，web前端和后端的工作内容
- 所谓的B/S架构
- 前端主要负责HTML+CSS+JavaScript的工作，用户看得见的内容
- 后端主要负责业务逻辑/数据处理
- 当你在浏览器中敲入www.futu5.com，按下回车键，到你看到完整的网页，这过程中发生了什么。
- HTTP协议（cookie是什么 get和post又是什么）
- 域名与IP的关系 本地hosts文件以及dns解析
- web server（常用的web server有apache和nginx）
- 在web开发中，PHP是怎么工作的
- 两种模式 apache + mod_php 和 nginx + php-fpm。（可以先知道名字 细节以后再学习）
- 脚本语言，一次性的
- PHP如何接收前端提交来的数据
- GET/POST 参考：表单
- cookie 参考:cookie
- 文件上传 参考:文件上传
- 接收的数据如何存储
- 数据库基本语法(SELECT/UPDATE/INSERT/DELETE)
- php如何操作mysql 文档参考:mysqli demo参考:demo
- 为什么要进行参数过滤（大概了解下mysql注入是什么，原理是什么）
- 注意乱码问题。（php/js/html文件格式使用utf8，html页面标记charset=utf-8，数据库字段使用utf8，同时注意set names utf8）
- 当用户输入账号密码登陆后，如何保存用户的登录态
- cookie是否可以做到 为什么不用cookie
- session的用法 参考文档:session
- cookie与session有什么区别
- 如果不使用PHP的session函数能否实现类似功能
- $_SERVER及其他超全局变量
- 日期和时间函数
- json
### 小任务

- 实现一个小型博客系统，无需前端样式美化，只要基本的html元素展示即可
- 设计小型博客的数据库（可自由发挥）
- 管理员登陆后可以发布/更新/删除文章，删除留言
- 无需登陆即可在任何文章下留言，每篇文章下面会显示所有的留言

### 进阶
如果你已经理解框架的原理，请跳过本章节

- 学会查询PHP手册，PHP早已内部实现了很多你不知道的函数
- 命令行执行PHP
- 异常
- php的命名空间及自加载技术
- 正则表达式
- php如何使用redis做缓存
- CURL
- 自己手动搭建符合自己行为习惯的开发环境，学会配置apache与nginx，理解php.ini文件，明白php扩展是什么东西，学会自己安装PHP扩展
- php如何使用protobuf github
- 学习一款框架。推荐laravel，codeigniter也可以
- 学习composer
- 理解MVC
- 思考如何实现个简易路由，让程序识别当前url并调用指定的函数处理逻辑。
- 明白模板引擎是什么东西
- linux基本语法
- mysql优化 深入理解索引，熟练掌握explain
- socket(粘包、多包和少包、断包、串包)
- 反射
- swoole

### 小任务

...这个阶段还要我布置任务？

## 跳出php开发这个圈子
共勉

- 高并发架构设计
- mysql/redis多主集群方案
- 服务器运维
- 进程模型
- 异步编程模式
- 开发php扩展