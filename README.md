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
- <https://developers.cloudflare.com/workers/quickstart>

### Source
- <https://github.com/netnr/workers>