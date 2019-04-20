const express=require('express')
const app =express()
const path=require('path')

const newPath=path.join(__dirname,'/')
console.log(newPath)
app.use(express.static(newPath))

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Express World</h1>')
})

app.get('/helloworld',(req,res)=>{
    res.send('Hello World')
})
app.get('/about',(req,res)=>{
    res.send('Hello About World')
})


app.listen(3000,()=>{
    console.log('Listening to Port 3000')
})