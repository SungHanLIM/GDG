function logCar(logMsg, callback){
  process.nextTick(function() {
    callback(logMsg);
  });
}
var cars = ["Ferrari", "Porsche", "Bugatti"];
for (var idx in cars){
  var message = "Saw a " + cars[idx];
  console.log("1");
  logCar(message, function(){
	console.log("2");
    console.log("Normal Callback: " + message);
  });
}
for (var idx in cars){
  var message = "Saw a " + cars[idx];
  // 클로저 래퍼(wrapper) 함수를 추가해 필요한 변수에 비동기 접근을 허용하는 방법을 보여준다.
  // 여기서는(function(msg)가 클로저 래퍼
  (function(msg){
    logCar(msg, function(){
      console.log("Closure Callback: " + msg);
    });
  })(message);
}
