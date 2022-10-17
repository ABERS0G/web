if(localStorage.getItem('styles')){
    let data = JSON.parse(localStorage.getItem('styles'))

    for(let element of data){
        for(let one of document.styleSheets[0].cssRules){
            if(one.selectorText===element.tag){
                for(let two of element.css){
                    one.style[two.split(':')[0]]=two.split(':')[1]
                }
            }
        }
    }
}

if(document.cookie){
    if(confirm(`Видалити кукі? (${document.cookie})`)){
        document.cookie=`number=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
    }
}
if(localStorage.getItem('color')){
    let color = localStorage.getItem('color')
    for(let one of document.querySelectorAll('.block')){
        one.style.border=`1px solid ${color}`
    }
}

let dev_show = document.querySelector('#dev-show')
let dev_active=false

document.querySelector('#dev-instrument').style.left=document.querySelector('#dev-instrument').offsetWidth+'px'
document.querySelector('#dev-show').style.left='-'+document.querySelector('#dev-instrument').offsetWidth+'px'
document.querySelector('#dev-show').style.width=document.querySelector('#dev-instrument').offsetWidth+'px'

document.querySelector('.dev-menu>img').onclick=()=>{
    if(dev_active){
        document.querySelector('#dev-instrument').style.left=document.querySelector('#dev-instrument').offsetWidth+'px'
        setTimeout(()=>dev_show.style.display='none', 500)
        dev_active=false
    }
    else{
        dev_show.style.display='block'
        setTimeout(()=>document.querySelector('#dev-instrument').style.left='0px', 0)
        dev_active=true
    }
}
dev_show.style.display='none'

document.querySelector('#button').onclick=()=>{
    let hamburger = document.querySelector('.hamburger').classList
    if(hamburger.contains('active')){
        hamburger.remove('active')
        document.querySelector('#hamburger-menu').style.display='none'
        document.querySelector('.mobile-menu').style.height='auto'
    }
    else{
        hamburger.add('active')
        document.querySelector('#hamburger-menu').style.display='flex'
        document.querySelector('.mobile-menu').style.height='100%'

    }
}

document.querySelector('#func1').onclick=()=>{
    let temp = b2.innerHTML
    b2.innerHTML=b5.innerHTML
    b5.innerHTML=temp
}
document.querySelector('#func2').onclick=()=>{
    document.querySelector('#result-in4').innerHTML=`Площа блоку 4: <b>${b4.offsetWidth*b4.offsetHeight}px</b>`
}
document.querySelector('#func3').onclick=()=>{
    let color = prompt('Який колір?', '')
    for(let one of document.querySelectorAll('.block')){
        one.style.border=`1px solid ${color}`
    }
    localStorage.setItem('color', color);
}

document.querySelector('#submit-number').onclick=()=>{
    let data = document.querySelector('#input-number')
    if(isNaN(+data.value)){
        alert('Введіть число!')
        data.value=''
    }
    else{
        let temp = data.value.split('').reverse().join('')
        alert(temp)
        document.cookie=`number=${temp}`
    }
}


document.querySelector('#X-button').onclick=()=>{
    let form = document.querySelector('#form5')
    if(form.style.display==='none'){
        form.style.display='block'
    }
    else{
        form.style.display='none'
    }
}
document.querySelector('#save-button').onclick = ()=>{
    let tag = document.querySelector('#input-tag')
    let css = document.querySelector('#input-tag-style')

    let tag_text = tag.value.match(/\w/g).join('')
    let css_text = css.value.split(' ').join('').split(';')

    for(let one of document.styleSheets[0].cssRules){
        if(one.selectorText===tag_text){
            for(let two of css_text){
                one.style[two.split(':')[0]]=two.split(':')[1]
            }
        }
    }
    let prev = localStorage.getItem('styles')
    if(prev){
        let data = JSON.parse(prev)
        for(let one of data){
            if(one.tag===tag_text){
                one.css=css_text
                return
            }
        }
        data.push({tag:tag_text, css:css_text})
        localStorage.setItem('styles', JSON.stringify(data))
    }
    else {
        let array = [{tag:tag_text, css:css_text}]
        localStorage.setItem('styles', JSON.stringify(array))
    }
}

document.querySelector('#delete-button').onclick=()=>{
    let data = JSON.parse(localStorage.getItem('styles'))
    for(let element of data){
        console.log(element)
        for(let one of document.styleSheets[0].cssRules){
            if(one.selectorText===element.tag){
                for(let two of element.css){
                    one.style[two.split(':')[0]]=''
                }
            }
        }
    }
    localStorage.removeItem('styles')
}

document.querySelector('#form5').style.display='none'
