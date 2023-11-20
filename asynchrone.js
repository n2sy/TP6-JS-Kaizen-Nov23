
// console.log("Exemple de prog asynchrone");
// setTimeout(() => {
//     console.log("Delai terminé");
// }, 3000);
// console.log("Fin de l'Exemple de prog asynchrone");
// console.log("Fin 2 de l'Exemple de prog asynchrone");

var myPromise = new Promise((resolve, reject) => {
    let a = prompt("Veuillez saisir un nombre");
    setTimeout(() => {
        if(Number(a) <= 10)
            resolve("Bon choix !")
        else
            reject(new Error("Mauvais choix !"))
    }, 2000)
})

function testPromise() {
    return myPromise;
}




// Traitement(consommer) de la promesse - Version 1
//testPromise().then(result => console.log(result)).catch(err => console.log(err.toString()))

// Traitement(consommer) de la promesse - Version 2
async function testPromiseV2() {
    try {
        let result = await testPromise();
        console.log(result);
        console.log("Second traitement");
    }
    catch(err) {
        console.log(console.log(err.toString()));
    }
}

testPromiseV2();