import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { PasswordStrength } from '../../pages/lib';

const SignUp = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User Created', response);
            onClose(); // Close modal or handle post-sign-up logic
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <form onSubmit={signUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Create Account</h1>
                <input 
                    type="email" 
                    placeholder='Enter your email' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-label="Email Address"
                    style={{ margin: '10px 0', padding: '8px', width: '300px' }}
                />
                <PasswordStrength 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                    style={{ margin: '10px 0', padding: '8px', width: '300px' }}
                />
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Sign Up Here</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
