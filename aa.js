var fs = require('fs');

var fileText = fs.readFileSync('file.txt',{encoding:'utf8'});

var findText = fs.readFileSync('find.txt',{encoding:'utf8'});
var arr;
// , 로 구분되어있는 경우
if(findText.includes(',')){
    findText = findText.replace(/\n/gi,'')
    findText = findText.replace(/\r/gi,'')
    arr = findText.split(',')
// , 로 구분되어있지 않고 \n\r 로 구분되어있는 경우
}else if(findText.includes('\n')) {
    findText = findText.replace(/\n/gi,'')
    // findText = findText.replace(/\r/gi,'')
    arr = findText.split('\r')
}

// 가장 마지막 배열이 비어있으면 제거
// 찾을 문자들의 마지막에 , 가 직혀있거나 공백이 있는경우 배열이 추가되는것 방지
while(arr[arr.length-1]=== ''){
    arr.splice(arr.length-1,1);
}
// if(arr[arr.length-1]=== '') arr.splice(arr.length-1,1);

console.log(`totoal: ${arr.length}`)

var fsOut = require('fs');
fsOut.writeFileSync('output.txt', '결과\r\n');
var countO = 0
var countX = 0;
arr.forEach(one => {
    var output = '';
    
    // 찾을 문자가 '이나 "으로 묶여있으면 제거
    one = one.replace(/['"]/gi,'')
    if(fileText.includes(one)){
        output = output.concat(`O: ${one} \r\n`);
        countO++;
    }else{
        output = output.concat(`X: ${one} \r\n`);
        countX++;
    }
    // console.log(output);
    fsOut.appendFileSync("output.txt", output);
});
// console.log(output);

console.log(`O: ${countO}`)
console.log(`X: ${countX}`)
