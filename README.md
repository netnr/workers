# Cloudflare Workers

### 作用
- 支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch
- 支持HTTPS（解决远程数据接口不支持HTTPS）

### 接口
- `Host/{URL}`
- `https://cors.zme.ink/{URL}`

### 示例
- <https://cors.zme.ink/https://api.github.com>
- <https://cors.zme.ink/http://nginx.org/download/nginx-1.16.1.tar.gz>

```js
// 拷贝到控制台运行
var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch("https://cors.zme.ink/" + $url).then(x => x.text()).then(console.log)
```

### 安装
- 文档：<https://developers.cloudflare.com/workers/quickstart>
- clone 项目
- 编辑 `index.js` 和 `wrangler.toml` (配置密钥)
- `wrangler build` 构建
- `wrangler publish` 发布

### 套餐
- 每天 10 万个请求（UTC + 0）
- 每 10 分钟 1000 个请求
- 每个请求最多10ms CPU时间
- 首次请求后的最低延迟

### Source
- <https://github.com/netnr/workers>