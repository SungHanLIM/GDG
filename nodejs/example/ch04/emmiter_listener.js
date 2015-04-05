var events = require('events');
function Account() {
  this.balance = 0;
  // Account 객체는 EventEmitter 클래스를 상속받음
  // balanceChanged 이벤트를 내보내는 두 함수 deposit과 withdraw
  events.EventEmitter.call(this);
  this.deposit = function(amount){
    this.balance += amount;
    this.emit('balanceChanged');
  };
  this.withdraw = function(amount){
    this.balance -= amount;
    this.emit('balanceChanged');
  };
}
// Account 객체 인스턴스의 balanceChanged 이벤트에 추가돼
// 다양한 형식의 데이터를 보여주는 3개의 콜백함수 구현부
Account.prototype.__proto__ = events.EventEmitter.prototype;
function displayBalance(){
  console.log("Account balance: $%d", this.balance);
}
function checkOverdraw(){
  if (this.balance < 0){
    console.log("Account overdrawn!!!");
  }
}
// 이벤트가 발생될 때 이벤트 리스너 함수에 변수를 전달하는 방법
function checkGoal(acc, goal){
  if (acc.balance > goal){
    console.log("Goal Achieved!!!");
  }
}
var account = new Account();
account.on("balanceChanged", displayBalance);
account.on("balanceChanged", checkOverdraw);
account.on("balanceChanged", function(){
// balance가 1000보다 커질 때 checkGoal() 실행
  checkGoal(this, 1000);
});
account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withdraw(1200);