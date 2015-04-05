function logCar(car, callback){
  console.log("Saw a %s", car);
  // cars.length가 끝나면 process.nextTick()을 실행하고 callback()을 수행해라
  if(cars.length){
    process.nextTick(function(){
      callback();
    });
  }
}
function logCars(cars){
  var car = cars.pop();
  logCar(car, function(){
    logCars(cars);
  });
}
var cars = ["Ferrari", "Porsche", "Bugatti", 
            "Lamborghini", "Aston Martin"];
logCars(cars);