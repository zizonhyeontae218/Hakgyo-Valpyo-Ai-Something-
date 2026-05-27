const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('presenterAPI', {
  next: () => ipcRenderer.send('presentation-next'),
  prev: () => ipcRenderer.send('presentation-prev'),
  onNext: (callback) => ipcRenderer.on('presentation-next', callback),
  onPrev: (callback) => ipcRenderer.on('presentation-prev', callback),
  onLoadHtml: (callback) => ipcRenderer.on('viewer-load-html', (_event, fileUrl) => callback(fileUrl)),
  loadHtmlFile: (filePath) => ipcRenderer.invoke('load-html-file', filePath),
});
