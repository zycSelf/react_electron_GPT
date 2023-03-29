import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron';
import service from './service/service';
import path from 'path';
const isDev = process.env.NODE_ENV === 'development';
let windowSizeBeforMaxmize: Electron.Rectangle | null = null;
let mainWindow: BrowserWindow | null = null;
const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		// transparent:true,
		// backgroundColor:"#00000000",
		// resizable: false,
		webPreferences: {
			preload: path.resolve(__dirname, 'preload.js'),
		},
	});
	service.listen(8088, () => {
		console.log('server is running');
	});
	// TODO set NODE_ENV 失效？ 待解决。
	// console.log(isDev);
	mainWindow.loadURL('http://localhost:3000/#');
	// isDev
	// 	? mainWindow.loadURL('http://localhost:3000/#')
	// 	: mainWindow.loadFile('dist/index.html');
};

function IpcOperate() {
	ipcMain.on('appClose', (event: Electron.IpcMainEvent, params) => {
		console.log('close');
		mainWindow && mainWindow.close();
		app.quit();
	});
	ipcMain.on('appMaxmize', (event: Electron.IpcMainEvent, params) => {
		if (mainWindow) {
			windowSizeBeforMaxmize = { ...mainWindow?.getBounds() };
			mainWindow.maximize();
		}
	});
	ipcMain.on('appMinmize', (event: Electron.IpcMainEvent, params) => {
		mainWindow && mainWindow.minimize();
	});
	ipcMain.on('appResize', (event: Electron.IpcMainEvent, params) => {
		if (windowSizeBeforMaxmize) {
			mainWindow?.setBounds(windowSizeBeforMaxmize, true);
		}
	});
}

app.whenReady().then(() => {
	IpcOperate();
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
