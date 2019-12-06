module.exports = {
  title: '扣丁启示录', // 设置网站标题
  description: '值得经常阅读的笔记以及总结', //描述
  dest: './dist',   // 设置输出目录
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '专业', link: '/main/' },
      { text: '第二技能', link: '/second/' },
      { text: '阅读', link: '/readporn/' },
      { text: '自说自话', link: '/zishuozihua/' },
      { text: '远程', link: '/remote/' },
      { text: '关于我', link: 'https://github.com/shisiying' },

    ],
    // 为以下路由添加侧边栏
    sidebar:{
      '/homepage/':[
      ],
      '/main/': [
        {
          title: '中高级招聘要求',
          collapsable: true,
          children: [
            'job/php中高级要求',
          ]
        },
        {
          title: '算法与数据结构',
          collapsable: true,
          children: [
            'dataStructAndAlgo/leetcode',
            'dataStructAndAlgo/offer',
            'dataStructAndAlgo/dataStruct'

          ]
        },
        {
          title: '计算机网络',
          collapsable: true,
          children: [
          ]
        },
        {
          title: 'PHP',
          collapsable: true,
          children: [
            'php/howtolearn',
            'php/phparchitects',
            'php/kickpeach',
            'php/travis-ci',
            'php/php-cs-fixer',
            'php/walle',
            'php/sourceandext',
            'php/laravel-tdd-forums',
            'php/xdebug',
            'php/phpunit'
          ]
        },
        {
          title: 'Javascript',
          collapsable: true,
          children: [
            'js/朱邦邦的JavaScript学习笔记 ',
            'js/学习vue之前的前置js基础'
          ]
        },
        {
          title: '设计模式',
          collapsable: true,
          children: [
              'pattern/headfirst',
          ]
        },
        {
          title: 'MySQL',
          collapsable: true,
          children: [
          ]
        },
        {
          title: 'NoSQL',
          collapsable: true,
          children: [
          ]
        },
        {
          title: 'Linux',
          collapsable: true,
          children: [
              'linux/PHPer必知必会的Linux命令'
          ]
        },
        {
          title: 'Docker',
          collapsable: true,
          children: [
              'docker/drone-gitflow-kubernetes-for-cloud-native-ci',
              'docker/containerEcosystem'
          ]
        },
        {
          title: 'C',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '优化',
          collapsable: true,
          children: [
              'optimize/mysqlOptimize',
              'optimize/nosqlOptimize',
              'optimize/codeOptimize',
              'optimize/serverOptimize',
          ]
        },
        {
          title: '框架内核',
          collapsable: true,
          children: [
              'framework/laravel',
              'framework/kickpeach'
          ]
        },
        {
          title: 'API',
          collapsable: true,
          children: [
            'framework/laravel'
          ]
        },
        {
          title: 'Swoole',
          collapsable: true,
          children: [
            'swoole/swoole-learn-cource',
          ]
        },
        {
          title: '架构',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '开源小项目',
          collapsable: true,
          children: [
            'component/webim',
            'component/mdcalls',
            'component/database',
            'component/queue',
          ]
        },
        {
          title: 'Go',
          collapsable: true,
          children: [
              'go/使用docker搭建go开发环境'
          ]
        },
        {
          title: 'Vue',
          collapsable: true,
          children: [
              'vue/laravel-vue'
          ]
        },
      ],
      '/second/':[
        {
          title: '产品',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '英语',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '理财',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '后期',
          collapsable: true,
          children: [
              'houqi/B站视频制作教程推荐'
          ]
        },
        {
          title: '数据分析',
          collapsable: true,
          children: [
              'data/有关数据采集分析挖掘的博客'
          ]
        },
        {
          title: '考研',
          collapsable: true,
          children: [
              'kaoyan/kaoyanAdvice'
          ]
        },
        {
          title: '诗词',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '潮汕文化',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '日本文化',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '量化交易',
          collapsable: true,
          children: [
          ]
        },
      ],
      '/readporn/':[
        {
          title: 'v2ex',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '星球',
          collapsable: true,
          children: [
              'star/zhang'
          ]
        },
        {
          title: '微博',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '微信公众号',
          collapsable: true,
          children: [
          ]
        },
        {
          title: 'youtube',
          collapsable: true,
          children: [
              'youtube/hackBrain'
          ]
        },
      ],
    }
  }
}