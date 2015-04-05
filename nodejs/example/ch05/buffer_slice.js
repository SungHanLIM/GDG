// 복사의 경우 내용을 수정하더라도 원본에 변화가 없지만
// 분할의 경우 원본이 변하기 때문에 분할된 자료를 처리할 때는 주의가 필요하다.
// 이 코드에서는 slice 수정 내용이 원본의 변화를 가져온다.
var numbers = new Buffer("123456789");
console.log(numbers.toString());
var slice = numbers.slice(3, 6);
console.log(slice.toString());
slice[0] = '#'.charCodeAt(0);
slice[slice.length-1] = '#'.charCodeAt(0);
console.log(slice.toString());
console.log(numbers.toString());