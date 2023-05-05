const { resolve } = require('path')
const { app, Tray, Menu, clipboard } = require('electron')

let mainTray = {}

let clipboardHistory = []

let lastClipboardText = ''

app.whenReady().then(() => {
    mainTray = new Tray(resolve(__dirname, 'assets', 'iconTemplate.png'))
    
    render(mainTray)

    clipboardWatcher()
})

function render (tray = mainTray) {
    const contextMenu = Menu.buildFromTemplate(clipboardHistory)
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
}

function clipboardWatcher() {
    setInterval(() => {
        let currentClipboardText = clipboard.readText()

        if (lastClipboardText !== currentClipboardText) {
            clipboardHistory.push({ label: currentClipboardText, type: 'normal', click: ({ label }) => clipboard.writeText(label) })
            render()
        }

        lastClipboardText = currentClipboardText
    }, 1000)
}
