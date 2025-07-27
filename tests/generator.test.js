import { PasswordGenerator } from '../assets/js/password-generator.js';

describe('PasswordGenerator', () => {
  test('generates password of correct length', () => {
    const generator = new PasswordGenerator({ length: 20 });
    const password = generator.generate();
    expect(password.length).toBe(20);
  });

  test('includes only selected character sets', () => {
    const generator = new PasswordGenerator({
      length: 50,
      includeUppercase: true,
      includeLowercase: false,
      includeNumbers: false,
      includeSymbols: false,
      excludeSimilar: false,
    });
    const password = generator.generate();
    expect(password).toMatch(/^[A-Z]+$/);
  });

  test('excludes similar characters when option is set', () => {
    const generator = new PasswordGenerator({
      length: 100,
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

  test('generateMultiple returns correct number of passwords', () => {
    const generator = new PasswordGenerator({ length: 10 });
    const passwords = generator.generateMultiple(5);
    expect(passwords.length).toBe(5);
    passwords.forEach((pwd) => {
      expect(pwd.length).toBe(10);
    });
  });

  test('throws error if no character sets selected', () => {
    const generator = new PasswordGenerator({
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: false,
      includeSymbols: false,
    });
    expect(() => generator.generate()).toThrow('No character sets selected for password generation.');
  });
});
