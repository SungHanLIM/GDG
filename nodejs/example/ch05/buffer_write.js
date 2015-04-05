// 버퍼를 정의하고 0으로 채움
buf256 = new Buffer(256);
buf256.fill(0);
// write를 이용하여 텍스트 추가
buf256.write("add some text");
console.log(buf256.toString());
// write(string, offset, length)를 사용해 기존 버퍼의 일부 텍스트를 변경
buf256.write("more text", 9, 9);
console.log(buf256.toString());
// 숫자를 사용해 마지막 위치에 +를 추가한다.
buf256[18] = 43;
console.log(buf256.toString());