// UFT8 인코딩 문자를 사용하는 버퍼를 정함
bufUTF8 = new Buffer("Some UTF8 Text \u00b6 \u30c6 \u20ac", 'utf8');
// toString()을 별도의 파라미터 없이 사용해 모든 버퍼의 내용을 읽는다.
console.log(bufUTF8.toString());
// encoding과 start, end 전달인자를 사용해 버퍼의 일부를 읽는다.
console.log(bufUTF8.toString('utf8', 5, 9));

// StringDecoder 객체를 UFT8 인코딩 방식으로 생성해
// 버퍼의 내용을 콘솔에 출력
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
console.log(decoder.write(bufUTF8));
// 18번째 위치의 값을 8진수로 직접 읽는다.
console.log(bufUTF8[18].toString(16));
// readUInt32BE()를 사용해 32비트 정수 값으로 읽는다.
console.log(bufUTF8.readUInt32BE(18).toString(16));