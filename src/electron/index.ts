import {
	app,
	BrowserWindow,
	ipcMain,
	Tray,
	Menu,
	nativeImage,
	shell,
} from 'electron';
import service from './service/service';
import path from 'path';
const isDev = process.env.NODE_ENV === 'development';
let windowSizeBeforMaxmize: Electron.Rectangle | null = null;
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
const image = nativeImage.createFromPath(
	path.join(__dirname, '../../assets/gpt/newiconTemplate.png'),
);
const isMac = process.platform === 'darwin';
const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		icon: image,
		// resizable: false,
		webPreferences: {
			// navigateOnDragDrop: true,
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

const contextMenu = Menu.buildFromTemplate([
	{
		label: 'View on GitHub',
		click: () => {
			shell.openExternal('https://github.com/zycSelf/react_electron_GPT');
		},
	},
	{
		label: 'Reload',
		accelerator: 'Command+R',
		click: () => {
			mainWindow && mainWindow.reload();
		},
	},
	{
		label: 'Quit',
		accelerator: 'Command+Q',
		click: () => {
			app.quit();
		},
	},
]);
const setTray = () => {
	const icon = image;
	icon.setTemplateImage(true);
	tray = new Tray(icon);
	tray.on('right-click', () => {
		tray?.popUpContextMenu(contextMenu);
	});
};
app.whenReady().then(() => {
	IpcOperate();
	createWindow();
	setTray();
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
