const API_BASE_URL = "http://127.0.0.1:8000"; // update if backend URL is different

let accessToken = null;

export function setToken(token) {
    accessToken = token;
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
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
    if (data.access_token) {
        setToken(data.access_token);
    }
    return data;
}

export async function fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return await response.json();
}

export async function fetchProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return await response.json();
}

export async function createProject(projectData) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(projectData)
    });
    return await response.json();
}

export async function fetchReports() {
    const response = await fetch(`${API_BASE_URL}/reports`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return await response.json();
}

export async function createReport(reportData) {
    const response = await fetch(`${API_BASE_URL}/reports`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(reportData)
    });
    return await response.json();
}

