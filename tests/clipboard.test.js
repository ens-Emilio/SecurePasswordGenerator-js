describe('ClipboardManager', () => {
  let clipboardManager;
  let feedbackElement;
  const originalClipboard = { ...global.navigator.clipboard };

  beforeEach(() => {
    feedbackElement = document.createElement('div');
    clipboardManager = new (require('../assets/js/clipboard.js').ClipboardManager)(feedbackElement);
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.navigator.clipboard = originalClipboard;
  });

  test('copies text to clipboard and shows success feedback', async () => {
    const result = await clipboardManager.copy('test text');
    expect(result).toBe(true);
    expect(feedbackElement.textContent).toBe('Copiado!');
    expect(feedbackElement.classList.contains('success')).toBe(true);
  });

  test('shows error feedback on copy failure', async () => {
    global.navigator.clipboard.writeText.mockRejectedValue(new Error('fail'));
    const result = await clipboardManager.copy('test text');
    expect(result).toBe(false);
    expect(feedbackElement.textContent).toBe('Erro ao copiar');
    expect(feedbackElement.classList.contains('error')).toBe(true);
  });
});
