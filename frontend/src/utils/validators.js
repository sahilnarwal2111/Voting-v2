// Validate if an email is in the correct format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate if a password meets minimum requirements (e.g., at least 8 characters, includes a number)
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Validate if a string is not empty or only whitespace
  export const isNotEmpty = (string) => {
    return string && string.trim().length > 0;
  };
  
  // Validate if two strings match (e.g., password and confirm password)
  export const doStringsMatch = (string1, string2) => {
    return string1 === string2;
  };
  
  // Validate if a number is within a specified range
  export const isNumberInRange = (number, min, max) => {
    return number >= min && number <= max;
  };
  
  export default {
    isValidEmail,
    isValidPassword,
    isNotEmpty,
    doStringsMatch,
    isNumberInRange,
  };