export const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));

export const getUser = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try { return JSON.parse(raw); }
  catch { localStorage.removeItem("user"); return null; }
};

export const isLoggedIn = () => !!getUser();

export const clearUser = () => localStorage.removeItem("user");
