[English](README.md) | 简体中文

> ### 阻断大量请求，请自己部署，WAF 已屏蔽关键字 .m3u8 .ts .m4 .acc .tv tv. .live .stream 等（根据日志动态调整）
> ### 2024-01-31 不受限制的代理服务请使用 https://seep.eu.org 

## 🧡 cors (Cloudflare Workers)
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
支持 HTTPS (解决远程数据接口不支持 HTTPS )

### 使用
- `https://cors.eu.org/{URL}`
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/http://nginx.org/download/nginx-1.20.2.tar.gz>

```js
// 拷贝到控制台运行
var url = "nginx.org/en/CHANGES";
await (await fetch(`https://cors.eu.org/${url}`)).text();
```

### 套餐
CPU | 日请求 | 突发速率 | 脚本大小 
--- | --- | --- | --- 
10ms | 100,000 | 10 分钟 1000 个请求 | 压缩后 1M

详情：https://developers.cloudflare.com/workers/about/limits/

额度顶不住了，使用量大请用自己的账号搭建服务吧，谢谢！！！  
![溢出](https://gs.zme.ink/2019/11/03/0752457693.png)

## 🧡 pages (Cloudflare Pages Functions )
### FAQ
Cloudflare Pages Functions 访问纯 http 会证书错误 Invalid SSL certificate `Error code 526`  

详细文档：<https://developers.cloudflare.com/pages/platform/functions>

## Source
- <https://github.com/netnr/workers>