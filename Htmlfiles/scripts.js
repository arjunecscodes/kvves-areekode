// Google Sheets API Key and Sheet ID
const apiKey = 'AIzaSyBdRmKp4tgayGZ0mCN96uWtmeap0FEJYCc'; // Replace with your Google Sheets API key
const sheetId = '169lQv2QvSoHAYxh8eC8mhyFNltn057lthY88S-1yx9c'; // Replace with your Google Sheets ID
const range = 'Sheet1!A2:G8'; // Adjust range if necessary

// Fetch Data from Google Sheets
async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const container = document.getElementById('qr-codes-container');
            data.values.forEach((row, index) => {
                const [uniqueId, name, shopName, whatsappNumber, instagramId, locationUrl, phoneNumber] = row;

                if (uniqueId && name && shopName && whatsappNumber && instagramId && locationUrl && phoneNumber) {
                    // Create unique URL for each user

                    const uniqueCode = index + 1;
                    const qrUrl = `https://example.com/profile?code=${uniqueId}`;
                    
                    // Create a section for each QR code
                    const qrElementId = `qrcode-${uniqueId}`;
                    
                    const qrContainer = document.createElement('div');
                    qrContainer.className = 'qr-code';
                    qrContainer.innerHTML = `
                        <h2>QR Code for ${name}</h2>
                        <div id="${qrElementId}"></div>
                        <button id="download-${uniqueId}" class="btn btn-primary mt-3">Download QR Code</button>
                    `;
                    container.appendChild(qrContainer);
                    
                    // Generate QR Code for the URL
                    QRCode.toCanvas(document.getElementById(qrElementId), qrUrl, function (error, canvas) {
                        if (error) console.error(error);
                        console.log(`QR Code for ${name} generated!`);
                        
                        // Add download button functionality
                        document.getElementById(`download-${uniqueId}`).addEventListener('click', function() {
                            const link = document.createElement('a');
                            link.href = canvas.toDataURL('image/png');
                            link.download = `qr-code-${uniqueId}.png`;
                            link.click();
                        });
                    });
                }
            });
        } else {
            console.error('No data found in the Google Sheet.');
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
    }
}

// Fetch data when the page loads
fetchSheetData();

// Toggle Theme
document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    const button = this;

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('white-theme');
        button.innerHTML = '<i class="fas fa-moon"></i>';
        button.classList.remove('btn-light');
        button.classList.add('btn-dark');
    } else {
        body.classList.remove('white-theme');
        body.classList.add('dark-theme');
        button.innerHTML = '<i class="fas fa-lightbulb"></i>';
        button.classList.remove('btn-dark');
        button.classList.add('btn-light');
    }
});
