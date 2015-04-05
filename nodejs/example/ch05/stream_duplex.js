var stream = require('stream');
var util = require('util');
// Duplexer클래스는 Duplex를 상속받음
util.inherits(Duplexer, stream.Duplex);
function Duplexer(opt) {
  stream.Duplex.call(this, opt);
  this.data = [];
}
Duplexer.prototype._read = function readItem(size) {
// 배열의 처음 아이탬 접근을 위해 shift() 사용
  var chunk = this.data.shift();
  if (chunk == "stop"){
    this.push(null);
  } else{
    if(chunk){
      this.push(chunk);
    } else {
      setTimeout(readItem.bind(this), 500, size);
    }
  }
};
// 객체의 배열 데이터를 저장을 위한 기본 _write() 함수를 구현
Duplexer.prototype._write = function(data, encoding, callback) {
  this.data.push(data);
  callback();
};

var d = new Duplexer();
// .on(envetName, callback) : 객체 리스너에 콜백 함수를 추가한다.
d.on('data', function(chunk){
  console.log('read: ', chunk.toString());
});
d.on('end', function(){
  console.log('Message Complete');
});
d.write("I think, ");
d.write("therefore ");
d.write("I am.");
d.write("Rene Descartes");
d.write("stop");