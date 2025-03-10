const { default: mongoose } = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), 
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    about: {
        type: String,
        maxlength: 5000
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = {
    User
};