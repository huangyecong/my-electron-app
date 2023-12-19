const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome(v${versions.chrome()})，Node.js(v${versions.node()})，和Electron(v${versions.electron()})`

// 将发送器与接收器设置完成之后，通过定义的‘ping’通道从渲染器发送至主进程中
const func = async ()=>{
  const response = await window.versions.ping()
  console.log(response)// 打印‘pong’
}

func()