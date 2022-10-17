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

document.querySelector('#submit-form').onclick=async ()=>{
    try{
        let r = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: document.querySelector('#input-title').value, text: document.querySelector('#input-text').value, pos:document.querySelector('#input-pos').value})
        })
        if(JSON.parse(await r.json()).status!==1){
            return alert('Помилка!')
        }
        alert('Готово!')
    }
    catch{
        alert('Помилка!')
    }

}

document.querySelector('#add-box-show').onclick = ()=>{
    console.log(1)
    document.querySelector('.add-box').style.display=document.querySelector('.add-box').style.display==='flex'?'none':'flex'
}

document.querySelector('#show-list').onclick=click_del

async function click_del(click=true){
    let arr = JSON.parse(await(await fetch('/api')).json())

    if(document.querySelector('.content-container').innerHTML!==''&&click){
        return document.querySelector('.content-container').innerHTML=''
    }
    else{
        document.querySelector('.content-container').innerHTML=''
    }

    for(let i=0; i<arr.length; i++){
        let div = document.createElement('div')
        div.className='content-line'
        div.innerHTML=`
                <div style="width: 20%; max-width: 20%" class="content">
                    <p>${arr[i].title}</p>
                </div>
                <div style="width:100%" class="content">
                    <p>${arr[i].text}</p>
                </div>
                <img style="cursor: pointer; border:1px solid black; padding: 5px; object-fit: contain; width: 40px;" onclick="editing(${i})" src="images/edit.png" alt="">
                <img style="cursor: pointer; border:1px solid black; padding: 5px; object-fit: contain; width: 40px;" onclick="delete_func(${i})" src="images/delete.png" alt="">
            `
        document.querySelector('.content-container').prepend(div)
    }
}

async function delete_func(id){
    console.log(id)
    await fetch('/delete', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id}),
    })
    click_del(false)
}


async function editing(id){
    //console.log(node)
    let modal = document.querySelector('.modal')
    modal.style.display='flex'
    setTimeout(()=>modal.style.opacity='1')

    document.querySelector('#modal-cancel-form').addEventListener('click', ()=>{
        modal.style.opacity='0'
        setTimeout(()=>modal.style.display='none',  500)
    })
    let form = document.querySelector('.content-container')
    document.querySelector('#modal-input-title').value=form.childNodes[form.childNodes.length-1-id].firstElementChild.firstElementChild.innerHTML
    document.querySelector('#modal-input-text').value=form.childNodes[form.childNodes.length-1-id].childNodes[3].firstElementChild.innerHTML

    document.querySelector('#modal-submit-form').onclick=async ()=>{
        await fetch('/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: document.querySelector('#modal-input-title').value,
                text: document.querySelector('#modal-input-text').value,
            }),
        })
        click_del(false)
        modal.style.opacity='0'
        setTimeout(()=>modal.style.display='none',  500)
    }
}
