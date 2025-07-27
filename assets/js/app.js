import { PasswordGenerator } from './password-generator.js';
import { StrengthChecker } from './strength-checker.js';
import { ClipboardManager } from './clipboard.js';

const form = document.getElementById('passwordForm');
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const quantityInput = document.getElementById('quantity');
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const copyFeedback = document.getElementById('copyFeedback');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const entropyText = document.getElementById('entropyText');

const clipboardManager = new ClipboardManager(copyFeedback);
const strengthChecker = new StrengthChecker();

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  generatePasswords();
});

copyButton.addEventListener('click', () => {
  const text = passwordOutput.textContent;
  if (text) {
    clipboardManager.copy(text);
  }
});

function generatePasswords() {
  const length = parseInt(lengthInput.value, 10);
  const quantity = parseInt(quantityInput.value, 10);
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;
  const excludeSimilar = document.getElementById('excludeSimilar').checked;

  if (quantity < 1 || quantity > 10) {
    alert('Quantidade deve ser entre 1 e 10.');
    return;
  }

  if (length < 8 || length > 128) {
    alert('Comprimento deve ser entre 8 e 128.');
    return;
  }

  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert('Selecione pelo menos um tipo de caractere.');
    return;
  }

  const generator = new PasswordGenerator({
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
  });

  const passwords = generator.generateMultiple(quantity);
  const firstPassword = passwords[0];
  passwordOutput.textContent = quantity === 1 ? firstPassword : passwords.join('\n');

  const strengthResult = strengthChecker.check(firstPassword);
  updateStrengthDisplay(strengthResult);
}

function updateStrengthDisplay({ score, level, feedback, entropy }) {
  strengthBar.style.width = score + '%';
  strengthBar.className = 'password-generator__strength-bar ' + level;
  strengthText.textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} (${score}/100)`;
  entropyText.textContent = `Entropia: ${Math.round(entropy)} bits`;
}
