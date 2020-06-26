import fs from "fs"; 
import {app, BrowserWindow, Dialog, IpcMain, ipcMain} from "electron";
import * as path from "path";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;

console.log("Hello");
function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        //icon: `${path.join(__dirname, 'favicon.ico')}`,
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
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    mainWindow.show();
    // Emitted when the window is ready to be shown
    // This helps in showing the window gracefully.
    // mainWindow.once('ready-to-show', () => {
    //     if(mainWindow != null) {
    //         mainWindow.show()
    //     }
    // });

    ipcMain.on("save", (event, args) => {
        try {
            //fs.writeFileSync('myfile.txt', 'the text to write in the file', 'utf-8'); 
            fs.writeFileSync(args[0], args[1], 'utf-8');
    }
    catch(e) { alert('Failed to save the file !'); 
    }})

    //let filepath = "C:\Users\Saunie\Documents\GitHub\School\SDEV435\Final\electron\myfile.txt";
    //let fileName = 'toDo.json'

    ipcMain.on("read", (event, args) => {
        // dialog.showOpenDialog((fileNames) => {
        //     // fileNames is an array that contains all the selected
        //     if(fileNames === undefined){
        //         console.log("No file selected");
        //         return;
        //     }
        //var returnData;
        let fileName = args;
        console.log(fileName);        
        try{
            fs.readFile(fileName, 'utf-8', (err, data) => {
                // if(err){
                //     alert("An error ocurred reading the file :" + err.message);
                //     return;
                // }
                //returnData = data;
                event.returnValue=data;
                // Change how to handle the file content
                console.log("The file content is : " + data);
            });

            
        }
        catch(e)
        {
            alert('Failed to read the file; exception: ' + e)
        }
        })}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});