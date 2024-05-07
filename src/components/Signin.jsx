import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ onClose, setDisplayName}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in!', response);

            setDisplayName(response.user.email);
            onClose(); // Close modal on successful login
        } catch (error) {
            console.error('Login error:', error.message);
            setError("Failed to log in. Please check your email and password.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <form onSubmit={signIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Sign In</h1>
                <input
                    type="email"
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-label="Email Address"
                    style={{ margin: '10px 0', padding: '8px', width: '300px' }}
                />
                <input
                    type="password"
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    aria-label="Password"
                    style={{ margin: '10px 0', padding: '8px', width: '300px' }}
                />
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Log In</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default SignIn;
