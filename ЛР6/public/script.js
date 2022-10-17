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

async function dynamic_content(){
    let r = await fetch('/api')
    r = JSON.parse(await r.json())

    for(let one of r){
        let div = document.createElement('div')
        div.className='drop-box'
        div.setAttribute('data-position', one.pos)
        div.innerHTML=`<p>${one.title}</p>
                <div class="drop-content">
                    <p>${one.text}</p>
                </div>`

        document.querySelector('.user-content').prepend(div)
    }

    let boxes = document.querySelectorAll('.drop-box')
    for(let one of boxes){
        let attr = one.getAttribute('data-position').split('-')

        one.lastElementChild.style.left=(attr[0]==='right'?one.clientWidth:-one.lastElementChild.clientWidth)+'px'
        if(attr[1]==='top'){
            one.lastElementChild.style.top='0'
        }
        if(attr[1]==='bottom'){
            one.lastElementChild.style.bottom='0'
        }
        one.onclick = ()=>{
            one.lastElementChild.style.display=one.lastElementChild.style.display==='none'?'flex':'none'
        }
        one.lastElementChild.style.display='none'
        one.lastElementChild.style.opacity='1'
    }
}
dynamic_content()
