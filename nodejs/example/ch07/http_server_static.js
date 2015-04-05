/*
	(1) http_server_static.js 실행
	-> server 생성 후 html폴더에서 html파일로 작성되어있는 hello.html 문서를 읽는다.
	(2) server 객체의 listen() 호출을 통해 8080 포트를 수신하도록 설정함.
	(3) http_client_static.js 실행
	-> 8080 포트로 서버에게 hello.html "요청"
	(4) 서버는 "요청"을 받고 "응답"으로 hello.html 내용 전송 
	(5) 서버로부터 받은 Data를 읽고 출력
*/

var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);



var options = {
    hostname: 'localhost',
    port: '8080',
    path: '/hello.html'
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    console.log(serverData);
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end();