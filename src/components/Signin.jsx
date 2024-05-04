import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log('Logged in!', response);
            })
            .catch((error) => {
                console.error('Failed to sign in:', error);
            });
    };

    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input
                    type="email"
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default SignIn;
