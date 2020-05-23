//here we will write all of our code related to application
require('dotenv').config({path:'./config/dev.env'})
let express=require("express")
let hbs=require('hbs')
let app=express()
let PORT=process.env.PORT
let path=require('path')
let mongoose=require('mongoose')
let bodyParser=require('body-parser')


require('./db/mongoose')
app.use(express.urlencoded())
app.use(express.json()) 
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","hbs")
//app.use(express.static(__dirname + '/View'));

//code to join this page with other page in the other folder that is public
let otherdirpath=path.join(__dirname,'../public')
//let partialsPath=path.join(__dirname,"../views/partials")
//set up static directry to serve
app.use(express.static(otherdirpath))
//hbs.registerPartials(partialsPath)

let User=mongoose.model('User',{
    username:{
        required:true,
        type:String,
        trim:true,

    },
    friends:[]

})

app.get('/friends.html',async(req,res)=>{
 res.sendFile(path.join(__dirname,'../views/friend.html'))
})

app.get('/',async (req,res)=>{ 
    res.render('home')
 
    
 })

 //to add the user to the database
app.post('/adduser',async(req,res)=>{
    
    
   
 let  username=req.body.username
    if(username===''){
        res.render('message',{
            message:'please enter username'
        })
    }else{
        let user=new User(req.body)
        await user.save()
        res.render('friend',{username:username})
    }
    
   
    
})

//to add the friend in the friend list
app.post('/addfriend',async(req,res)=>{
  
//to find for the user
let user=User.findOne({
    username:req.body.username
})


user.then( async (user)=>{
    let friend=req.body.friend.trim()
    if(friend===""){
        return res.render('message',{
            message:'enter friend name'
        })
    }

   await user.friends.push(friend)
    await user.save()
    
    let friendarray=user.friends
    
    res.render('message',{
        message:'new friend added to your list'
    })


}).catch((e)=>{
    res.render('message',{
        message:'the user of this name does not exist'
    })
})

})

//to get all the friends of the user
app.post('/friendlist',async(req,res)=>{
 
    let user=User.findOne({
        username:req.body.username
    })
    if(!user){
        let message='no such user exist'
      return  res.render('message',{
          message:message
      })
    }
    user.then((user)=>{
      
        if(user.friends.length==0){
           res.render('message',{
                message:'you have no friends in your friend list'
            })
        }else{
            res.render('friendlist',{
                username:user.username,
                friendlist:JSON.stringify(user.friends)
            })
        }
   
    }).catch((e)=>{
        res.status(400).send(e)
    })
})


app.use(express.static(__dirname + '/Script'));

//to start the server
app.listen(PORT,()=>{
    console.log("server has started on port "+PORT)
})
