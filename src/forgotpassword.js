document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgot-password-form");
  const messageDiv = document.getElementById("forgot-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();

    try {
      const response = await fetch("https://cloud360gov-backend.onrender.com/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send password reset email.");
      }

      messageDiv.innerText = data.message || "Check your email for the reset link.";
      messageDiv.style.color = "green";
    } catch (error) {
      console.error("Password reset request error:", error);
      messageDiv.innerText = error.message;
      messageDiv.style.color = "red";
    }
  });
});

