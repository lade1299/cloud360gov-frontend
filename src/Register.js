
import { registerUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const messageDiv = document.getElementById("register-message");

  if (!form || !messageDiv) {
    console.error("❌ Form or message div not found");
    return;
  }

  console.log("✅ Register.js loaded");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageDiv.innerText = "";

    const password = form.password.value;
    const confirmPassword = form["confirm-password"].value;

    if (password !== confirmPassword) {
      messageDiv.style.color = "red";
      messageDiv.innerText = "Passwords do not match.";
      return;
    }

    const userData = {
      username: form.username.value,
      password,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      city: form.city.value,
      state: form.state.value,
      country: form.country.value,
      zipcode: form.zipcode.value
    };

    try {
      await registerUser(userData);
      messageDiv.style.color = "green";
      messageDiv.innerText = "Registration successful! Redirecting...";
      form.reset();
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
