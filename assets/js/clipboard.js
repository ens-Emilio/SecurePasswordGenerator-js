/**
 * ClipboardManager class
 * Handles copying text to clipboard with feedback
 */
export class ClipboardManager {
  constructor(feedbackElement) {
    this.feedbackElement = feedbackElement;
  }

  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      this._showFeedback(true);
      return true;
    } catch (err) {
      this._showFeedback(false);
      return false;
    }
  }

  _showFeedback(success) {
    if (!this.feedbackElement) return;
    this.feedbackElement.textContent = success ? 'Copiado!' : 'Erro ao copiar';
    this.feedbackElement.classList.remove('success', 'error');
    this.feedbackElement.classList.add(success ? 'success' : 'error');
    setTimeout(() => {
      this.feedbackElement.textContent = '';
      this.feedbackElement.classList.remove('success', 'error');
    }, 2000);
  }
}
