
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;

  try {
    const response = await fetch("https://cloud360gov-backend.onrender.com/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, new_password: newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
      let errorDetail = data.detail;
      if (Array.isArray(errorDetail)) {
        errorDetail = errorDetail.map(err => err.msg).join(", ");
      }
      throw new Error(errorDetail || "Password reset failed.");
    }

    messageDiv.innerText = "Password reset successful! Redirecting to login...";
    messageDiv.style.color = "green";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    console.error("Reset Error:", error);
    messageDiv.innerText = error.message || "Something went wrong.";
    messageDiv.style.color = "red";
  }
});

