import { registerUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const messageDiv = document.getElementById("register-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
      username: form.username.value,
      password: form.password.value,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      city: form.city.value,
      state: form.state.value,
      country: form.country.value,
      zipcode: form.zipcode.value,
    };

    try {
      await registerUser(userData);
      messageDiv.style.color = "green";
      messageDiv.innerText = "Registration successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      messageDiv.style.color = "red";
      messageDiv.innerText = error.message || "Registration failed";
    }
  });
});

