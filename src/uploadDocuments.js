import { getToken } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const fileInput = document.getElementById("file");
            const file = fileInput.files[0];

            if (!file) {
                alert("Please select a file to upload.");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("https://cloud360gov-backend.onrender.com/upload", {
                    method: "POST",
                    headers: {
                        Authorization: \`Bearer \${getToken()}\`
                    },
                    body: formData
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.detail || "Upload failed");
                }

                alert("File uploaded successfully!");
                fileInput.value = ""; // clear input
                await fetchDocuments(); // refresh document list
            } catch (error) {
                alert(error.message);
            }
        });

        // Initial fetch of documents
        fetchDocuments();
    }
});

async function fetchDocuments() {
    const list = document.getElementById("documentList");

    if (!list) return;

    try {
        const response = await fetch("https://cloud360gov-backend.onrender.com/documents", {
            headers: {
                Authorization: \`Bearer \${getToken()}\`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<li>No documents uploaded yet.</li>";
            return;
        }

        data.forEach(doc => {
            const li = document.createElement("li");
            li.textContent = doc.filename;
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}
