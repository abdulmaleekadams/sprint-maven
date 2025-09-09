// src/infrastructure/storage/auth.storage.ts

// For now, simple localStorage (can later be swapped for Zustand or cookies)
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null; // SSR safety
  return localStorage.getItem("authToken");
};

export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
};

export const clearAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
};
