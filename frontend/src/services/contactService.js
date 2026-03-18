const API_BASE_URL = "http://localhost:5000/api/contact";

export const submitContactForm = async (formData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit contact form");
  }

  return data;
};

export const getAllMessages = async () => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch messages");
  }

  return data;
};

export const updateMessageStatus = async (id, status) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
};

export const deleteMessage = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete message");
  }

  return data;
};