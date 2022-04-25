[English](README.md) | 简体中文

> ## 注意：阻断大量请求，请自己部署

---

## 🧡 cors (Cloudflare Workers)
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
支持HTTPS（解决远程数据接口不支持HTTPS）

### 使用
- `https://cors.eu.org/{URL}`
- 示例
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/http://nginx.org/download/nginx-1.20.2.tar.gz>

```js
// 拷贝到控制台运行
var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch("https://cors.eu.org/" + $url).then(x => x.text()).then(console.log)
```

### 部署

> 两种方法的工作原理一致

#### wrangler
- clone 项目，进入 cors 目录
- 编辑 `index.js` 和 `wrangler.toml` (配置密钥)
- `wrangler config` 配置邮箱、密钥
- `wrangler build` 构建
- `wrangler publish` 发布
- 详细文档：<https://developers.cloudflare.com/workers/quickstart>

#### Cloudflare 仪表板
- 转到 [Cloudflare 仪表板](https://dash.cloudflare.com)，然后切换到 `Workers` 标签
- `创建服务`
- `快速编缉`
- 清空编辑器
- 复制 [`cors/index.js`](cors/index.js) 中的代码到编辑器 (如果不需要日志，也可以使用 [`pages/_worker.js`](pages/_worker.js))
- 如有需要，编缉配置
- `保存并部署`

### 套餐
 CPU | 日请求 | 突发速率 | 脚本大小 
 ---- | ---- | ---- | ---- 
 10ms | 100,000 | 10分钟1000个请求 | 压缩后1M

详情：https://developers.cloudflare.com/workers/about/limits/

额度顶不住了，使用量大请用自己的账号搭建服务吧，谢谢！！！  
![溢出](https://s1.netnr.eu.org/2019/11/03/0752457693.png)

---

## 🧡 pages (Cloudflare Pages Functions )
### 使用
- `https://seep.eu.org/{URL}`
- 示例
- <https://seep.eu.org/https://api.github.com>

### 部署
```
npm install wrangler@beta # 安装
npx wrangler pages dev --help # 查看帮助（nodejs version >= 16.x）
npx wrangler pages dev ./ # 进入 pages 目录运行
```
详细文档：<https://developers.cloudflare.com/pages/platform/functions>

### 套餐
每天的调用请求总数上限为 100,000。如果达到每日限制，Pages 将停止执行函数并回退到仅提供静态资源。

---

## Source
- <https://github.com/netnr/workers>