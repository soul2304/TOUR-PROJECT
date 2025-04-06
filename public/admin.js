const addTourForm = document.getElementById('add-tour-form');
const feedback = document.getElementById('admin-feedback');
const inspectChangesButton = document.getElementById("inspect-changes-button");
const backButton = document.getElementById("back-button");

// // Replace with Render API URL
// const API_BASE_URL = 'https://tour-booking-website-d05t.onrender.com';

// Add Tour Form Submission
addTourForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Add Tour form submitted'); // Debug log
    const tourName = document.getElementById('tour-name').value;
    const tourDescription = document.getElementById('tour-description').value;
    const tourPrice = document.getElementById('tour-price').value;
    const tourImageUrl = document.getElementById('tour-image-url').value;

    try {await fetch(`${API_BASE_URL}/api/admin-changes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ change: `Added tour: ${tourName}` })
    });
    
        // await fetch(`${API_BASE_URL}/api/tours`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name: tourName, description: tourDescription, price: parseFloat(tourPrice), imageUrl: tourImageUrl })
        // });
        feedback.textContent = "Tour added successfully!";
        feedback.style.color = "green";
        addTourForm.reset();
    } catch (error) {
        feedback.textContent = `Error: ${error.message}`;
        feedback.style.color = "red";
    }
});
