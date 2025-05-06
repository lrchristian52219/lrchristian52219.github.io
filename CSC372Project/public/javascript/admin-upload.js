document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('json-file');
    const uploadStatus = document.getElementById('upload-status');

    if (!fileInput.files.length) {
        uploadStatus.textContent = 'Please select a file to upload.';
        return;
    }

    const file = fileInput.files[0];

    try {
        const fileContent = await file.text();
        console.log('File content:', fileContent); // Debugging log

        const products = JSON.parse(fileContent);
        console.log('Parsed JSON:', products); // Debugging log

        // Validate JSON structure
        if (!Array.isArray(products)) {
            throw new Error('Invalid JSON format. Expected an array of products.');
        }

        const response = await fetch('/api/admin/products/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });

        if (!response.ok) {
            const error = await response.json();
            uploadStatus.textContent = `Error: ${error.error || 'Failed to upload products.'}`;
            return;
        }

        const result = await response.json();
        uploadStatus.textContent = result.message;
    } catch (error) {
        console.error('Error uploading products:', error);
        uploadStatus.textContent = 'Failed to upload products. Please check the console for more details.';
    }
});

document.getElementById('upload-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('json-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a JSON file to upload.');
        return;
    }

    try {
        const fileContent = await file.text();
        const products = JSON.parse(fileContent);

        const response = await fetch('/api/admin/products/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });

        if (!response.ok) {
            throw new Error('Failed to upload products');
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error uploading products:', error);
        alert('Failed to upload products. Please check the console for more details.');
    }
});