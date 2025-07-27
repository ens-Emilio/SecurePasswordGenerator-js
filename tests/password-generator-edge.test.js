import { PasswordGenerator } from '../assets/js/password-generator.js';

describe('PasswordGenerator Edge Cases', () => {
  test('generates password with minimum length', () => {
    const generator = new PasswordGenerator({ length: 8 });
    const password = generator.generate();
    expect(password.length).toBe(8);
  });

  test('generates password with maximum length', () => {
    const generator = new PasswordGenerator({ length: 128 });
    const password = generator.generate();
    expect(password.length).toBe(128);
  });

  test('generates password with only symbols', () => {
    const generator = new PasswordGenerator({
      length: 20,
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: false,
      includeSymbols: true,
    });
    const password = generator.generate();
    expect(password).toMatch(/^[!@#$%^&*()\-\_=+\[\]{}|;:,.<>?]+$/);
  });

  test('generates password excluding similar characters', () => {
    const generator = new PasswordGenerator({
      length: 50,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: true,
    });
    const password = generator.generate();
    const similarChars = 'il1Lo0O';
    for (const char of similarChars) {
      expect(password).not.toContain(char);
    }
  });
});
