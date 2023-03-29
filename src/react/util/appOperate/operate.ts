export function appClose() {
	if (window.ipcApi) {
		window.ipcApi.appClose();
	}
}
export function appMaximize() {
	if (window.ipcApi) {
		window.ipcApi.appMaxmize();
	}
}
export function appMinimize() {
	if (window.ipcApi) {
		window.ipcApi.appMinmize();
	}
}
export function appResize() {
	if (window.ipcApi) {
		window.ipcApi.appResize();
	}
}
