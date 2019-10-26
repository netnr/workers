/*
 * https://github.com/netnr/workers
 * 
 * 2019-10-26
 * netnr
 * 
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

    //返回对象
    let outBody, outStatus = 200, outHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
    }), reqHeaders = new Headers(request.headers);

    try {

        let pathname = new URL(request.url).pathname.split('/');
        let pn1 = pathname[1].toLowerCase();
        let pn2 = (pathname[2] || '').toLowerCase();

        let now = new Date();
        let ip = reqHeaders.get("CF-Connecting-IP");
        let country = reqHeaders.get("CF-IPCountry");

        switch (pn1) {
            case "clock":
                {
                    let timezone = parseInt(pn2);
                    timezone = isNaN(timezone) ? 8 : timezone;

                    var d1 = new Date();
                    var d2 = new Date();
                    d2.setMonth(0);
                    d2.setDate(1);
                    let day_of_year = Math.ceil((d1 - d2) / (24 * 60 * 60 * 1000));
                    let week_number = Math.ceil(day_of_year / 7);

                    day_of_week = now.getDay();

                    outBody = JSON.stringify({
                        week_number,
                        utc_datetime: now.toISOString(),
                        unixtime: now.valueOf(),
                        day_of_year,
                        day_of_week,
                        datetime: new Date(now.valueOf() + timezone * 3600000).toISOString().replace('Z', '').replace('T', ' '),
                        client_ip: ip,
                    });
                }
                break;
            case "ip":
                {
                    outBody = JSON.stringify({ ip, country })
                }
                break;
            case 'svg':
                {
                    let sc = 'x';
                    if (pn2.includes('*')) {
                        sc = '*'
                    }
                    if (pn2.includes('_')) {
                        sc = '_'
                    }

                    let w = parseInt(pn2.split(sc)[0]);
                    w = isNaN(w) ? 200 : w;
                    let h = parseInt(pn2.split(sc)[1]);
                    h = isNaN(h) ? 200 : h;

                    let wh = w + ' ' + sc + ' ' + h;

                    outBody = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><rect width="' + w + '" height="' + h + '" fill="#eee" /><text text-anchor="middle" x="' + Math.ceil(w / 2).toFixed(0) + '" y="' + Math.ceil(h / 2).toFixed(0) + '" style="fill:#aaa;font-weight:bold;font-size:1rem;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">' + wh + '</text></svg>';

                    outHeaders.set('Content-Type', 'image/svg+xml');
                }
                break;
            default:
                outBody = JSON.stringify([
                    {
                        "api": "/clock/8",
                        "name": "获取时钟（UTC），默认东8区，中国，自定义时区：东1~12区、西-1~-12区"
                    },
                    {
                        "api": "/ip",
                        "name": "获取IP及国家"
                    },
                    {
                        "api": "/svg/200x200",
                        "name": "生成占位图，默认200"
                    }
                ]);
                break;
        }
    } catch (err) {
        outBody = JSON.stringify(err.stack) || err;
    }

    return new Response(outBody, {
        status: outStatus,
        headers: outHeaders
    })
}

/**
 * 获取参数主体
 * @param {any} request
 */
async function readRequestBody(request) {
    const { headers } = request
    const contentType = headers.get('content-type')
    if (contentType.includes('application/json')) {
        return await request.json()
    } else if (contentType.includes('application/text')) {
        return await request.text()
    } else if (contentType.includes('text/html')) {
        return await request.text()
    } else if (contentType.includes('form')) {
        const formData = await request.formData()
        let body = {}
        for (let entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }
        return body
    } else {
        let myBlob = await request.blob()
        var objectURL = URL.createObjectURL(myBlob)
        return objectURL
    }
}