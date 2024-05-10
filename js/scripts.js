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
    listEl.appendChild(encryptEl);
}

//Click handler to add a new encrypted
function addEncrypted (event){
    var inputEl = document.getElementById('input-word');
    var numEl = document.getElementById('input-num');

    if (inputEl.value != ''){
        //Create a unique id
        var id = 'item-' + encrypted.length;

        //Pass parameters to the encrypting function
        var text = encrypting(inputEl.value, numEl.value);

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
    const pointA = 65;
    const pointZ = 90;

    var encryptMessage = '';

    //loops through each letter of the word
    for (var i = 0; i < cipher.length; i++ ){
        let letter = cipher.codePointAt(i);

        //Change the letter by checking it key code value then adding to it by user value
        if (letter >= pointA && letter <= pointZ){
            letter -= pointA;
            
            letter = mod(letter + Number(value), 26);

            letter += pointA;
        }

        //Combines the individual letters together to form the encrypted word
        encryptMessage += String.fromCodePoint(letter);
        console.log(letter, i, value);
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