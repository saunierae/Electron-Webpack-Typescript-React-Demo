import fs from "fs"; 
import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";

// Keep a global reference of the window object, otherwise it will be garbage collected.
let mainWindow: BrowserWindow | null = null;

var outputVars = {};
var numSections = {
    sectionNum: 0,    
};

console.log("Hello");
function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    });

    // This block of code is intended for development purpose only.
    // Delete this entire block of code when you are ready to package the application.
    // if(!app.isPackaged) {
    //     mainWindow.loadURL('http://localhost:3000/');
    // } else {
        //Do not delete this statement, Use this piece of code when packaging app for production environment
        console.log(__dirname);
        mainWindow.loadFile(`${path.join(__dirname, '../../web/dist/index.html')}`);
    // }

    // Open the DevTools and also disable Electron Security Warning.
    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    });

    // Shows the window
    mainWindow.show();
    // This helps in showing the window gracefully, but was causing issues with mine
    // mainWindow.once('ready-to-show', () => {
    //     if(mainWindow != null) {
    //         mainWindow.show()
    //     }
    // });

    // Save information to disk
    ipcMain.on("save", (event, args) => {
        try {
            fs.writeFileSync(args[0], args[1], 'utf-8');
            event.returnValue = null;
            console.log("args: " + args);
            console.log("Data saved to file: " + args[1]);
    }
    catch(e) { alert('Failed to save the file !'); 
    }})

    // Read in information from disk
    ipcMain.on("read", (event, args) => {
        let fileName = args;
        console.log(fileName);        
        try{
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if (data) {
                    event.returnValue=JSON.parse(data);
                }
                else {
                    event.returnValue={journals: []};
                }
                console.log("The file content is : " + data);
            });
        }
        catch(e)
        {
            alert('Failed to read the file; exception: ' + e)
        }
        })}

// Electron completes initializing and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

// Recreating the window if clicked
app.on('activate', function () {
    if (mainWindow === null) createWindow()
});