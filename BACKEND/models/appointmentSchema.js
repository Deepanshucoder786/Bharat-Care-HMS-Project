import mongoose from "mongoose";
import validator from "validator"
const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must contain at least 3 characters"],
    },
    lastName: { 
        type: String,
        required: [true, "Last name is required"],
        minLength: [3, "Last name must contain at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minLength: [10, "Phone number must contain exactly 10 digits"],
        maxLength: [10, "Phone number must contain exactly 10 digits"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [14, "NIC  must contain Exact 14 Digites"],
        minLength: [14, "NIC  must contain Exact 14 Digites"],
        
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male", "Female"]
    },
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        }
    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending", "Accepted", "Rejected"],
        default:"Pending",
    }
});

export const Appointment= mongoose.model("Appointment",appointmentSchema)