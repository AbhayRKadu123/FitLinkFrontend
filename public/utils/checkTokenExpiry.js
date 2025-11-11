// src/utils/checkTokenExpiry.js
export function isTokenExpired() {
  const token = localStorage.getItem("token");
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode the JWT payload
    const expiry = payload.exp * 1000; // convert to milliseconds
    return Date.now() > expiry;
  } catch (err) {
    console.error("Invalid token format:", err);
    return true;
  }
}
