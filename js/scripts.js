//Array to hold encrypted words
var encrypted = [];

//Encrypted constructor function
function Encrypted (id, name) {
    this.id = id;
    this.name = name;
}

//Creates a new encrypted element and adds it to the DOM
function addEncryptedElement (encrypt){
    //Create elements
    var listEl = document.getElementById('cipher-list');
    var encryptEl = document.createElement('li');
    var textEl = document.createTextNode(encrypt.name);

    //Set attributes
    encryptEl.setAttribute('id', encrypt.id);

    //Add text to encrypted element
    encryptEl.appendChild(textEl);

    //Add encrypted element to list
    listEl.appendChild(encryptedEl);
}

//Click handler to add a new encrypted
function addEncrypted (event){
    var inputEl = document.getElementById('input-word');
    var numEl = document.getElementById('input-num');

    if (inputEl.value != ''){
        //Create a unique id
        var id = 'item-' + encrypted.length;

        //Pass parameters to the encrypting function
        var text = encrypting(inputEl, numEl);

        //Create a new encrypted
        var cipher = new Encrypted(id, text)
        encrypted.push(cipher);

        //Add the encrypted word to the DOM
        addEncryptedElement(cipher);

        //Reset inputs
        inputEl.value = '';
        numEl.value = '';
    }
}

//Shift user's input word to encrypt it
function encrypting (cipher, value){
    const pointA = 'A'.codePointAt(0);
    const pointZ = 'Z'.codePointAt(0);

    var encryptMessage = '';

    //loops through each letter of the word
    for (let chr of cipher){
        let letter = chr.codePointAt(0);

        //Change the letter by checking it key code value then adding to it by user value
        if (letter >= pointA && code <= pointZ){
            letter -= pointA;
            
            letter = mod(letter + value, 26);

            letter += pointA
        }

        //Combines the individual letters together to form the encrypted word
        encryptMessage += String.fromCodePoint(letter);
    }

    return encryptMessage;
}

//Create a way to loop back to A if the initial letter is Z
function mod(n, p){
    var r = n % p;

    if (r < 0){
        r += p;
    }

    return r;
}

//Key press handler to automatically click create cipher button
function clickButton (event){
    if (event.keyCode === 13){
        document.getElementById('create-cipher').click();
    }
}

//Initializes the app
function init (){
    //Wire up the create cipher button click handler
    document.getElementById('create-cipher').onclick = addEncrypted;

    //Wire up the create cipher input key press handler
    document.getElementById('input-word').onkeypress = clickButton;
    document.getElementById('input-num').onkeypress = clickButton;
}

init();