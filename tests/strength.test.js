import { StrengthChecker } from '../assets/js/strength-checker.js';

describe('StrengthChecker', () => {
  const checker = new StrengthChecker();

  test('calculates entropy correctly', () => {
    const result = checker.check('aA1!');
    expect(result.entropy).toBeGreaterThan(0);
  });

  test('detects repeated characters', () => {
    const result = checker.check('aaaBBB111');
    expect(result.feedback).toContain('Evite caracteres repetidos consecutivamente.');
  });

  test('detects sequential characters', () => {
    const result = checker.check('abc123');
    expect(result.feedback).toContain('Evite sequências simples de caracteres.');
  });

  test('detects common patterns', () => {
    const result = checker.check('password123');
    expect(result.feedback).toContain('Evite padrões comuns e previsíveis.');
  });

  test('returns very strong for strong passwords', () => {
    const result = checker.check('Xk9#mP2$nQ4!zR7&');
    expect(result.level).toBe('very-strong');
  });

  test('score is between 0 and 100', () => {
    const result = checker.check('weak');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
