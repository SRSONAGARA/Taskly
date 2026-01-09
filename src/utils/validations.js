// Email validation
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Name validation
export const nameRegex = /^[A-Za-z ]+$/;

// =======================
// Helper functions
// =======================

export const isValidEmail = (email) => emailRegex.test(email);

export const isValidPassword = (password) =>
  passwordRegex.test(password);

export const isValidName = (name) =>
  nameRegex.test(name) && name.trim().length >= 2;
