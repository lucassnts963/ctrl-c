const { resolve, basename } = require('path')
const { app, Tray, Menu, clipboard } = require('electron')

let mainTray = {}

let clipboardHistory = [
    { label: 'Lucas', type: 'normal', click: ({ label }) => clipboard.writeText(label) },
]

app.whenReady().then(() => {
    mainTray = new Tray(resolve(__dirname, 'assets', 'iconTemplate.png'))
    
    render(mainTray)
})

function render (tray = mainTray) {

    const contextMenu = Menu.buildFromTemplate(clipboardHistory)
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
}
