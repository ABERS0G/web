localStorage.setItem('log', '')

let wa = document.getElementById("work-area")
wa.style.height = document.documentElement.clientHeight/100*90+'px'
wa.style.width = document.documentElement.clientWidth/100*40-10+'px'

let ballRadius_css = 10
document.querySelector('#ball1').style.height=ballRadius_css*2+'px'
document.querySelector('#ball1').style.width=ballRadius_css*2+'px'
document.querySelector('#ball2').style.height=ballRadius_css*2+'px'
document.querySelector('#ball2').style.width=ballRadius_css*2+'px'

let x1_css = (Math.floor(Math.random() * (wa.clientWidth-ballRadius_css*2)))
let y1_css = wa.clientHeight - ballRadius_css*2
let dx1_css = Math.floor(Math.random() * 2)===1?4:-4
let dy1_css = Math.floor(Math.random() * 2)===1?4:-4

let x2_css = (Math.floor(Math.random() * (wa.clientWidth-ballRadius_css*2)))
let y2_css = 0
let dx2_css = Math.floor(Math.random() * 2)===1?4:-4
let dy2_css = Math.floor(Math.random() * 2)===1?4:-4

document.querySelector('.work-container').style.display='none'

console.log(`x1: ${x1}; x2: ${x2}`)

function drawBall_css(x, y, num) {
    let b = document.querySelector(`#ball${num}`)
    b.style.top = y + 'px'
    b.style.left = x + 'px'
}

function draw_css() {
    drawBall_css(x1_css, y1_css, 1)
    drawBall_css(x2_css, y2_css, 2)

    if((y1_css+ballRadius_css*2<wa.clientHeight/2&&y2_css+ballRadius_css*2<wa.clientHeight/2)||(y1_css-ballRadius_css*2>wa.clientHeight/2&&y2_css-ballRadius_css*2>wa.clientHeight/2)){
        document.querySelector('#reload-button-css').style.backgroundColor='orange'
        document.querySelector('#reload-button-css').style.opacity='1'
        reload_enable=true
        log_css.innerHTML='Два круга на одній половині'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Два круга на одній половині<br><br>')
        return clearInterval(interval_css)
    }
    if(y1_css<=1&&y2_css<=1||y1_css>=wa.clientHeight-ballRadius_css*2-1&&y2_css>=wa.clientHeight-ballRadius_css*2-1){
        document.querySelector('#reload-button-css').style.backgroundColor='orange'
        document.querySelector('#reload-button-css').style.opacity='1'
        reload_enable_css=true
        log_css.innerHTML='Розміщення кругів на одній стінці'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Розміщення кругів на одній стінці<br><br>')
        return clearInterval(interval_css)
    }
    if(x1_css<=1&&x2_css<=1||x1_css>=wa.clientHeight-ballRadius_css*2-1&&x2_css>=wa.clientHeight-ballRadius_css*2-1){
        document.querySelector('#reload-button-css').style.backgroundColor='orange'
        document.querySelector('#reload-button-css').style.opacity='1'
        reload_enable_css=true
        log_css.innerHTML='Розміщення кругів на одній стінці'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Розміщення кругів на одній стінці<br><br>')
        return clearInterval(interval_css)
    }

    let vecX = (x2_css+ballRadius_css)-(x1_css+ballRadius_css), vecY = (y2_css+ballRadius_css)-(y1_css+ballRadius_css)
    let module = Math.sqrt(Math.pow(vecX, 2)+Math.pow(vecY, 2))

    if(module<ballRadius_css*2){
        dx1_css = -dx1_css
        dy1_css = -dy1_css
        dx2_css = -dx2_css
        dy2_css = -dy2_css
        log_css.innerHTML='Круги доторкнулись'
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Круги доторкнулись<br><br>')
    }
    else{
        if(x1_css + dx1_css > wa.clientWidth-ballRadius_css*2 || x1_css + dx1_css < 0) {
            dx1_css = -dx1_css
            log_css.innerHTML='Синій круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Синій круг доторкнувся до стінки<br><br>')
        }
        if(y1_css + dy1_css > wa.clientHeight-ballRadius_css*2 || y1_css + dy1_css < 0) {
            dy1_css = -dy1_css
            log_css.innerHTML='Синій круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Синій круг доторкнувся до стінки<br><br>')
        }

        if(x2_css + dx2_css > wa.clientWidth-ballRadius_css*2 || x2_css + dx2_css < 0) {
            dx2_css = -dx2_css
            log_css.innerHTML='Жовтий круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Жовтий круг доторкнувся до стінки<br><br>')
        }
        if(y2_css + dy2_css > wa.clientHeight - ballRadius_css*2 || y2_css + dy2_css < 0) {
            dy2_css = -dy2_css
            log_css.innerHTML='Жовтий круг доторкнувся до стінки'
            let str = localStorage.getItem('log')
            localStorage.setItem('log', str+='Жовтий круг доторкнувся до стінки<br><br>')
        }
    }

    x1_css += dx1_css
    y1_css += dy1_css

    x2_css += dx2_css
    y2_css += dy2_css
}

let interval_css


document.querySelector('#start-button-css').onclick=()=>{
    document.querySelector('.work-container').style.display='flex'
    setTimeout(()=>document.querySelector('.work-container').style.opacity='1')
    interval_css = setInterval(draw_css, 10)

    document.querySelector('#exit-button-css').onclick = ()=>{
        document.querySelector('.work-container').style.opacity='0'
        setTimeout(()=>document.querySelector('.work-container').style.display='none', 400)
        clearInterval(interval_css)
        let str = localStorage.getItem('log')
        localStorage.setItem('log', str+='Натиснута кнопка Exit<br><br>')
        document.querySelector('#show-log').innerHTML=localStorage.getItem('log')
    }
    log_css.innerHTML='Натиснута кнопка Start'
    let str = localStorage.getItem('log')
    localStorage.setItem('log', str+='Натиснута кнопка Start<br><br>')
}

document.querySelector('#reload-button-css').onclick=reload_func

let reload_enable_css = false
function reload_func(){
    if(!reload_enable_css){
        return
    }

    log_css.innerHTML='Натиснута кнопка Reload'
    let str = localStorage.getItem('log')
    localStorage.setItem('log', str+='Натиснута кнопка Reload<br><br>')

    x1_css = (Math.floor(Math.random() * (wa.clientWidth-ballRadius_css*2)))
    y1_css = wa.clientHeight - ballRadius_css*2
    dx1_css = Math.floor(Math.random() * 2)===1?-4:-4
    dy1_css = Math.floor(Math.random() * 2)===1?4:-4

    x2_css = (Math.floor(Math.random() * (wa.clientWidth-ballRadius_css*2)))
    y2_css = 0
    dx2_css = Math.floor(Math.random() * 2)===1?-4:-4
    dy2_css = Math.floor(Math.random() * 2)===1?4:-4

    interval_css = setInterval(draw_css, 10)
    document.querySelector('#reload-button-css').style.backgroundColor='grey'
    document.querySelector('#reload-button-css').style.opacity='0.7'
    reload_enable_css=false
}
