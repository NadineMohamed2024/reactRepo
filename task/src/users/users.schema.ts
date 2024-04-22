import * as mongoose from "mongoose"
export let usersSchema = new mongoose.Schema({
    name:String,
    email:String,
   password:String
})