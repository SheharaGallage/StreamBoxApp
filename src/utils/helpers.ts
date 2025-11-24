/**
 * Format date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format rating (out of 10)
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Format runtime (minutes to hours and minutes)
 */
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  
  return `${hours}h ${mins}m`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get movie status badge color
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'released':
      return '#4CAF50';
    case 'upcoming':
      return '#2196F3';
    case 'in production':
      return '#FF9800';
    default:
      return '#9E9E9E';
  }
};
