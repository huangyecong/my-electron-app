const { contextBridge,ipcRenderer } = require('electron')

// 该脚本通过versions 这一全局变量，将electron的process.versions对象暴露给渲染器

// 将应用中的Chrome、Node、Electron版本号暴露至渲染器的预加载脚本
contextBridge.exposeInMainWorld('versions',{
  node:()=> process.versions.node,
  chrome:()=> process.versions.chrome,
  electron:()=> process.versions.electron,
  // 在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）。
  ping:()=> ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
 
})