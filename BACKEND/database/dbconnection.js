import mongoose from "mongoose";
export const dbconnection=()=>{
    mongoose.connect((process.env.MONGO_DB_URL),{
        dbName:"BHARAT_HOSPITAL",
    }).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(err)
    })
} 