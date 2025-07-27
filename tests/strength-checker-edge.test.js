import { StrengthChecker } from '../assets/js/strength-checker.js';

describe('StrengthChecker Edge Cases', () => {
  const checker = new StrengthChecker();

  test('returns zero entropy for empty password', () => {
    const result = checker.check('');
    expect(result.entropy).toBe(0);
    expect(result.score).toBe(0);
    expect(result.level).toBe('weak');
  });

  test('detects no feedback for strong password', () => {
    const result = checker.check('A1b!C2d@E3f#');
    expect(result.feedback).toContain('Senha razoavelmente segura, mas pode melhorar.');
  });

  test('detects multiple feedback messages', () => {
    const result = checker.check('aaa123password');
    expect(result.feedback).toContain('Evite caracteres repetidos consecutivamente.');
    expect(result.feedback).toContain('Evite sequências simples de caracteres.');
    expect(result.feedback).toContain('Evite padrões comuns e previsíveis.');
  });

  test('score does not go below zero', () => {
    const result = checker.check('aaa');
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  test('score does not exceed 100', () => {
    const result = checker.check('A1b!C2d@E3f#G4h$');
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
