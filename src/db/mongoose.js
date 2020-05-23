let mongoose=require('mongoose')

let connectionURL=process.env.MONGO_URL

mongoose.connect(connectionURL,{
    useCreateIndex:true,
    useNewUrlParser:true
})



