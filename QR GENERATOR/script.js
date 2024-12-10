const textInput = document.getElementById("text-input");
const generateBtn = document.getElementById("generate-btn");
const qrCodeDiv = document.getElementById("qr-code");

// Function to generate QR code
generateBtn.addEventListener("click", () => {
    const text = textInput.value;

    // Clear previous QR code
    qrCodeDiv.innerHTML = "";

    // Check if input is not empty
    if (text.trim() !== "") {
        QRCode.toCanvas(qrCodeDiv, text, { width: 200, margin: 2 }, function (error) {
            if (error) console.error(error);
            console.log("QR Code generated!");
        });
    } else {
        alert("Please enter some text or a URL to generate the QR code.");
    }
});