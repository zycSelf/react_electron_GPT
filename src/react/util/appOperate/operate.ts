const { ipcRenderer } = window.electron;
export function appClose() {
	ipcRenderer.send('appClose');
}
export function appMaxmize() {
	ipcRenderer.send('appMaxmize');
}
export function appMinmize() {
	ipcRenderer.send('appMinmize');
}
export function appResize() {
	ipcRenderer.send('appResize');
}
