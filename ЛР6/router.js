const {Router} = require('express')
const fs = require('fs')

const routs = Router()

routs.get('/', (req, res)=>{
    res.sendFile(__dirname+'/public/index-mobile.html')
})
routs.get('/admin', (req, res)=>{
    res.sendFile(__dirname+'/public/admin.html')
})

routs.get('/api', async (req, res)=>{
    let data = JSON.parse(fs.readFileSync('data.txt').toString())
    res.json(JSON.stringify(data))
})

routs.post('/api', (req, res) =>{
    let obj = {
        title: req.body.title,
        text: req.body.text,
        pos: req.body.pos,
    }
    let data = JSON.parse(fs.readFileSync('data.txt').toString())
    data.push(obj)
    fs.writeFileSync('data.txt', JSON.stringify(data))
    res.json(JSON.stringify({status:1}))
})
routs.post('/delete', (req, res)=>{
    let data = JSON.parse(fs.readFileSync('data.txt').toString())
    data.splice(req.body.id, 1)
    fs.writeFileSync('data.txt', JSON.stringify(data))
    res.json('')
})
routs.post('/edit', (req, res)=>{
    let data = JSON.parse(fs.readFileSync('data.txt').toString())
    let temp = data[req.body.id].pos
    data[req.body.id]={
        title: req.body.title,
        text: req.body.text,
        pos: temp
    }
    fs.writeFileSync('data.txt', JSON.stringify(data))
    res.json('')
})

module.exports = routs
