/*
 * https://github.com/netnr/workers
 * 
 * 2019-10-15
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

  if (url == "") {
    response = new Response('Host/{name}/{repos}/{branch}/{path}', {
      status: 200,
      headers: {
        "Content-Type": "text/html"
      }
    })
  } else {
    url = "https://raw.githubusercontent.com/" + url;
    response = await fetch(url);
  }

  //添加跨域头
  var myHeaders = new Headers(response.headers);
  myHeaders.set("Access-Control-Allow-Origin", "*");

  //调整Content-Type
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(), ct;
  switch (ext) {
    case "svg":
      ct = "image/svg+xml";
      break;
    case "js":
      ct = "application/javascript";
      break;
    case "css":
      ct = "text/css"
      break;
  }
  if (ct) {
    myHeaders.set("Content-Type", ct);
  }

  return new Response(response.body, {
    status: response.status,
    headers: myHeaders
  })

  // return new Response('OK', { status: 200 })
}