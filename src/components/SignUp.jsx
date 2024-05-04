import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { PasswordStrength } from '../../pages/lib'; 

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log('User Created', response);
            })
            .catch((error) => {
                console.error('Failed to create:', error);
            });
    };

    return (
        <div className='sign-in-container'>
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input 
                    type="email" 
                    placeholder='Enter your email' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <PasswordStrength 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up Here</button>
            </form>
        </div>
    );
};

export default SignUp;
