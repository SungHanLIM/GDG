// 스트림은 JSON 문자열을 받아서 객체로 변환 후 
// object라는 이벤트를 생성한다.

// 상속 및 객체 JSONObjectStream 생성
var stream = require("stream");
var util = require("util");
util.inherits(JSONObjectStream, stream.Transform);
function JSONObjectStream (opt) {
  stream.Transform.call(this, opt);
};

// _transform() 함수는 객체에 handled 속성을 추가하고 문자열 형태로 보낸다.
JSONObjectStream.prototype._transform = function (data, encoding, callback) {
  object = data ? JSON.parse(data.toString()) : "";
  this.emit("object", object);
  object.handled = true;
  this.push(JSON.stringify(object));
  callback();
};
JSONObjectStream.prototype._flush = function(cb) {
  cb();
};

// 특정 값들을 표시하는 object 이벤트 핸들러 함수 구현
var tc = new JSONObjectStream();
tc.on("object", function(object){
  console.log("Name: %s", object.name);
  console.log("Color: %s", object.color);
});
tc.on("data", function(data){
  console.log("Data: %s", data.toString());
});
tc.write('{"name":"Carolinus", "color": "Green"}');
tc.write('{"name":"Solarius", "color": "Blue"}');
tc.write('{"name":"Lo Tae Zhao", "color": "Gold"}');
tc.write('{"name":"Ommadon", "color": "Red"}');