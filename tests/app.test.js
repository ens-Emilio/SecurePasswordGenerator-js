/**
 * Testes de integração para assets/js/app.js
 * Usando Jest e Testing Library (jsdom)
 */

const { fireEvent } = require('@testing-library/dom');
const fs = require('fs');
const path = require('path');

jest.mock('../assets/js/password-generator.js', () => {
  return {
    PasswordGenerator: jest.fn().mockImplementation(() => {
      return {
        generateMultiple: jest.fn().mockReturnValue(['TestPassword123!']),
      };
    }),
  };
});

jest.mock('../assets/js/strength-checker.js', () => {
  return {
    StrengthChecker: jest.fn().mockImplementation(() => {
      return {
        check: jest.fn().mockReturnValue({
          score: 90,
          level: 'very-strong',
          feedback: ['Senha muito forte.'],
          entropy: 95,
        }),
      };
    }),
  };
});

/* Removed mock for ClipboardManager to use real class and spy on prototype */

describe('App Integration', () => {
  let container;
  let clipboardCopySpy;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    jest.resetModules();
    // Import app.js after setting up DOM
    require('../assets/js/app.js');
    container = document.body;

    // Import real ClipboardManager and spy on copy method
    const { ClipboardManager } = require('../assets/js/clipboard.js');
    clipboardCopySpy = jest.spyOn(ClipboardManager.prototype, 'copy').mockResolvedValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders initial length value', () => {
    const lengthValue = container.querySelector('#lengthValue');
    const lengthInput = container.querySelector('#length');
    expect(lengthValue.textContent).toBe(lengthInput.value);
  });

  test('updates length value on slider input', () => {
    const lengthValue = container.querySelector('#lengthValue');
    const lengthInput = container.querySelector('#length');
    fireEvent.input(lengthInput, { target: { value: '24' } });
    expect(lengthValue.textContent).toBe('24');
  });

  test('generates password on form submit and displays strength', () => {
    const form = container.querySelector('#passwordForm');
    const output = container.querySelector('#passwordOutput');
    const strengthText = container.querySelector('#strengthText');
    fireEvent.submit(form);
    expect(output.textContent).toBe('TestPassword123!');
    expect(strengthText.textContent).toContain('Very-strong');
  });

  test('copies password to clipboard on copy button click', async () => {
    const copyButton = container.querySelector('#copyButton');
    const output = container.querySelector('#passwordOutput');
    output.textContent = 'TestPassword123!';
    fireEvent.click(copyButton);
    // Wait for async copy call to complete
    await new Promise(process.nextTick);
    expect(clipboardCopySpy).toHaveBeenCalledWith('TestPassword123!');
  });
});
