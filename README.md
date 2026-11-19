> ### 阻断大量请求，WAF 已屏蔽关键字 .m3u8 .ts .m4s .mpd 等（动态调整）
To block a large number of requests, WAF has blocked keywords .m3u8 .ts .m4s .mpd, etc. (dynamic adjustment)

> ### 2024-01-31 不限请求次数使用：https://seep.eu.org 
Unlimited number of requests Use: https://seep.eu.org

### 🧡 cors.js
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
Support cross-domain request  

支持 HTTPS (解决远程数据接口不支持 HTTPS )  
Convert HTTP to HTTPS

#### 使用 Usage
- `https://cors.eu.org/{URL}`
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/https://nginx.org/download/nginx-1.31.9.zip>
- logs https://cors.eu.org/loggly

```js
// 拷贝到控制台运行 Copy to the console and run
let url = "http://nginx.org/en/CHANGES";
await (await fetch(`https://cors.eu.org/${url}`)).text();
```

#### 开发 Dev
- 安装依赖 / Install dependencies: `npm install`
- 本地调试 / Local dev: `npm run dev`
- 发布部署 / Deploy: `npm run prod`
- 文档 / Docs: https://developers.cloudflare.com/workers/get-started/guide/
- `wrangler.jsonc` `vars.logglyCustomerToken` Loggly / Source Setup / Customer Token
- `wwwroot/loggly.js` `CONFIG.apiToken`：Loggly / Settings / API Token

### Source
<https://github.com/netnr/workers>