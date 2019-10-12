/*
 * https://github.com/netnr/workers
 * 
 * 2019-10-12
 * netnr
 */


addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

    //取域名第一个斜杠后的所有信息为代理链接
    let url = request.url.substr(8);
    url = url.substr(url.indexOf('/') + 1);

    //返回对象
    var response;

    //需要忽略的代理
    if (request.method == "OPTIONS" || url.length < 3 || url.indexOf('.') == -1 || url == "favicon.ico" || url == "robots.txt") {
        //输出提示
        var htm = [];
        htm.push("Usage：Host/{URL}");

        response = new Response(htm.join('\n\n'), { status: 200 });
    } else {

        //补上前缀 http://
        if (url.toLowerCase().indexOf("http") == -1) {
            url = "http://" + url;
        }

        //发起 fetch
        response = await fetch(url, {
            method: request.method,
            headers: request.headers
        });
    }

    //添加跨域头
    var myHeaders = new Headers(response.headers);
    myHeaders.set("Access-Control-Allow-Origin", "*");
    myHeaders.set("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    myHeaders.set("Access-Control-Allow-Headers", "*");

    return response;

    // return new Response('OK', { status: 200 })
}