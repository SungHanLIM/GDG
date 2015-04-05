// Answers() 클래스는 Readable을 상속받고
// Answers.prototype._read() 함수를 구현해 데이터를 추출한다.
var stream = require('stream');
var util = require('util');
util.inherits(Answers, stream.Readable);
function Answers(opt) {
  stream.Readable.call(this, opt);
  this.quotes = ["yes", "no", "maybe"];
  this._index = 0;
}
Answers.prototype._read = function() {
  if (this._index > this.quotes.length){
    this.push(null);
  } else {
    this.push(this.quotes[this._index]);
    this._index += 1;
  }
};



// 직접 read() 호출을 통해 스트림의 처음 아이템을 읽은 후
var r = new Answers();
console.log("Direct read: " + r.read().toString());
// data 이벤트 핸들러를 통해 남은 아이템을 읽는다.
// data 이벤트 핸들러 : 남아있는 데이터가 없을 때까지 지속적으로 호출된다.
r.on('data', function(data){
  console.log("Callback read: " + data.toString());
});

// end 이벤트 핸들러 : 스트림에 데이터가 더 이상 제공되지 않을 때 생성된다.
r.on('end', function(data){
  console.log("No more answers.");
  //console.log(Answers.prototype._read);
});


