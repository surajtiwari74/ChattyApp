const mongoose = require("mongoose");
const{createHmac,randomBytes} =require('crypto');
const userSchema = new mongoose.Schema({
  username: { 
     type: String,
     required: true,
      unique: true 
    },
    fullName:{
      type:String,
      required:true
    },
  password: { 
    type: String, 
    required: true 
  }, // Hash this before saving
  salt:{
    type:String
  },
  gender:{
    type:String,
    require:true ,
    enum:['male',"female"]
  },
  profilePhoto:{
    type:String,
    default:""
},
}, { timestamps: true });
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
        salt = randomBytes(16).toString('hex');
        const hashedPassword = createHmac("sha256", salt).update(this.password).digest("hex");//hash the password with the salt using sha256
        this.password = hashedPassword;
        this.salt = salt;
        next();
})

module.exports = mongoose.model("User", userSchema);
