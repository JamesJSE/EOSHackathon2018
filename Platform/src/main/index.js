import { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, protocol } from 'electron'; // eslint-disable-line
import { join, normalize } from 'path';
import { autoUpdater } from 'electron-updater';

const appVersion = '1.0.0';

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-renderer-backgrounding');

if (process.env.NODE_ENV !== 'development') {
	global.__static = join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : 'blue://index.html';

/**
 * Initialise and create application Window
 */
function createWindow() {
	//setup app ico
	const iconPath = join(__static, 'android-chrome-192x192.png');
	const iconTrayPath = join(__static, 'favicon-16x16.png');
	const appIcon = nativeImage.createFromPath(iconPath);
	//..To review
	const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png';

	//Initial window options
	mainWindow = new BrowserWindow({
		height: 720,
		show: false,
		useContentSize: false,
		width: 380,
		transparent: true,
		frame: false,
		resizable: false,
		icon: appIcon,
		maximizable: false,
		webPreferences: {
			backgroundThrottling: false,
			nodeIntegrationInWorker: true,
			//If backgroundThrottling is disabled, the visibility state will remain visible even if the window is minimized, occluded, or hidden.
		},
	});

	//clean display of page loader approach
	//prevent flicker and display of loader until DOM ready
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	//force debug window
	//mainWindow.webContents.openDevTools();

	//Load App
	mainWindow.loadURL(winURL);

	//add tray icon support
	const trayIcon = nativeImage.createFromPath(iconPath);
	const tray = new Tray(iconPath);//appIcon iconPath

	mainWindow.on('show', () => {
		tray.setHighlightMode('always');
	});
	mainWindow.on('restore', () => {
		tray.setHighlightMode('always');
	});
	mainWindow.on('hide', () => {
		tray.setHighlightMode('never');
	});
	//easy targetable traymenu ref
	const arrayRef = [
		'title',
		'seperator_1',
		'settings',
		'logout',
		'seperator_2',
		'hide',
		'show',
		'quit',
	];
	//tray menu arr structure
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Top Secret Control Panel',
			enabled: false,
			icon: iconTrayPath,
		},
		{ type: 'separator' },
		{
			label: 'Settings',
			enabled: false,
			click: () => {
				mainWindow.webContents.send('route', 'settings');
				//if in tray show
				if (!mainWindow.isVisible()) {
					mainWindow.show();
				}
			},
		},
		{
			label: 'Log Out',
			enabled: false,
			click: () => {
				mainWindow.webContents.send('logoutApp');
				//if in tray show
				if (!mainWindow.isVisible()) {
					mainWindow.show();
				}
			},
		},
		{ type: 'separator' },
		{
			label: 'Hide App',
			visible: true,
		},
		{
			label: 'Show App',
			visible: false,
		},
		{
			label: 'Quit TeamBlue',
			click: () => {
				mainWindow.close();
				app.quit();
			},
		},
	]);

	contextMenu.items[arrayRef.indexOf('hide')].click = () => {
		mainWindow.hide();
		contextMenu.items[arrayRef.indexOf('hide')].visible = false;
		contextMenu.items[arrayRef.indexOf('show')].visible = true;
	};

	contextMenu.items[arrayRef.indexOf('show')].click = () => {
		mainWindow.show();
		contextMenu.items[arrayRef.indexOf('hide')].visible = true;
		contextMenu.items[arrayRef.indexOf('show')].visible = false;
	};

	//on tray icon click hide or show
	tray.on('click', () => {
		if (mainWindow.isVisible()) {
			mainWindow.hide();
			contextMenu.items[arrayRef.indexOf('hide')].visible = false;
			contextMenu.items[arrayRef.indexOf('show')].visible = true;
		} else {
			mainWindow.show();
			contextMenu.items[arrayRef.indexOf('hide')].visible = true;
			contextMenu.items[arrayRef.indexOf('show')].visible = false;
		}
	});

	//on close app hide it in tray
	ipcMain.on('hideApp', (event, arg) => {
		console.log('hide');
		mainWindow.hide();
		contextMenu.items[arrayRef.indexOf('hide')].visible = false;
		contextMenu.items[arrayRef.indexOf('show')].visible = true;
	});
	//on login update tray
	ipcMain.on('login', (event, arg) => {
		contextMenu.items[arrayRef.indexOf('settings')].enabled = true;
		contextMenu.items[arrayRef.indexOf('logout')].enabled = true;
	});
	//on logout update tray
	ipcMain.on('logout', (event, arg) => {
		contextMenu.items[arrayRef.indexOf('settings')].enabled = false;
		contextMenu.items[arrayRef.indexOf('logout')].enabled = false;
	});
	//Retrieve app version and send
	ipcMain.on('getAppVersion', (event, arg) => {
		//event.sender.send('updateAppVersion', app.getVersion()); //returns electron ver not package.json ver???
		event.sender.send('updateAppVersion', appVersion);
	});
	//update progress bar display
	ipcMain.on('updateProgressBar', (event, val) => {
		mainWindow.setProgressBar(val);
	});
	//setup autoLaunch capabilities
	ipcMain.on('autoLaunch', (event, action) => {
		if (process.env.NODE_ENV !== 'development') {
			//setup autolauncher
			const AutoLaunch = require('auto-launch');

			//setup autolauncher
			const TeamBlueAutoLauncher = new AutoLaunch({
				name: 'TeamBlue',
				path: app.getPath('exe'),
			});
			if (action.start) {
				TeamBlueAutoLauncher.isEnabled().then((isEnabled) => {
					if (isEnabled){
						return;
					}
					TeamBlueAutoLauncher.enable();
				}).catch((err) => {
					// handle error
					console.log(err);
				});
			} else {
				TeamBlueAutoLauncher.disable();
			}
		}
	});
	//set tray icon tooltip
	tray.setToolTip('Right Click Icon for Options.');
	//add context menu options
	tray.setContextMenu(contextMenu);
	//before app quit store user session to enable autologin

	//mainWindow.hide();
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

//check if second instance is running.. and show focus current app if active
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	if (mainWindow) {
		//if minimised restore
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		//if in tray show
		if (!mainWindow.isVisible()) {
			mainWindow.show();
		}
		//focus on app
		mainWindow.focus();
	}
});

//found second instance close this as prior is now open
if (isSecondInstance) {
  app.quit();
}
function sendStatusToWindow(text) {
	//log.info(text);
	mainWindow.webContents.send('message', text);
}
autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
	sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
	sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
	sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
	let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
	logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
	logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
	sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
	sendStatusToWindow('Update downloaded');
});

//https://github.com/electron/electron/blob/master/docs/api/protocol.md
//change file protocal to enables recaptcha capabilities
protocol.registerStandardSchemes(['blue'], { secure: true });

//on ready initialise app
app.on('ready', () => {
	protocol.registerFileProtocol('blue', (request, callback) => {
		let url = request.url.substr(10);
		//strip index only needed onload.
		if (!url.endsWith('index.html/')) {
			url = url.replace(/index.html\//, '');
		}
		callback({
			path: normalize(`${__dirname}/${url}`),
		});
	}, (error) => {
		if (error) console.error('Failed to register protocol');
	});
	createWindow();
	//autoUpdater.checkForUpdatesAndNotify();
});

//quit app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

//create app
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
