// import { app, BrowserWindow, ipcMain } from 'electron';
// import { join } from 'path';
// import { writeFileSync } from 'fs';

// function createWindow () {
// 	const win = new BrowserWindow({
// 		fullscreen: true,
// 		// width: 12000,
// 		// height: 1000,
// 	    resizable: false,
// 		show: false,
// 		icon:"hacker123.ico",
// 		webPreferences: {
// 			preload: join(__dirname, 'preload.js')
// 		}
// 	});
// 	win.on("ready-to-show", win.show);

// 	ipcMain.handle('create-file', (req, data) => {
// 		if (!data || !data.title || !data.content) return false;

// 		const filePath = join(__dirname, 'notes', `${data.title}.txt`);
// 		writeFileSync(filePath, data.content);

// 		return { success: true, filePath };
// 	})

// 	win.loadFile('src/index.html');
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
// 	if (process.platform !== 'darwin') app.quit();
// })

const { app, BrowserWindow, ipcMain } = require('electron');
const reload = require('electron-reload'); // Import electron-reload
const path = require('path'); // Use path instead of join

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    show: false,
    icon: path.join(__dirname, 'hacker123.ico'), // Use path.join
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use path.join
    },
  });
  win.on('ready-to-show', win.show);

  ipcMain.handle('create-file', (req, data) => {
    if (!data || !data.title || !data.content) return false;

    const filePath = path.join(__dirname, 'notes', `${data.title}.txt`);
    writeFileSync(filePath, data.content);

    return { success: true, filePath };
  });

  win.loadFile('src/index.html');
}

// Enable hot reloading
reload(__dirname, {
  // Optional: Specify extensions to watch (defaults to ['*.js', '*.html', '*.css'])
  extensions: ['*.js', '*.html', '*.css'], // Add '.css' for CSS changes
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
