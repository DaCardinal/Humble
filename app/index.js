const electron = require('electron');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const ipcMain = electron.ipcMain;
const path = require('path');
const windowManager = require('electron-window-manager');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// const dev = (process.argv[2] == 'dev');
const dev = true;
if(dev) {
	require('electron-debug')();
	require('electron-reload')(__dirname + '/res/')
}

function createWindow () {
  windowManager.init({
      'appBase': path.join(__dirname),
      'assets': dev ? path.join(__dirname, '/assets') : `file://${__dirname}/res/assets`,
      'layouts': {
        'secondary':  dev ? path.join(__dirname, '/res/layouts/secondary.html') : `file://${__dirname}/res/lalyouts/secondary.html`,
        'primary': dev ? path.join(__dirname, '/res/layouts/primary.html') : `file://${__dirname}/res/la;youts/primary.html`
      },
      'defaultLayout': 'primary'
  });
  windowManager.setDefaultSetup({'width': 600, 'height': 450, 'position': 'right'});
  windowManager.templates.set('big', {
        'width': 1020,
        'height': 680,
        'minHeight': 680,
        'minWidth': 640,
        'resizable': true,
        'layout': 'primary',
        'showDevTools': true,
        'frame': false,
        'node-integration': true,
        'titleBarStyle': 'hidden',
        'transparent': false,
        'show': false,
        'backgroundColor': '#1E1E1E',
        'title': 'App name, for small windows!',
        'webPreferences':{
          'webSecurity' :true,
          'javascript': true
        },
        'onLoadFailure': function(){ }
    });
  windowManager.templates.set('small', {
        'width': 640,
        'height': 480,
        'minHeight': 480,
        'minWidth': 640,
        'resizable': false,
        'layout': 'primary',
        'showDevTools': true,
        'frame': false,
        'node-integration': true,
        'transparent': false,
        'backgroundColor': '#1E1E1E',
        'titleBarStyle': 'hidden',
        'title': 'App name, for small windows!',
        'webPreferences':{
          'webSecurity' :true
        },
        'onLoadFailure': function(){ }
    });
  
  mainWindow = windowManager.createNew('login', 'Login window', dev ? 'http://localhost:8080' : `file://${__dirname}/res/index.html`,'small', true);
  // console.log(`file://${__dirname}/res/index.html`);
  // console.log(mainWindow);
  mainWindow.create();
  mainWindow.object.on('ready-to-show', function() {
      mainWindow.object.show();
      mainWindow.object.focus();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows. #002b36
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('login-success', function (event, arg) {
	console.log('login success');
	let win = windowManager.get('login');
	let newWindow = windowManager.createNew('home', 'Main window', 'http://localhost:8080/#/main','big', true);
	// win.close();
  win.destroy();
	newWindow.useLayout('secondary');
	newWindow.create();
	newWindow.object.on('ready-to-show', function() {
		newWindow.object.show();
		newWindow.object.focus();
	});
});

ipcMain.on('logout-success', function (event, arg) {
	console.log('logout success');
	let win = windowManager.get('home');
	let newWindow = windowManager.createNew('login', 'Login window', 'http://localhost:8080/#/login','small', true);

	newWindow.useLayout('primary');
	newWindow.create();
	newWindow.object.on('ready-to-show', function() {
		newWindow.object.show();
		newWindow.object.focus();
	});
	win.close();
});
