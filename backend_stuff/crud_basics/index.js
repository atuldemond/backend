const express = require("express");
const app = express();
const path= require("path")
var methodOverride = require('method-override')


//using for patch and Delete Request
app.use(methodOverride('_method'))

//getting post request data
app.use(express.urlencoded({extended:true}))
app.use(express.json());


//config public folder
app.use(express.static(path.join(__dirname,"public")))
//config view ejs
app.set("view engine","views");
app.set("views",path.join(__dirname,"views"))



//database

let datas = [
    {
        "id":0,
        "name":"Atul",
        "number":541
    },
    {
        "id":1,
        "name":"radha",
        "number":8651029001
    }



]


app.get("/",(req,res)=>{

res.send("This is Root Directory")

})

app.get("/home",(req,res)=>{
    
    res.render("home.ejs" ,{datas} )

})

app.get("/form",(req,res)=>{

    res.render("form.ejs")

})

app.post("/formdata",(req,res)=>{

let {id,name, number}= req.body
console.log(id,name,number)
datas.push({id,name,number});

 res.redirect("/home")
})



app.get("/profile/:id",(req,res)=>{

let {id}= req.params

let data = datas.find((p)=> id == p.id)


res.render("profile.ejs",{data})




})

app.get("/edit/:id",(req,res)=>{
    let {id}=req.params
    let data = datas.find((p)=> id == p.id)
   
   res.render("edit.ejs",{data}); 
 
    
 })
 //CRERATE REQUEST----------------------

app.get("/newpost",(req,res)=>{

res.render("newpost.ejs")


})

app.post("/newpostadd",(req,res)=>{

  let {id,name,number}=req.body;
  console.log(id);
  datas.push({id,name,number})
  res.redirect("/home")

})



 ///patch request :------------------UPDATE---------------

 app.patch("/edit/:id",(req,res)=>{
        
    let {id,name,number}= req.params
      
        let  newid = req.body.id
        let  newname = req.body.name
        let  newnum = req.body.number
 
            let data = datas.find((p)=> p.id ==id)

 
            console.log(data.id= newid)
            console.log(data.name=newname);
            console.log(data.number=newnum);

    
                console.log(data)

                    res.redirect("/home")


 })  



//  -----------------------------DELETE--------------------------------
app.delete("/home/:id",(req,res)=>{

let{ id }= req.params
console.log(id)
// datas = datas[]
datas = datas.filter((f) => id != f.id );///!= this will be noted
console.log(datas)
res.redirect("/home")


})









port=3000;

app.listen(port,()=>{


 console.log("Server is started"); 

})