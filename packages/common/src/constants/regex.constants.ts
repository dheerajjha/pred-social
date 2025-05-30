// Common regex patterns
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
export const STOCK_SYMBOL_REGEX = /^[A-Z]{1,10}$/;
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/; 