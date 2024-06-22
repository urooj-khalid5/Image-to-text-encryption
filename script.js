function encrypt() {
    const fileInput = document.getElementById('inputImage');
    const outputText = document.getElementById('outputText');
    const reader = new FileReader();
    const secretText = document.getElementById('secretText').value;
    const secretKey = document.getElementById('secretKey').value;
  
    reader.onload = function(e) {
      const imageData = e.target.result;
      const encryptedData = encryptAES(imageData, secretText, secretKey);
      outputText.value = encryptedData;
    };
  
    reader.readAsDataURL(fileInput.files[0]);
}

function decryptImage() {
    const outputText = document.getElementById('outputText').value;
    const secretKey = document.getElementById('secretKey').value;
    const decryptedData = decryptAES(outputText, secretKey);
    const outputImage = document.getElementById('outputImage');
    outputImage.src = decryptedData.imageData;
}

function decryptText() {
    const outputText = document.getElementById('outputText').value;
    const secretKey = document.getElementById('secretKey').value;
    const decryptedData = decryptAES(outputText, secretKey);
    const secretText = decryptedData.secretText;
    document.getElementById('outputSecret').textContent = 'Decrypted Plain Text: ' + secretText;
    document.getElementById('outputKey').textContent = 'Secret Key: ' + secretKey;
}


function decrypt() {
    decryptImage();
    decryptText();
}

// AES encryption
function encryptAES(input, secretText, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(secretText + ':' + input, secretKey).toString();
    return encrypted;
}

// AES decryption
function decryptAES(input, secretKey) {
    const decrypted = CryptoJS.AES.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
    const separatorIndex = decrypted.indexOf(':');
    const imageData = decrypted.substring(separatorIndex + 1);
    const secretText = decrypted.substring(0, separatorIndex);
    return { imageData: imageData, secretText: secretText };
}
