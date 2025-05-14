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

export async function updateUser(id, data) {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
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

export async function deleteUser(id) {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return new Error(response.statusText);
  }

  return await response.json();
}
