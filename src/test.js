
function say(){
    return "Hello";
}
function delaySay() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("Delay Hello");
        }, 1000);
    });
}
async function longTimeSay(){
    await setTimeout(()=>{}, 1000); 
    return "Long Time Hello";
 }

async function main(){
    let a = say();
    let b = await delaySay();
    let c = await longTimeSay();

    console.log(a);
    console.log(b);
    console.log(c);
}

main();

// async () => {
//     // await setTimeout(() => {
//     //     console.log("aasdfsafd")
//     // },1000);

//     let aa = 1
//     let bb = 2
//     return aa + bb
// }

// console.log(a())
