let inputArea = document.querySelector('#inputCipher');
let outputArea = document.querySelector('#outputCipher');
let cipherList = document.querySelector('#cipherGroup');
let cipherKey = document.querySelector('#cipherKey');
let encodeBut = document.querySelector('#encodeBut');
let decodeBut = document.querySelector('#decodeBut');
let checkIcon = document.querySelector('.checkIcon');
let uncheckIcon = document.querySelector('.uncheckIcon')

function encrypt(cipher, message, key) {
    return cipher('encrypt', message, key);
}

function decrypt(cipher, message, key) {
    return cipher('decrypt', message, key);
}
////////////////////////////////Шифр Цезаря
function caesar(action, message, key) {
    if (action == 'encrypt') {
       return encryptCaesar(message, key)
    } else if (action == 'decrypt') {
       return decryptCaesar(message, key)
    }
}

function encryptCaesar(message, key) {
    return message.split('')
        .map(symbol => {
            return String.fromCodePoint(symbol.codePointAt() + +key);
        })
        .join('')
}

function decryptCaesar(message, key) {
    return message.split('')
        .map(symbol => {
            return String.fromCodePoint(symbol.codePointAt() - +key);
        })
        .join('')
}

/////////////////////Шифр Віженера
function vigenere(action, message, key) {
    if (action == 'encrypt') {
        return encryptVigenere(message, key)
     } else if (action == 'decrypt') {
        return decryptVigenere(message, key)
     }
}

function encryptVigenere(message, key) {
    let string = message.split('');
    let keyArr = [];

    for (let i = 0; i < message.length; i++) {
        keyArr.push(key[i % key.length]);
    }

    for (let i = 0; i < string.length; i++) {
        let stringIndex = string[i].codePointAt();
        let keyIndex = keyArr[i].codePointAt();
        string[i] = String.fromCodePoint(stringIndex + keyIndex);
    }

    return string.join('');
}

function decryptVigenere(message, key) {
    let string = message.split('');
    let keyArr = [];

    for (let i = 0; i < message.length; i++) {
        keyArr.push(key[i % key.length]);
    }

    for (let i = 0; i < string.length; i++) {
        let stringIndex = string[i].codePointAt();
        let keyIndex = keyArr[i].codePointAt();
        string[i] = String.fromCodePoint(stringIndex - keyIndex);
    }

    return string.join('');
}
/////////////////////Шифр з Авто ключем
function autoKey(action, message, key) {
    if (action == 'encrypt') {
        return encryptAutoKey(message, key);
    } else if (action == 'decrypt') {
        return decryptAutoKey(message, key);
    }
}

function encryptAutoKey(message, key) {
    let string = message.split('');
    let keyArr = [...key.split('')];

    for (let i = 0; i < message.length - key.length; i++) {
        keyArr.push(string[i]);
    }

    for (let i = 0; i < string.length; i++) {
        let stringIndex = string[i].codePointAt();
        let keyIndex = keyArr[i].codePointAt();
        string[i] = String.fromCodePoint(stringIndex + keyIndex);
    }

    return string.join('');
}



function decryptAutoKey(message, key) {
    let string = message.split('');
    let keyArr = [...key.split('')];


    for (let i = 0; i < keyArr.length; i++) {
        if (i >= string.length) {
            break;
        }

        let stringIndex = string[i].codePointAt();
        let keyIndex = keyArr[i].codePointAt();

        let symbol = String.fromCodePoint(stringIndex - keyIndex);

        string[i] = symbol;
        keyArr.push(symbol);
    }

    return string.join('');
}

///////////////////// Обробники
encodeBut.addEventListener('click', () => {
    outputArea.value = '';

    let cipher = cipherList.value;
    let message = inputArea.value;
    let key = cipherKey.value;

    if (message == '') {
        inputArea.classList.add('error');
    } else {
        inputArea.classList.remove('error');
    }

    if (key == '') {
        cipherKey.className = 'error';
        uncheckIcon.style.visibility = 'visible'
        return false;

    } else {
        cipherKey.className = '';
        uncheckIcon.style.visibility = 'hidden'
    }

    outputArea.value = encrypt(eval(cipher), message, key);
})

decodeBut.addEventListener('click', () => {
    outputArea.value = '';

    let cipher = cipherList.value;
    let message = inputArea.value;
    let key = cipherKey.value;

    if (message == '') {
        inputArea.classList.add('error');
    } else {
        inputArea.classList.remove('error');
    }

    if (key == '') {
        cipherKey.className = 'error';
        uncheckIcon.style.visibility = 'visible'
        return false;
    } else {
        cipherKey.className = '';
        uncheckIcon.style.visibility = 'hidden'
    }

    outputArea.value = decrypt(eval(cipher), message, key);
})



cipherList.addEventListener('change', () => {
    if (cipherList.value == 'caesar') {
        cipherKey.type = 'number';
    } else {
        cipherKey.type = 'text';
    }
})

/////////Local Storage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('inputText', inputArea.value);
    localStorage.setItem('outputText', outputArea.value);
    localStorage.setItem('cipherKey', cipherKey.value);
    localStorage.setItem('cipherType', cipherList.value);
})

window.addEventListener('DOMContentLoaded', () => {
    inputArea.value = localStorage.getItem('inputText');
    outputArea.value = localStorage.getItem('outputText');
    cipherKey.value = localStorage.getItem('cipherKey');
    cipherList.value = localStorage.getItem('cipherType')

    if (cipherList.value == 'caesar') {
        cipherKey.type = 'number';
    } 
})
///