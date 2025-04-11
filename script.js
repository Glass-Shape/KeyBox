async function setupQRScanner() {
    const video = document.createElement('video');
    video.setAttribute('playsinline', 'true'); // Ajout de l'attribut playsinline
    const qrScannerDiv = document.getElementById('qr-scanner');
    qrScannerDiv.appendChild(video);

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    async function scanQRCode() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                try {
                    const obj = JSON.parse(code.data);
                    displayResponseMessage(obj.material);
                } catch (error) {
                    console.error('Error parsing QR code data:', error);
                    displayResponseMessage('Invalid QR code data');
                }
            }
        }
        requestAnimationFrame(scanQRCode);
    }

    scanQRCode();
}

function displayResponseMessage(message) {
    const responseMessageDiv = document.getElementById('response-message');
    responseMessageDiv.textContent = message;
}



async function fetchMessageFromDatabase(materialKey) {
    // Remplacez cette URL par l'URL de votre API ou de votre base de données
    const response = await fetch(`https://your-database-api.com/messages?key=${materialKey}`);
    if (response.ok) {
        const data = await response.json();
        if (data.message) {
            return data.message;
        } else {
            return 'key doesn\'t exist';
        }
    } else {
        return 'Error fetching data';
    }
}

function displayResponseMessage(message) {
    const responseMessageDiv = document.getElementById('response-message');
    responseMessageDiv.textContent = message;
}

function displayResponseMessage(message) {
    const responseMessageDiv = document.getElementById('response-message');
    responseMessageDiv.textContent = message;
}



// Function to display response message
function displayResponseMessage(message) {
    const responseDiv = document.getElementById('response-message');
    responseDiv.innerText = `Message: ${message}`;
}

// Initialize the QR scanner
setupQRScanner();
