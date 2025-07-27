/**
 * PasswordGenerator class
 * Generates secure random passwords using Web Crypto API
 */
export class PasswordGenerator {
  constructor(options = {}) {
    this.length = options.length || 16;
    this.includeUppercase = options.includeUppercase !== undefined ? options.includeUppercase : true;
    this.includeLowercase = options.includeLowercase !== undefined ? options.includeLowercase : true;
    this.includeNumbers = options.includeNumbers !== undefined ? options.includeNumbers : true;
    this.includeSymbols = options.includeSymbols !== undefined ? options.includeSymbols : true;
    this.excludeSimilar = options.excludeSimilar || false;

    this.similarCharacters = 'il1Lo0O';
    this.uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    this.numberChars = '0123456789';
    this.symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  }

  generate() {
    const charset = this._getCharacterSet();
    if (!charset.length) {
      throw new Error('No character sets selected for password generation.');
    }

    let password = '';
    for (let i = 0; i < this.length; i++) {
      const randomIndex = this._getSecureRandomInt(charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }

  generateMultiple(count) {
    const passwords = [];
    for (let i = 0; i < count; i++) {
      passwords.push(this.generate());
    }
    return passwords;
  }

  _getCharacterSet() {
    let charset = '';
    if (this.includeUppercase) charset += this.uppercaseChars;
    if (this.includeLowercase) charset += this.lowercaseChars;
    if (this.includeNumbers) charset += this.numberChars;
    if (this.includeSymbols) charset += this.symbolChars;

    if (this.excludeSimilar) {
      charset = charset
        .split('')
        .filter((char) => !this.similarCharacters.includes(char))
        .join('');
    }
    return charset;
  }

  _getSecureRandomInt(max) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
  }
}
