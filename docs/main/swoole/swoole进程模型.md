# swoole进程模型

## 进程的基本知识

可以看阮一峰写的一个进程与线程的一个文章[进程与线程的一个简单解释](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)





什么是进程，所谓进程其实就是操作系统中一个正在运行的程序，我们在一个终端当中，通过php，运行一个php文件，这个时候就相当于我们创建了一个进程，这个进程会在系统中驻存，申请属于它自己的内存空间系统资源并且运行相应的程序
   
对于一个进程来说，它的核心内容分为两个部分，一个是它的内存，这个内存是这进程创建之初从系统分配的，它所有创建的变量都会存储在这一片内存环境当中

一个是它的上下文环境我们知道进程是运行在操作系统的，那么对于程序来说，它的运行依赖操作系统分配给它的资源，操作系统的一些状态。
 
在操作系统中可以运行多个进程的，对于一个进程来说，它可以创建自己的子进程，那么当我们在一个进程中创建出若干个子进程的时候那么可以看到如图，子进程和父进程一样，拥有自己的内存空间和上下文环境

![](http://ww1.sinaimg.cn/large/0061MNOzgy1g2acsn7d05j31r00vktdc.jpg)

## 进程与线程的区别

- 进程

1、进程之间不共享任何状态

2、进程的调度由操作系统完成

3、每个进程都有自己独立的内存空间

4、进程间通讯主要是通过信号传递的方式来实现的，实现方式有多种，信号量、管道、事件等，任何一种方式的通讯效率都需要过内核，导致通讯效率比较低

5、由于是独立的内存空间，上下文切换的时候需要保存先调用栈的信息、cpu各寄存器的信息、虚拟内存、以及打开的相关句柄等信息，所以导致上下文进程间切换开销很大，通讯麻烦。

- 线程

1、线程之间共享变量，解决了通讯麻烦的问题对于变量的访问需要锁

2、一个进程可以拥有多个线程，但是其中每个线程会共享父进程像操作系统申请资源，这个包括虚拟内存、文件等，由于是共享资源，所以创建线程所需要的系统资源占用比进程小很多，相应的可创建的线程数量也变得相对多很多。

3、另外在调度方面也是由于内存是共享的，所以上下文切换的时候需要保存的东西就像对少一些，这样一来上下文的切换也变得高效。



## 进程与线程的区别



## swoole进程结构

Swoole的高效不仅仅于底层使用c编写，他的进程结构模型也使其可以高效的处理业务，我们想要深入学习，并且在实际的场景当中使用必须了解，下面我们先看一下结构图

![](http://ww1.sinaimg.cn/large/0061MNOzgy1g2ad3vmlxcj31qs0tcdlz.jpg)

首先先介绍下swoole的这几种进程分别是干什么的

从这些层级的名字，我们先大概说一下，下面这些层级分别是干什么的，做一个详细的说明。

### 1、Master进程：主进程

第一层，Master进程，这个是swoole的主进程,这个进程是用于处理swoole的核心事件驱动的，那么在这个进程当中可以看到它拥有一个MainReactor[线程]以及若干个Reactor[线程]，swoole所有对于事件的监听都会在这些线程中实现，比如来自客户端的连接，信号处理等。

![](http://ww1.sinaimg.cn/large/0061MNOzgy1g2ad6wqvlcj31j00lk422.jpg)

每一个线程都有自己的用途，下面多每个线程有一个了解

- 1.1、MainReactor（主线程）

主线程会负责监听server socket，如果有新的连接accept，主线程会评估每个Reactor线程的连接数量。将此连接分配给连接数最少的reactor线程，做一个负载均衡。


- 1.2 、Reactor线程组
    
Reactor线程负责维护客户端机器的TCP连接、处理网络IO、收发数据完全是异步非阻塞的模式。
    
swoole的主线程在Accept新的连接后，会将这个连接分配给一个固定的Reactor线程，在socket可读时读取数据，并进行协议解析，将请求投递到Worker进程。在socket可写时将数据发送给TCP客户端。

- 1.3、心跳包检测线程（HeartbeatCheck）
  
Swoole配置了心跳检测之后，心跳包线程会在固定时间内对所有之前在线的连接发送检测数据包

- 1.4、UDP收包线程（UdpRecv）
  
接收并且处理客户端udp数据包

### 2、Manger进程：管理进程

Swoole想要实现最好的性能必须创建出多个工作进程帮助处理任务，但Worker进程就必须fork操作，但是fork操作是不安全的，如果没有管理会出现很多的僵尸进程，进而影响服务器性能，同时worker进程被误杀或者由于程序的原因会异常退出，为了保证服务的稳定性，需要重新创建worker进程

Swoole在运行中会创建一个单独的管理进程，所有的worker进程和task进程都是从管理进程Fork出来的。管理进程会监视所有子进程的退出事件，当worker进程发生致命错误或者运行生命周期结束时，管理进程会回收此进程，并创建新的进程。换句话也就是说，对于worker、task进程的创建、回收等操作全权有“保姆”Manager进程进行管理。

 
再来一张图梳理下Manager进程和Worker/Task进程的关系。

![](http://ww1.sinaimg.cn/large/0061MNOzgy1g2adpzuu6yj31nc0i8jul.jpg)

### 3、Worker进程：工作进程

worker 进程属于swoole的主逻辑进程，用户处理客户端的一系列请求，接受由Reactor线程投递的请求数据包，并执行PHP回调函数处理数据生成响应数据并发给Reactor线程，由Reactor线程发送给TCP客户端可以是异步非阻塞模式，也可以是同步阻塞模式

### 4、Task进程：异步任务工作进程

taskWorker进程这一进城是swoole提供的异步工作进程，这些进程主要用于处理一些耗时较长的同步任务，在worker进程当中投递过来。


## 进程查看及流程梳理

当启动一个Swoole应用时，一共会创建2 + n + m个进程，2为一个Master进程和一个Manager进程，其中n为Worker进程数。m为TaskWorker进程数。
 
默认如果不设置，swoole底层会根据当前机器有多少CPU核数，启动对应数量的Reactor线程和Worker进程。我机器为1核的。Worker为1。

所以现在默认我启动了1个Master进程，1个Manager进程，和1个worker进程，TaskWorker没有设置也就是为0，当前server会产生3个进程。

在启动了server之后，在命令行查看当前产生的进程

![](http://ww1.sinaimg.cn/large/0061MNOzgy1g2adwpn2taj31p40c40xn.jpg)

这三个进程中，所有进程的根进程，也就是例子中的2123进程，就是所谓的Master进程；而2212进程，则是Manager进程；最后的2321进程，是Worker进程。


- client跟server的交互：

    - 1、client请求到达 Main Reactor,Client实际上是与Master进程中的某个Reactor线程发生了连接。

    - 2、Main Reactor根据Reactor的情况，将请求注册给对应的Reactor (每个Reactor都有epoll。用来监听客户端的变化) 

    - 3、客户端有变化时Reactor将数据交给worker来处理

    - 4、worker处理完毕，通过进程间通信(比如管道、共享内存、消息队列)发给对应的reactor。 

    - 5、reactor将响应结果发给相应的连接请求处理完成

示意图：

![](http://ww1.sinaimg.cn/large/0061MNOzgy1g2aebyehjxj31p80sw435.jpg)


## 进程及其相对应的事件绑定

大概了解下，后面会相应的触发这些事件

### Master进程内的回调函数

- onStart   Server启动在主进程的主线程回调此函数

- onShutdown  此事件在Server正常结束时发生

### Manager进程内的回调函数

- onManagerStart 当管理进程启动时调用它

- onManagerStop  当管理进程结束时调用它

- onWorkerError  当worker/task_worker进程发生异常后会在Manager进程内回调此函数

### Worker进程内的回调函数

- onWorkerStart  此事件在Worker进程/Task进程启动时发生

- onWorkerStop    此事件在worker进程终止时发生。

- onConnect   有新的连接进入时，在worker进程中回调

- onClose   TCP客户端连接关闭后，在worker进程中回调此函数

- onReceive 接收到数据时回调此函数，发生在worker进程中

- onPacket 接收到UDP数据包时回调此函数，发生在worker进程中

- onFinish  当worker进程投递的任务在task_worker中完成时，task进程会通过finish()方法将任务处理的结果发送给worker进程。

- onWorkerExit  仅在开启reload_async特性后有效。异步重启特性

- onPipeMessage  当工作进程收到由 sendMessage 发送的管道消息时会触发事件

###  Task进程内的回调函数

- onTask   在task_worker进程内被调用。worker进程可以使用swoole_server_task函数向task_worker进程投递新的任务

- onWorkerStart  此事件在Worker进程/Task进程启动时发生

- onPipeMessage  当工作进程收到由 sendMessage 发送的管道消息时会触发事件

### 简单说明：

- 1、服务器关闭程序终止时最后一次事件是onShutdown。

- 2、服务器启动成功后，onStart/onManagerStart/onWorkerStart会在不同的进程内并发执
行，并不是顺序的。

- 3、所有事件回调均在$server->start后发生，start之后写的代码是无效代码。

- 4、onStart/onManagerStart/onWorkerStart 3个事件的执行顺序是不确定的
Swoole的Reactor、Worker、TaskWorker之间可以紧密的结合起来，提供更高级的使用方式。

一个更通俗的比喻，假设Server就是一个工厂，那Reactor就是销售，接受客户订单。而Worker就是工人，当销售接到订单后，Worker去工作生产出客户要的东西。而TaskWorker可以理解为行政人员，可以帮助Worker干些杂事，让Worker专心工作。


## 守护进程、信号和平滑重启

### 守护进程

我们现在开启的server，不管我们程序写的多么精彩，都没有办法把项目应用到实际业务中，只要把运行server的终端关闭之后，server也就不复存在了。

守护进程（daemon）就是一种长期生存的进程，它不受终端的控制，可以在后台运行。其实我们之前也有了解，比如说nginx，fpm等一般都是作为守护进程在后台提供服务

Swoole实现守护进程

```php
$serv->set([
    'worker_num'=>1,//设置进程
    'daemonize'=>true,//启用守护进程
    'log_file'=>__DIR__.'/server.log'
]);
```

启用守护进程后，server内所有的标准输出都会被丢弃，这样的话我们也就无法跟踪进程在运行过程中是否异常之类的错误信息了。一般会配合log_file我们可以指定日志路径，这样swoole在运行时就会把所有的标准输出统统记载到该文件内。


### 4.2swoole运行模式及热重启

Swoole之所以性能卓越，是因为Swoole减少了每一次请求加载PHP文件以及初始化的开销。但是这种优势也导致开发者无法像过去一样，修改PHP文件，重新请求，就能获取到新代码的运行结果（具体看另外的课程文档）。如果需要新代码开始执行，往往需要先关闭服务器然后重启，这样才能使得新文件被加载进内存运行，这样很明显不能满足开发者的需求。幸运的是，Swoole 提供了这样的功能。
     
具体场景：
 
如果是上线的项目，一台繁忙的后端服务器随时都在处理请求，如果管理员通过kill进程方式来终止/重启服务器程序，可能导致刚好代码执行到一半终止。

这种情况下会产生数据的不一致。如交易系统中，支付逻辑的下一段是发货，假设在支付逻辑之后进程被终止了。会导致用户支付了货币，但并没有发货，后果非常严重。

- 如何解决

这个时候我们需要考虑如何平滑重启server的问题了。所谓的平滑重启，也叫“热重启”，就是在不影响用户的情况下重启服务，更新内存中已经加载的php程序代码，从而达到对业务逻辑的更新。

swoole为我们提供了平滑重启机制，我们只需要向swoole_server的主进程发送特定的信号，即可完成对server的重启。

- 那什么是信号

信号的名字都以“SIG”开头，比如我们最熟悉的Ctrl+C就是一个名字叫“SIGINT”的信号，意味着“终端中断”。

在swoole中，我们可以向主进程发送各种不同的信号，主进程根据接收到的信号类型做出不同的处理。比如下面这几个

- 1、kill -SIGTERM|-15 master_pid  终止Swoole程序,一种优雅的终止信号，会待进程执行完当前程序之后中断，而不是直接干掉进程

- 2、kill -USR1|-10  master_pid  重启所有的Worker进程

- 3、kill -USR2|-12  master_pid   重启所有的Task Worker进程 

当USR1信号被发送给Master进程后，Master进程会将同样的信号通过Manager进程转发Worker进程，收到此信号的Worker进程会在处理完正在执行的逻辑之后，释放进程内存，关闭自己，然后由Manager进程重启一个新的Worker进程。新的Worker进程会占用新的内存空间。

注意事项：

- 1、更新仅仅只是针对worker进程，也就是写在master进程跟manger进程当中更新代码并不生效，也就是说只有在onWorkerStart回调之后加载的文件，重启才有意义。在Worker进程启动之前就已经加载到内存中的文件，如果想让它重新生效，只能关闭server再重启。

- 2、直接写在worker代码当中的逻辑是不会生效的，就算发送了信号也不会，需要通过include方式引入相关的业务逻辑代码才会生效


### 4.3实际操作

- 1、首先，我们需要在程序中注册自动加载函数，通过这些自动加载函数实现逻辑文件的更新。

- 2、其次，我们需要保存服务的Master进程的进程号在目录下创建一个server.pid文件来保存，并在需要重新加载新文件的时候，向Master进程发送USR1信号。当Worker进程重启后，之前加载过的文件就从内存中移除，下一次请求时就会重新加载新的文件。

注意：

- 1、OnWorkerStart之后加载的代码都在各自进程中，OnWorkerStart之前加载的代码属于共享内存。

- 2、可以将公用的，不易变的php文件放置到onWorkerStart之前。这样虽然不能重载入代码，但所有worker是共享的，不需要额外的内存来保存这些数据。onWorkerStart之后的代码每个worker都需要在内存中保存一份


  


