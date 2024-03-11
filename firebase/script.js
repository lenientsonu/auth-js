// Define your Firebase project URL and authentication token
const firebaseUrl = "https://your-project-id.firebaseio.com";
const authToken = "your-authentication-token";

// Function to add data to Firebase
async function addToFirebase(data) {
    try {
        const response = await fetch(`${firebaseUrl}/data.json?auth=${authToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to add data to Firebase');
        }

        const responseData = await response.json();
        console.log('Data added to Firebase:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error adding data to Firebase:', error.message);
        throw error;
    }
}

// Example usage:
const dataToAdd = {
    key1: 'value1',
    key2: 'value2'
};

addToFirebase(dataToAdd)
    .then(() => {
        console.log('Data added successfully to Firebase');
    })
    .catch((error) => {
        console.error('Failed to add data to Firebase:', error);
    });
