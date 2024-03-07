// Function to handle user login
async function login(email, password) {
  const apiKey = "AIzaSyBPirCb-AtTBy18pMJervslVKazacVMelI";
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  const requestBody = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login successful:", data);
      // Create a token and store it in local storage
      localStorage.setItem("token", data.idToken);
      // Handle successful login here, like redirecting to another page
      window.location.href = "index.html";
    } else {
      console.error("Login failed:", data.error.message);
      document.getElementById("loginError").textContent = data.error.message;
    }
  } catch (error) {
    console.error("Error during login:", error);
    // Handle error here
    document.getElementById("loginError").textContent =
      "An error occurred during login.";
  }
}

// Get the login form
const loginForm = document.getElementById("loginForm");

// Add event listener for form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});



// how to check is user is logged in
// document.addEventListener('DOMContentLoaded', function() {
//     checkTokenAndRedirect();
//   });
  
//   function checkTokenAndRedirect() {
//     const token = localStorage.getItem('token');
  
//     if (!token) {
//       // Token does not exist in local storage
//       // Redirect the user to the login page
//       window.location.href = 'login.html';
//       return false;
//     }
  
//     // Token exists in local storage, continue with the application logic
//     console.log('Token exists:', token);
//     return true;
//   }
  
