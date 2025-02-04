import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must contain at least 3 characters"],
    },
    lastName: { // Corrected field name (it was `LasttName` before)
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
    message: {
        type: String,
        required: [true, "Message is required"],
        minLength: [10, "Message must contain at least 10 characters"],
        maxLength: [500, "Message must not exceed 500 characters"], // Adjusted maxLength for a realistic message
    },
});

export const Message = mongoose.model("Message", messageSchema);
