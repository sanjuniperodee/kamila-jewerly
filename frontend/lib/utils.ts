/**
 * Format a price with proper thousands separators
 * @param price - The price to format
 * @returns Formatted price string
 */
export function formatPrice(price: string | number): string {
  // Handle null, undefined or empty values
  if (price === null || price === undefined || price === '') {
    return '0';
  }
  
  // Convert to number and format with thousands separator
  return Number(price).toLocaleString('ru-RU');
}
