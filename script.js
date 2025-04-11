async function setupQRScanner() {
    const video = document.createElement('video');
    const qrScannerDiv = document.getElementById('qr-scanner');
    qrScannerDiv.appendChild(video);

    try {
        // Request access to the camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        function scanQRCode() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    displayResponseMessage(code.data);
                }
            }
            requestAnimationFrame(scanQRCode);
        }

        scanQRCode();
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

function displayResponseMessage(message) {
    const responseDiv = document.getElementById('response-message');
    responseDiv.innerText = `Message: ${message}`;
}

// Initialize the QR scanner
setupQRScanner();
