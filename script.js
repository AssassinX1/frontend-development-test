document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (!file) return alert("Please select an image to upload!");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
        const base64String = reader.result.split(',')[1]; // Extract Base64 data

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbymQdKcAVkpN4K0YJsVJyFpf1psat1zW4Kye42Q9tmBKmhOJyF3eH2XXP91cf_t6xxv/exec", {  
                method: "POST",
                body: base64String
            });

            const data = await response.json();
            displayImage(data.link);  // Display uploaded image from Google Drive
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image.");
        }
    };
});