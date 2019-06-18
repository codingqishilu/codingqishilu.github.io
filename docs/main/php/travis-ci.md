# 使用 Travis-CI 做自动化测试

这里推荐一个好工具：Travis-CI，它是一个 持续集成系统（Continuous Integration），如果你用过 Jenkins 或者 GitLab CI，那它们就是同一类东西。你可以将你的开源项目注册到该平台，它会自动在 GitHub 创建对应的服务钩子，当你在 GitHub 推送代码或者发布版本的时候，自动触发你在该平台定制的任务，任务基于一个 Yaml 格式的文档来配置。

我们将代码通过 Git Push 到 GitHub，GitHub 通过 WEBHOOK 通知 Travis CI 发起构建任务，这里的构建任务不一定是测试，还可以是部署到生产环境等其它可以高度自定义的任务

官网请戳[ https://travis-ci.org/ ]( https://travis-ci.org/ )
