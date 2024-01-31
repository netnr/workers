> ### 阻断大量请求，WAF 已屏蔽关键字 .m3u8 .ts .m4 .acc .tv tv. .live .stream 等（动态调整）
To block a large number of requests, WAF has blocked keywords .m3u8 .ts .m4 .acc .tv tv. .live .stream, etc. (dynamic adjustment)

> ### 2024-01-31 不受限制的代理服务请使用 https://seep.eu.org 
2024-01-31 For unrestricted proxy service please use https://seep.eu.org


# 🧡 cors (Cloudflare Workers)
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
Support cross-domain request  

支持 HTTPS (解决远程数据接口不支持 HTTPS )  
Convert HTTP to HTTPS

### 使用 Usage
- `https://cors.eu.org/{URL}`
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/http://nginx.org/download/nginx-1.20.2.tar.gz>

```js
// 拷贝到控制台运行 Copy to the console and run
var url = "http://nginx.org/en/CHANGES";
await (await fetch(`https://cors.eu.org/${url}`)).text();
```

### 套餐 Price
https://developers.cloudflare.com/workers/about/limits/

额度顶不住了，使用量大请用自己的账号搭建服务吧，谢谢！！！  
The amount can't hold up, please use your account to build the service if you use a lot, thank you! ! !  
![溢出](https://gs.zme.ink/2019/11/03/0752457693.png)


# 🧡 pages (Cloudflare Pages Functions )
### FAQ
Cloudflare Pages Functions access to pure http will have a certificate error Invalid SSL certificate `Error code 526`

https://developers.cloudflare.com/pages/platform/functions


# Source
<https://github.com/netnr/workers>