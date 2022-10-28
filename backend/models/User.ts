import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        unique: true
    },
    fullname:{
        type: String
    },
    profile_img:{
        type: String,
        default:""
    },
    banner:{
        type: String,
        default:""
    },
    interests:{
        type: [String],
        default:[]
    },
    email:{
        type: String,
        unique: true
    },
    bio:{
        type: String,
        default:""
    },
    post_counts:{
        type: Number,
        default:0
    }


})



