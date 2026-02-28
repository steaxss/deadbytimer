/**
 * Input sanitization utilities to prevent XSS and ensure data integrity
 */

/**
 * Maximum length for player names
 */
export const MAX_PLAYER_NAME_LENGTH = 32;

/**
 * Sanitizes a player name input
 * - Very permissive: allows almost all characters including < > and special chars
 * - Only blocks invisible control characters and limits length
 * - Safe because React uses textContent (not innerHTML) and app is local-only
 *
 * @param input - Raw user input
 * @returns Sanitized safe string
 */
export function sanitizePlayerName(input: string): string {
  if (input === undefined || input === null) return '';

  let sanitized = input;

  // Step 1: Remove only invisible/dangerous control characters
  // Block: NULL, backspace, form feed, etc. (ASCII 0-8, 11-12, 14-31, 127)
  // Keep: tab (9), newline (10), carriage return (13) - will be converted to spaces
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Step 2: Convert tabs and newlines to spaces (preserve multiple spaces and leading/trailing spaces)
  sanitized = sanitized.replace(/[\t\n\r]/g, ' ');

  // Step 3: Limit length
  sanitized = sanitized.substring(0, MAX_PLAYER_NAME_LENGTH);

  return sanitized;
}

/**
 * Validates if a player name is acceptable
 * Returns error message if invalid, null if valid
 */
export function validatePlayerName(input: string): string | null {
  if (!input || input.trim().length === 0) {
    return 'The name cannot be empty.';
  }

  const sanitized = sanitizePlayerName(input);

  if (sanitized.length === 0) {
    return 'The name contains only invalid characters.';
  }

  if (sanitized.length < 2) {
    return 'The name must contain at least 2 characters.';
  }

  // Check if sanitization changed the input (user tried to inject something)
  if (sanitized !== input.trim()) {
    return 'The name contains unauthorized characters.';
  }

  return null; // Valid
}

/**
 * Escapes HTML entities for safe display
 * Extra layer of protection even though we use textContent
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Safe setter for DOM textContent with sanitization
 */
export function setSafeTextContent(element: HTMLElement | null, text: string): void {
  if (!element) return;
  const sanitized = sanitizePlayerName(text);
  element.textContent = sanitized;
}
