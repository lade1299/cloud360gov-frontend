// src/reset-password.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-password-form");
  const messageDiv = document.getElementById("reset-message");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (!token) {
    messageDiv.innerText = "Reset link is missing or invalid.";
    messageDiv.style.color = "red";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value;

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, new_password: newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Password reset failed.");
      }

      messageDiv.innerText = "Password reset successful! Redirecting to login...";
      messageDiv.style.color = "green";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } catch (error) {
      console.error("Reset Error:", error);
      messageDiv.innerText = error.message;
      messageDiv.style.color = "red";
    }
  });
});

