import mongoose, {Schema,Document} from 'mongoose';

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    isVerified:boolean;
    verificationCode:string;
    verificationCodeExpires:Date;
    mycourses:string[];
}

const UserSchmea:Schema<User>=new Schema({
  username:{
        type:String,
        required:true
  },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String,
        required:true
    },
    verificationCodeExpires:{
        type:Date,
        default:Date.now
    }

})

const Usermodel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model('User',UserSchmea);

export default Usermodel;
