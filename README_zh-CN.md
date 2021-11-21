[English](README.md) | 简体中文

## ❤ cors (Cloudflare Workers)
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
支持HTTPS（解决远程数据接口不支持HTTPS）

### 接口
- `Host/{URL}`
- `https://cors.eu.org/{URL}`

### 示例
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/http://nginx.org/download/nginx-1.16.1.tar.gz>

```js
// 拷贝到控制台运行
var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch("https://cors.eu.org/" + $url).then(x => x.text()).then(console.log)
```

### 安装
- clone 项目，进入子目录（代表一个 worker）
- 编辑 `index.js` 和 `wrangler.toml` (配置密钥)
- `wrangler config` 配置邮箱、密钥
- `wrangler build` 构建
- `wrangler publish` 发布
- 详细文档：<https://developers.cloudflare.com/workers/quickstart>

### 套餐
 CPU | 日请求 | 突发速率 | 脚本大小 
 ---- | ---- | ---- | ---- 
 10ms | 100,000 | 10分钟1000个请求 | 压缩后1M

详情：https://developers.cloudflare.com/workers/about/limits/

### Source
- <https://github.com/netnr/workers>

---

### 通知

额度顶不住了，使用量大请用自己的账号搭建服务吧，谢谢！！！

![溢出](https://s1.netnr.eu.org/2019/11/03/0752457693.png)