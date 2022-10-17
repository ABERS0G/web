localStorage.setItem('log', '')

let canvas = document.getElementById("myCanvas")
canvas.setAttribute('height', document.documentElement.clientHeight/100*90+'px')
canvas.setAttribute('width', document.documentElement.clientWidth/100*40-10+'px')
let ctx = canvas.getContext("2d")
let ballRadius = 10

let x1 = (Math.floor(Math.random() * (canvas.width-ballRadius*2))+ballRadius)
let y1 = canvas.height - ballRadius
let dx1 = Math.floor(Math.random() * 2)===1?4:-4
let dy1 = Math.floor(Math.random() * 2)===1?4:-4

let x2 = (Math.floor(Math.random() * (canvas.width-ballRadius*2))+ballRadius)
let y2 = ballRadius
let dx2 = Math.floor(Math.random() * 2)===1?4:-4
let dy2 = Math.floor(Math.random() * 2)===1?4:-4

console.log(`x1: ${x1}; x2: ${x2}`)

function drawBall(x, y, color) {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall(x1, y1, "#0095DD")
    drawBall(x2, y2, 'orange')

    if((y1+ballRadius*2<canvas.height/2&&y2+ballRadius*2<canvas.height/2)||(y1-ballRadius*2>canvas.height/2&&y2-ballRadius*2>canvas.height/2)){
        document.querySelector('#reload-button').style.backgroundColor='orange'
        document.querySelector('#reload-button').style.opacity='1'
        reload_enable=true
        log.innerHTML='Два круга на одній половині'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Два круга на одній половині<br><br>')
        return clearInterval(interval)
    }
    /*if((x1+ballRadius*2<canvas.width/2&&x2+ballRadius*2<canvas.width/2)||(x1-ballRadius*2>canvas.width/2&&x2-ballRadius*2>canvas.width/2)){
        document.querySelector('#reload-button').style.backgroundColor='orange'
        document.querySelector('#reload-button').style.opacity='1'
        reload_enable=true
        return clearInterval(interval)
    }*/
    if(y1<=ballRadius&&y2<=ballRadius||y1>=canvas.height-ballRadius-1&&y2>=canvas.height-ballRadius-1){
        document.querySelector('#reload-button').style.backgroundColor='orange'
        document.querySelector('#reload-button').style.opacity='1'
        reload_enable=true
        log.innerHTML='Розміщення кругів на одній стінці'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Розміщення кругів на одній стінці<br><br>')
        return clearInterval(interval)
    }

    let vecX = x2-x1, vecY = y2-y1
    let module = Math.sqrt(Math.pow(vecX, 2)+Math.pow(vecY, 2))

    if(module<ballRadius*2){
        dx1 = -dx1
        dy1 = -dy1
        dx2 = -dx2
        dy2 = -dy2
        log.innerHTML='Круги доторкнулись'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Круги доторкнулись<br><br>')
    }
    else{
        if(x1 + dx1 > canvas.width-ballRadius || x1 + dx1 < ballRadius) {
            dx1 = -dx1
            log.innerHTML='Синій круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Синій круг доторкнувся до стінки<br><br>')
        }
        if(y1 + dy1 > canvas.height-ballRadius || y1 + dy1 < ballRadius) {
            dy1 = -dy1
            log.innerHTML='Синій круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Синій круг доторкнувся до стінки<br><br>')
        }

        if(x2 + dx2 > canvas.width-ballRadius || x2 + dx2 < ballRadius) {
            dx2 = -dx2
            log.innerHTML='Жовтий круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Жовтий круг доторкнувся до стінки<br><br>')
        }
        if(y2 + dy2 > canvas.height-ballRadius || y2 + dy2 < ballRadius) {
            dy2 = -dy2
            log.innerHTML='Жовтий круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Жовтий круг доторкнувся до стінки<br><br>')
        }
    }

    x1 += dx1
    y1 += dy1

    x2 += dx2
    y2 += dy2
}

let interval

document.querySelector('#start-button').onclick=()=>{
    document.querySelector('.canvas-container').style.display='flex'
    setTimeout(()=>document.querySelector('.canvas-container').style.opacity='1')
    interval = setInterval(draw, 10)

    document.querySelector('#exit-button').onclick = ()=>{
        document.querySelector('.canvas-container').style.opacity='0'
        setTimeout(()=>document.querySelector('.canvas-container').style.display='none', 400)
        clearInterval(interval)
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Натиснута кнопка Exit<br><br>')
        document.querySelector('#show-log').innerHTML=localStorage.getItem('log')
    }
    log.innerHTML='Натиснута кнопка Start'
    let str = localStorage.getItem('log')
    localStorage.setItem('log', str+='Натиснута кнопка Start<br><br>')
}

document.querySelector('#reload-button').onclick=reload_func

let reload_enable = false
function reload_func(){
    if(!reload_enable){
        return
    }

    log.innerHTML='Натиснута кнопка Reload'
    let str = localStorage.getItem('log')
    localStorage.setItem('log', str+='Натиснута кнопка Reload<br><br>')

    x1 = (Math.floor(Math.random() * (canvas.width-ballRadius*2))+ballRadius)
    y1 = canvas.height - ballRadius
    dx1 = Math.floor(Math.random() * 2)===1?4:-4
    dy1 = Math.floor(Math.random() * 2)===1?4:-4

    x2 = (Math.floor(Math.random() * (canvas.width-ballRadius*2))+ballRadius)
    y2 = ballRadius
    dx2 = Math.floor(Math.random() * 2)===1?4:-4
    dy2 = Math.floor(Math.random() * 2)===1?4:-4

    interval = setInterval(draw, 10)
    document.querySelector('#reload-button').style.backgroundColor='grey'
    document.querySelector('#reload-button').style.opacity='0.7'
    reload_enable=false
}
