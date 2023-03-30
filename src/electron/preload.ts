import electron from 'electron';

window.electron = electron;
// contextBridge.exposeInMainWorld('ipcApi', {
// 	clickGPT: () => ipcRenderer.send('clickGPT'),
// 	appClose: () => ipcRenderer.send('appClose'),
// 	appMaxmize: () => ipcRenderer.send('appMaxmize'),
// 	appMinmize: () => ipcRenderer.send('appMinmize'),
// 	appResize: () => ipcRenderer.send('appResize'),
// });
