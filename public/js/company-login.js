let loginForm = document.getElementById("login-form");

const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("click");
  //   console.log("Hello");
  // Collect values from the login form
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    await fetch("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // if (response.ok) {
    // If successful, redirect the browser to the profile page

    document.location.replace("/company-dashboard");
    // } else {
    //   alert(response.statusText);
    // }
  }
};

loginForm.addEventListener("submit", loginFormHandler);
