import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:8080',

  baseUrl: 'https://fitlink-vbdq.onrender.com', // replace with your actual backend URL
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // 🔴 If backend returns 401 (token expired or invalid)
  if (result.error && result.error.status === 401) {
    console.warn('⛔ Token expired or invalid — redirecting to login');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Optionally, show a notification or alert before redirecting
    alert('Session expired. Please log in again.');

    // Redirect to login
    window.location.href = '/login';
  }

  return result;
};
