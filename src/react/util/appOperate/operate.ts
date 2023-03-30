let ipcRenderer: any = null;

ipcRenderer = window.electron?.ipcRenderer;
export function appClose() {
	ipcRenderer && ipcRenderer.send('appClose');
}
export function appMaxmize() {
	ipcRenderer && ipcRenderer.send('appMaxmize');
}
export function appMinmize() {
	ipcRenderer && ipcRenderer.send('appMinmize');
}
export function appResize() {
	ipcRenderer && ipcRenderer.send('appResize');
}
export function apiKeyInput() {
	ipcRenderer && ipcRenderer.send('apiKeyInput');
}
