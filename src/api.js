const API_BASE_URL = "https://api.cloud360gov.com"; // Update for production

let accessToken = null;

export function setToken(token) {
    accessToken = token;
    localStorage.setItem("access_token", token);
}

export function getToken() {
    if (!accessToken) {
        accessToken = localStorage.getItem("access_token");
    }
    return accessToken;
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Registration failed");
    }

    return await response.json();
}

export async function loginUser(username, password) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Login failed");
    }

    if (data.access_token) {
        setToken(data.access_token);
    }
    return data;
}

export async function fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to fetch users");
    }

    return await response.json();
}

export async function fetchProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to fetch projects");
    }

    return await response.json();
}

export async function createProject(projectData) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to create project");
    }

    return await response.json();
}

export async function fetchReports() {
    const response = await fetch(`${API_BASE_URL}/reports`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to fetch reports");
    }

    return await response.json();
}

