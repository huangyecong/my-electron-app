// main.js 主进程

//使用 CommonJS 语法导入了两个 Electron 模块：
//app它着您应用程序的事件生命周期。BrowserWindow它负责创建和管理应用窗口。

const { app, BrowserWindow } = require('electron')
// const WinState = require('electron-win-state').default //保持窗口的状态，比如上次你把窗口拉动到800*800，那么下次打开还是800*800

/*这里需要注意，
 *WinState的defaultWidth、defaultHeight会和BrowserWindow中的width、height会有冲突，
 *所以如果要WinState的宽高生效，就必须不写BrowserWindow的宽高
 */
const createWindow = () => {
  // const winState = new WinState({
  //   defaultWidth: 1000,
  //   defaultHeight: 800,
  // })

  // 1、创建一个父窗口1
  const win = new BrowserWindow({
    // ...winState.winOptions,
    width: 1000,// 窗口的宽度
    height: 800,// 窗口的高度
    x: 100, // 窗口距离x轴的距离
    y: 100, // 窗口距离y轴的距离
    // frame:false,// 不显示窗口菜单栏目
    show: false, //显示窗口 和ready-to-show 配合使用
    // titleBarStyle: 'hidden',
    backgroundColor: '#653579',
  })

  win.loadFile('index.html')

  // win.loadURL('https://www.electronjs.org/')

  const wc = win.webContents
  wc.openDevTools() // 打开开发者工具

  // win.webContents不仅可以打开开发者工具，还能用来监听资源、节点是否加载完毕、右键上下文
  wc.on('did-finish-load', () => {
    console.log('finished!')
  }) //资源加载完毕

  wc.on('dom-ready', () => {
    console.log('dom-ready!')
  }) //dom节点加载完毕

  wc.on('context-menu', (e, params) => {
    console.log('click right menu~')
    console.log('params=', params)
    // 往页面里面注入一个js方法（右键选择页面文本时，弹窗显示文本）
    wc.executeJavaScript(console.log(`selected text is : ${params.selectionText}`))
  }) //监听 右键上下文

  // 用户打开应用就有页面
  win.on('ready-to-show', () => {
    win.show()
  })

  // winState.manage(win)

  // 2、创建一个子窗口2
  // const win2 = new BrowserWindow({
  //   width: 500,
  //   height: 400,
  //   parent: win,
  //   model: true
  // })
  // win2.loadURL('https://juejin.cn/')
} //createWindow() 函数将您的页面加载到新的 BrowserWindow 实例中

/*
 *在关闭一个应用的所有窗口后让它退出。
 *要在您的Electron应用中实现这一点，您可以监听 app 模块的 window-all-closed 事件，
 *并调用 app.quit() 来退出您的应用程序。
 *此方法不适用于 macOS。
 */
app.on('window-all-closed', () => {
  // macOS的平台名字darwin
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  // 如果没有窗口打开则打开一个窗口 (macOS)
  // 因为窗口无法在 ready 事件前创建，你应当在你的应用初始化后仅监听 activate 事件。 要实现这个，仅监听 whenReady() 回调即可。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}) //在应用准备就绪时调用函数
