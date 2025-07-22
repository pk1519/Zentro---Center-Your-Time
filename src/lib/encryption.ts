import CryptoJS from 'crypto-js';

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'default-secret-key';

// Generate encryption key from 2-digit code + secret
export function generateKey(code: string): string {
  return CryptoJS.SHA256(code + ENCRYPTION_SECRET).toString();
}

// Encrypt data using AES
export function encryptData(data: string, code: string): string {
  const key = generateKey(code);
  const encrypted = CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
}

// Decrypt data using AES
export function decryptData(encryptedData: string, code: string): string {
  try {
    const key = generateKey(code);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const originalData = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!originalData) {
      throw new Error('Invalid code or corrupted data');
    }
    
    return originalData;
  } catch {
    throw new Error('Failed to decrypt data. Invalid code or corrupted data.');
  }
}

// Generate a random 2-digit code
export function generateTwoDigitCode(): string {
  return Math.floor(Math.random() * 90 + 10).toString(); // Generates 10-99
}

// Validate 2-digit code format
export function isValidCode(code: string): boolean {
  return /^[0-9]{2}$/.test(code);
}
