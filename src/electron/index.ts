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
let mainWindow: BrowserWindow | undefined = undefined;
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
			nodeIntegration: true,
			contextIsolation: false,
			preload: path.resolve(__dirname, 'preload.js'),
		},
	});
	service.listen(8088, () => {
		console.log('server is running');
	});
	// TODO set NODE_ENV 失效？ 待解决。
	// console.log(isDev);
	// mainWindow.loadFile('dist/index.html');
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
	ipcMain.on('apiKeyInput', (event: Electron.IpcMainEvent, params) => {
		const apiKeyWindow = new BrowserWindow({
			width: 400,
			height: 300,
			resizable: false,
			parent: mainWindow,
		});
		apiKeyWindow.on('ready-to-show', () => {
			apiKeyWindow.show();
		});
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

// const dockMenu = Menu.buildFromTemplate([
// 	{
// 		label: 'New Window',
// 		click() {
// 			console.log('New Window');
// 		},
// 	},
// 	{
// 		label: 'New Window with Settings',
// 		submenu: [{ label: 'Basic' }, { label: 'Pro' }],
// 	},
// 	{ label: 'New Command...' },
// ]);
const setTray = () => {
	const icon = image;
	icon.setTemplateImage(true);
	tray = new Tray(icon);
	tray.on('right-click', () => {
		tray?.popUpContextMenu(contextMenu);
	});
	tray.on('click', () => {
		const trayBounds = tray?.getBounds();
		if (trayBounds) {
			mainWindow?.setBounds(
				{
					x: trayBounds.x - 250,
					y: trayBounds.y,
					width: 500,
					height: 600,
				},
				true,
			);
		}
		mainWindow && mainWindow.show();
	});
};
app
	.whenReady()
	.then(() => {
		// if (process.platform === 'darwin') {
		// 	app.dock.setMenu(dockMenu);
		// }
	})
	.then(() => {
		IpcOperate();
		createWindow();
		setTray();
		ipcMain.emit('test', '12312312');
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
