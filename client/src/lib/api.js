export const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}

export async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}

export async function createUser(data) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}

export async function updateUser(id, data, token) {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}

export async function deleteUser(id, token) {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}

export async function createWatchlist(data) {
  const response = await fetch("/api/watchlist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}

export async function deleteWatchlist(id) {
  const response = await fetch(`/api/watchlist/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}
