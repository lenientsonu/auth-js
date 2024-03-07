// Get the signup form
const signupForm = document.getElementById("signupForm");

// Add event listener for form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  signUp(email, password);
});

async function signUp(email, password) {
  const apiKey = "AIzaSyDt2CtJFOhXxqhoSyyTyEsCGTW1pjXal5g";
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

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
      console.log("Signup successful:", data);
      // Handle successful signup here, like redirecting to another page
      window.location.href = "login.html";
    } else {
      console.error("Signup failed:", data.error.message);
      document.getElementById("signupError").textContent = data.error.message;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    // Handle error here
    document.getElementById("signupError").textContent =
      "An error occurred during signup.";
  }
}


