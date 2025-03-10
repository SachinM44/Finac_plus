const z = require('zod');

const dateParser = z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) {
        return new Date(arg);
    }
}, z.date());

const RegistrationInput = z.object({
    name: z.string().min(2),
    age: z.number().min(0).max(120),
    dateOfBirth: dateParser,
    password: z.string().min(10).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/),
    gender: z.enum(['Male', 'Female', 'Other']),
    about: z.string().max(5000)
});

const LoginInput = z.object({
    name: z.string().min(2),
    password: z.string().min(10).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/)
});

const UpdateInput = z.object({
    name: z.string().min(2),
    age: z.number().min(0).max(120),
    dateOfBirth: dateParser,
    password: z.string().min(10).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/),
    gender: z.enum(['Male', 'Female', 'Other']),
    about: z.string().max(5000)
});

module.exports = {
    RegistrationInput,
    LoginInput,
    UpdateInput
};