const frame = document.getElementById('viewerFrame');
const dropHint = document.getElementById('dropHint');
const statusText = document.getElementById('status');

function sendArrowToFrame(key) {
  const target = frame.contentWindow;
  if (!target) return;

  const keyboardEventInit = { key, code: key, bubbles: true };
  target.document.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit));
  target.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit));
}

window.presenterAPI.onNext(() => sendArrowToFrame('ArrowRight'));
window.presenterAPI.onPrev(() => sendArrowToFrame('ArrowLeft'));

window.presenterAPI.onLoadHtml((fileUrl) => {
  frame.src = fileUrl;
  statusText.textContent = `현재: ${decodeURIComponent(fileUrl)}`;
});

window.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropHint.style.opacity = '1';
});

window.addEventListener('dragleave', () => {
  dropHint.style.opacity = '0';
});

window.addEventListener('drop', async (event) => {
  event.preventDefault();
  dropHint.style.opacity = '0';

  const files = event.dataTransfer?.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  const result = await window.presenterAPI.loadHtmlFile(file.path);
  if (!result.ok) {
    statusText.textContent = result.error;
  }
});
