let str = "My name is yashi";

let arr = str.split(" ");

for(let t of arr){
    let temp = t.split("").reverse().join("");
    console.log(temp)  
}