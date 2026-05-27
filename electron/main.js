const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { app, BrowserWindow, ipcMain, screen } = require('electron');

let viewerWindow;
let scriptWindow;

const PRELOAD_PATH = path.join(__dirname, 'preload.js');

function calculateWindowBounds() {
  const displays = screen.getAllDisplays();
  const primary = screen.getPrimaryDisplay();

  if (displays.length >= 2) {
    const secondary = displays.find((d) => d.id !== primary.id) || displays[1];
    return { script: primary.workArea, viewer: secondary.workArea };
  }

  const area = primary.workArea;
  const halfWidth = Math.floor(area.width / 2);
  return {
    script: { x: area.x, y: area.y, width: halfWidth, height: area.height },
    viewer: { x: area.x + halfWidth, y: area.y, width: area.width - halfWidth, height: area.height },
  };
}

function createWindows() {
  const bounds = calculateWindowBounds();

  viewerWindow = new BrowserWindow({
    title: 'HTML Viewer',
    ...bounds.viewer,
    webPreferences: { preload: PRELOAD_PATH, contextIsolation: true, nodeIntegration: false, sandbox: false },
  });

  scriptWindow = new BrowserWindow({
    title: 'Presenter Script',
    ...bounds.script,
    webPreferences: { preload: PRELOAD_PATH, contextIsolation: true, nodeIntegration: false, sandbox: false },
  });

  viewerWindow.loadFile(path.join(__dirname, 'viewer-shell.html'));
  scriptWindow.loadFile(path.join(__dirname, 'script.html'));

  viewerWindow.on('closed', () => { viewerWindow = null; if (scriptWindow) scriptWindow.close(); });
  scriptWindow.on('closed', () => { scriptWindow = null; if (viewerWindow) viewerWindow.close(); });
}

app.whenReady().then(() => {
  createWindows();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindows();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

function sendViewerEvent(channel) {
  if (viewerWindow && !viewerWindow.isDestroyed()) {
    viewerWindow.webContents.send(channel);
  }
}

ipcMain.on('presentation-next', () => sendViewerEvent('presentation-next'));
ipcMain.on('presentation-prev', () => sendViewerEvent('presentation-prev'));

ipcMain.handle('load-html-file', async (_event, filePath) => {
  const ext = path.extname(filePath || '').toLowerCase();
  if (!['.html', '.htm'].includes(ext)) {
    return { ok: false, error: 'HTML 파일만 드롭할 수 있습니다.' };
  }

  try {
    const fileUrl = pathToFileURL(filePath).toString();
    sendViewerEvent('viewer-load-html', fileUrl);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `로드 실패: ${error.message}` };
  }
});
