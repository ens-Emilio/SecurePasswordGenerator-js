/**
 * StrengthChecker class
 * Analyzes password strength, calculates entropy, and provides feedback
 */
export class StrengthChecker {
  check(password) {
    const entropy = this._calculateEntropy(password);
    const patterns = this._checkPatterns(password);
    const score = this._calculateScore(entropy, patterns);
    const level = this._getLevel(score);
    const feedback = this._getFeedback(score, patterns);

    return {
      score,
      level,
      feedback,
      entropy,
    };
  }

  _calculateEntropy(password) {
    const charsetSize = this._estimateCharsetSize(password);
    if (charsetSize === 0) return 0;
    return password.length * Math.log2(charsetSize);
  }

  _estimateCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[^a-zA-Z0-9]/.test(password)) size += 32; // Approximate symbol count
    return size;
  }

  _checkPatterns(password) {
    const feedback = [];

    // Check for repeated characters
    if (/(.)\1{2,}/.test(password)) {
      feedback.push('Evite caracteres repetidos consecutivamente.');
    }

    // Check for sequences (e.g., abc, 123)
    if (this._hasSequentialChars(password)) {
      feedback.push('Evite sequências simples de caracteres.');
    }

    // Check for common patterns (e.g., password, qwerty)
    const commonPatterns = ['password', '123456', 'qwerty', 'abc123', 'letmein'];
    for (const pattern of commonPatterns) {
      if (password.toLowerCase().includes(pattern)) {
        feedback.push('Evite padrões comuns e previsíveis.');
        break;
      }
    }

    return feedback;
  }

  _hasSequentialChars(password) {
    const seqLength = 3;
    const lower = password.toLowerCase();

    for (let i = 0; i <= lower.length - seqLength; i++) {
      const slice = lower.slice(i, i + seqLength);
      if (this._isSequential(slice)) {
        return true;
      }
    }
    return false;
  }

  _isSequential(str) {
    // Check ascending sequence
    let ascending = true;
    for (let i = 0; i < str.length - 1; i++) {
      if (str.charCodeAt(i) + 1 !== str.charCodeAt(i + 1)) {
        ascending = false;
        break;
      }
    }
    if (ascending) return true;

    // Check descending sequence
    let descending = true;
    for (let i = 0; i < str.length - 1; i++) {
      if (str.charCodeAt(i) - 1 !== str.charCodeAt(i + 1)) {
        descending = false;
        break;
      }
    }
    return descending;
  }

  _calculateScore(entropy, feedback) {
    let score = Math.min(100, Math.floor(entropy));
    if (feedback.length > 0) {
      score -= feedback.length * 10;
    }
    if (score < 0) score = 0;
    return score;
  }

  _getLevel(score) {
    if (score < 40) return 'weak';
    if (score < 60) return 'medium';
    if (score < 80) return 'strong';
    return 'very-strong';
  }

  _getFeedback(score, feedback) {
    if (score >= 80) {
      return ['Senha muito forte.'];
    }
    if (feedback.length === 0) {
      return ['Senha razoavelmente segura, mas pode melhorar.'];
    }
    return feedback;
  }
}
