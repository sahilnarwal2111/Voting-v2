// Capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Format a number with commas as thousands separators (e.g., 1,000,000)
  export const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // Truncate a string to a specified length and add ellipsis (e.g., "Hello World..." for length 10)
  export const truncateString = (string, maxLength) => {
    if (!string || string.length <= maxLength) return string;
    return string.slice(0, maxLength) + '...';
  };
  
  // Convert a string to title case (e.g., "hello world" -> "Hello World")
  export const toTitleCase = (string) => {
    if (!string) return '';
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => capitalizeFirstLetter(word))
      .join(' ');
  };
  
  export default {
    capitalizeFirstLetter,
    formatNumberWithCommas,
    truncateString,
    toTitleCase,
  };