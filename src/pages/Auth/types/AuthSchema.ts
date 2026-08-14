import * as z from 'zod';


const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(1, {message: 'Password is required'})
});

const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
    first_name: z.string().min(2, {message: 'Name must be at least 2 characters long'}),
    last_name: z.string().min(2, {message: 'Name must be at least 2 characters long'}),
});

const signInDefaultValues = {
    email: '',
    password: ''
};

const signUpDefaultValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
};

export {
    signInSchema,
    signUpSchema,
    signInDefaultValues,
    signUpDefaultValues
};

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;