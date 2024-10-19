"use server";

export async function logIn(json: string) {
  const formData = JSON.parse(json);
  
  const request = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  // If an error occurred, return it
  if (!request.ok) {
    const response = await request.json();
    const jsonResponse = JSON.parse(JSON.stringify(response));
    return jsonResponse;
  }

  return "";
}