// Format a date to a readable string (e.g., "April 3, 2025")
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Calculate the difference between two dates in days
  export const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = Math.abs(end - start);
    return Math.ceil(difference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };
  
  // Check if a date is in the past
  export const isPastDate = (date) => {
    const today = new Date();
    return new Date(date) < today;
  };
  
  // Get the current date in ISO format (e.g., "2025-04-03")
  export const getCurrentDateISO = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  export default {
    formatDate,
    calculateDaysDifference,
    isPastDate,
    getCurrentDateISO,
  };