var events = require('events');
function CarShow() {
  events.EventEmitter.call(this);
  this.seeCar = function(make){
  // sawCar : 이벤트 핸들러, make : 전달인자
    this.emit('sawCar', make);
  };
}
CarShow.prototype.__proto__ = events.EventEmitter.prototype;
var show = new CarShow();
function logCar(make){
  console.log("Saw a " + make);
}
function logColorCar(make, color){
  console.log("Saw a %s %s", color, make);
}
// logCar(make) 콜백 핸들러 등록
show.on("sawCar", logCar);
show.on("sawCar", function(make){
  var colors = ['red', 'blue', 'black'];
  var color = colors[Math.floor(Math.random()*3)];
  logColorCar(make, color);
});
show.seeCar("Ferrari");
show.seeCar("Porsche");
show.seeCar("Bugatti");
show.seeCar("Lamborghini");
show.seeCar("Aston Martin");