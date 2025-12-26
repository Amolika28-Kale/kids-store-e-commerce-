// export const getUsers = () => {
//   return JSON.parse(localStorage.getItem("users")) || [];
// };

// export const saveUsers = (users) => {
//   localStorage.setItem("users", JSON.stringify(users));
// };

// export const setCurrentUser = (user) => {
//   localStorage.setItem("currentUser", JSON.stringify(user));
// };

// export const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("currentUser"));
// };

// export const logoutUser = () => {
//   localStorage.removeItem("currentUser");
// };



// Get all users
export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // ✅ Auto-create demo user if no users exist
  if (users.length === 0) {
    const demoUser = {
      id: 1,
      name: "Demo User",
      email: "demo@tinytots.com",
      password: "123456",
    };

    localStorage.setItem("users", JSON.stringify([demoUser]));
    return [demoUser];
  }

  return users;
};

// ✅ SAVE USERS (FIX FOR YOUR ERROR)
export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

/* ---------------- AUTH ---------------- */

// Set current logged-in user
export const setCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

// Get current logged-in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};
