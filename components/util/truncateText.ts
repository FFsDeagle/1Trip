/**
 * Truncate text to a specified length and add ellipses if necessary.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum allowed length for the text.
 * @returns {string} - The truncated text with ellipses.
 */
export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}