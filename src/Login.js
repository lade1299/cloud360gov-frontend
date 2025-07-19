import { loginUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Add message element once
  let message = document.createElement("p");
  message.style.color = "red";
  loginForm.appendChild(message);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(usernameInput.value, passwordInput.value);
      if (result.access_token) {
        message.style.color = "green";
        message.innerText = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.innerText = error.message;
    }
  });

  // Handle "Create account" link
  const createAccountLink = document.getElementById("create-account-link");
  if (createAccountLink) {
    createAccountLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "register.html";
    });
  } else {
    console.error("Create account link not found!");
  }

  // Handle "Forgot password" link
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "forgot-password.html";
    });
  } else {
    console.error("Forgot password link not found!");
  }
});

