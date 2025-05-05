// Helper functions for the application

/**
 * Format date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    if (!date) return '';
    
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }
  
  /**
   * Calculate percentage
   * @param {number} part - Part value
   * @param {number} total - Total value
   * @returns {number} Percentage rounded to nearest integer
   */
  export function calculatePercentage(part, total) {
    if (!total) return 0;
    return Math.round((part / total) * 100);
  }
  
  /**
   * Deep clone an object
   * @param {Object} obj - Object to clone
   * @returns {Object} Cloned object
   */
  export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  /**
   * Check if two SQL queries are equivalent
   * @param {string} query1 - First SQL query
   * @param {string} query2 - Second SQL query
   * @returns {boolean} Whether the queries are equivalent
   */
  export function areQueriesEquivalent(query1, query2) {
    // This is a very simple comparison
    // In a real-world scenario, you'd want to parse the SQL and
    // check for semantic equivalence, not just string equivalence
    if (!query1 || !query2) return false;
    
    // Remove whitespace, convert to lowercase
    const normalized1 = query1.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalized2 = query2.trim().toLowerCase().replace(/\s+/g, ' ');
    
    return normalized1 === normalized2;
  }
  
  /**
   * Create a delay (useful for animations)
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise} Promise that resolves after the delay
   */
  export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }