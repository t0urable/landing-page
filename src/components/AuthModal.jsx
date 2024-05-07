import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AuthModal = ({ opened, onClose, setDisplayName }) => {
    const [view, setView] = useState('signin'); // 'signin' or 'signup'

    const handleSignUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created:', userCredential);
            onClose(); // Close modal after sign up
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up. Please try again.');
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            withOverlay={true}
            withCloseButton={true}
            overlayProps={{ opacity: 0.55, color: '#000' }}
            title={view === 'signin' ? "Sign In" : "Sign Up"}
        >
            <Modal.Header>
                <Modal.Title>{view === 'signin' ? 'Sign In' : 'Sign Up'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {view === 'signin' ? (
                    <>
                        <SignIn onClose={onClose} setDisplayName = {setDisplayName}/>
                        <Button variant="link" onClick={() => setView('signup')}>Don't have an account? Sign Up</Button>
                    </>
                ) : (
                    <>
                        <SignUp onSignUp={handleSignUp} onClose={onClose} />
                        <Button variant="link" onClick={() => setView('signin')}>Already have an account? Sign In</Button>
                    </>
                )}
            </Modal.Body>
            <Modal.CloseButton />
        </Modal>
    );
};

export default AuthModal;
