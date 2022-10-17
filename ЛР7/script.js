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
