const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
	const win = new BrowserWindow({
		// fullscreen: true,
		width: 12000,
		height: 1000,
	    resizable: false,
		show: false,
		icon:"hacker123.ico",
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});
	win.on("ready-to-show", win.show);

	ipcMain.handle('create-file', (req, data) => {
		if (!data || !data.title || !data.content) return false;

		const filePath = path.join(__dirname, 'notes', `${data.title}.txt`);
		fs.writeFileSync(filePath, data.content);

		return { success: true, filePath };
	})

	win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})