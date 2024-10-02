/*
 * https://github.com/netnr/workers
 *
 * 2019-10-12 - 2024-10-02
 * netnr
 */

export default {
    async fetch(request, _env, ctx) {
        //请求头部、返回对象
        let reqHeaders = new Headers(request.headers),
            outBody, outStatus = 200, outStatusText = 'OK', outCt = null, outHeaders = new Headers({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": reqHeaders.get('Access-Control-Allow-Headers') || "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token"
            });

        try {
            //取域名第一个斜杠后的所有信息为代理链接
            let url = request.url.substr(8);
            url = decodeURIComponent(url.substr(url.indexOf('/') + 1));

            //需要忽略的代理
            if (request.method == "OPTIONS" || url.length < 3 || url.indexOf('.') == -1 || url == "favicon.ico" || url == "robots.txt") {
                //输出提示
                const invalid = !(request.method == "OPTIONS" || url.length === 0)
                outBody = JSON.stringify({
                    code: invalid ? 400 : 0,
                    usage: 'Host/{URL}',
                    source: 'https://github.com/netnr/workers',
                    note: 'Blocking a large number of requests, please deploy it yourself'
                });
                outCt = "application/json";
                outStatus = invalid ? 400 : 200;
            }
            else {
                url = fixUrl(url);

                //构建 fetch 参数
                let fp = {
                    method: request.method,
                    headers: {}
                }

                // 丢弃的头部信息 如 referer
                const dropHeaders = ['content-length', 'content-type', 'host'];
                let he = reqHeaders.entries();
                for (let h of he) {
                    const key = h[0], value = h[1];
                    if (!dropHeaders.includes(key)) {
                        fp.headers[key] = value;
                    }
                }

                // 是否带 body
                if (["POST", "PUT", "PATCH", "DELETE"].indexOf(request.method) >= 0) {
                    const ct = (reqHeaders.get('content-type') || "").toLowerCase();
                    if (ct.includes('application/json')) {
                        fp.body = JSON.stringify(await request.json());
                    } else if (ct.includes('application/text') || ct.includes('text/html')) {
                        fp.body = await request.text();
                    } else if (ct.includes('form')) {
                        fp.body = await request.formData();
                    } else {
                        fp.body = await request.blob();
                    }
                }

                // 发起 fetch
                let fr = await fetch(url, fp);
                outCt = fr.headers.get('content-type');
                outStatus = fr.status;
                outStatusText = fr.statusText;
                outBody = fr.body;
            }
        } catch (err) {
            outCt = "application/json";
            outBody = JSON.stringify({
                code: -1,
                msg: JSON.stringify(err.stack) || err
            });
            outStatus = 500;
        }

        //设置类型
        if (outCt && outCt != "") {
            outHeaders.set("content-type", outCt);
        }

        let response = new Response(outBody, {
            status: outStatus,
            statusText: outStatusText,
            headers: outHeaders
        })

        //日志接口
        logStack.add(ctx, request, response);

        return response;
        // return new Response('OK', { status: 200 })
    }
};

// 补齐 url
function fixUrl(url) {
    if (url.includes("://")) {
        return url;
    } else if (url.includes(':/')) {
        return url.replace(':/', '://');
    } else {
        return "http://" + url;
    }
}

/**
* 日志
*/
const logStack = {
    // Set your UUID https://www.loggly.com/
    ts_UUID: "",

    /**
     * 构建发送主体
     * @param {any} request
     * @param {any} response
     */
    buildBody: (request, response) => {
        const hua = request.headers.get("user-agent")
        const hip = request.headers.get("cf-connecting-ip")
        const hrf = request.headers.get("referer")
        const url = new URL(request.url)

        const body = {
            method: request.method,
            statusCode: response.status,
            clientIp: hip,
            referer: hrf,
            userAgent: hua,
            host: url.host,
            path: url.pathname,
            proxyHost: null,
        }

        if (body.path.includes(".") && body.path != "/" && !body.path.includes("favicon.ico")) {
            try {
                let purl = fixUrl(decodeURIComponent(body.path.substring(1)));

                body.path = purl;
                body.proxyHost = new URL(purl).host;
            } catch { }
        }

        return body;
    },

    /**
     * 添加
     * @param {any} ctx
     * @param {any} request
     * @param {any} response
     */
    add: (ctx, request, response) => {
        if (logStack.ts_UUID.length) {
            ctx.waitUntil(fetch(`http://logs-01.loggly.com/inputs/${logStack.ts_UUID}/tag/http/`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(logStack.buildBody(request, response)),
            }));
        }
    }
};