const { app, BrowserWindow, globalShortcut, nativeTheme } = require("electron");

class MainWindow {
	constructor(windowProps = {}, shortcuts = {}) {
		this.shortcuts = shortcuts;
		this.windowProps = windowProps;
	}

	createWindow() {
		app.whenReady().then(() => {
			let win = new BrowserWindow(this.windowProps);
			nativeTheme.themeSource = "light";
			win.removeMenu();
			win.loadFile("app/renderer/index.html");
			//win.webContents.openDevTools()

			app.on("ready", () => {
				for (shortcut in this.shortcuts) {
					globalShortcut.register(shortcut, this.shortcuts[shortcut]);
				}
			});
		});
	}
}

module.exports = MainWindow;
