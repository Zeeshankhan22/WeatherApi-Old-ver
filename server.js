const express=require("express")
const https=require("https")
const bodyparser=require("body-parser")
const app=express()

app.use(bodyparser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")



})

app.post('/',function(req,res){

    const cityname=req.body.citynames
    
const city=cityname
const id="d51dc9bc6179a29ff70fb7a5a4e05251"
const units="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+id+"&units="+units

https.get(url,function(response){
    console.log(response.statusCode)

    response.on('data',function(data){
        const wea=JSON.parse(data)
        const temp=wea.main.temp
        const des=wea.weather[0].description
        const icon=wea.weather[0].icon
        const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"


        res.write("<h1>"+city+" Temp is : "+temp+" Celsius</h1>")
        res.write("<h1>"+city+" Weather is: "+des+"</h1>")
        res.write("<img src="+imageurl+">")
        res.send()


    })

})

})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server Run's on 3000 Port");
})