const MainWindow = require("./components/Window/window.js");

const win = new MainWindow(
	{
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
		frame: true,
	},
	{
		f5: function () {
			win.reload();
		},
	}
);

win.createWindow();
