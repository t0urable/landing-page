import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import SignIn from './SignIn'; // Adjust paths as necessary
import SignUp from './SignUp'; // Adjust paths as necessary

const AuthModal = ({ opened, onClose }) => {
    const [view, setView] = useState('signin'); // 'signin' or 'signup'

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            withOverlay={true}
            withCloseButton={true}
            overlayProps={{ opacity: 0.55, color: '#000' }}
            title={view === 'signin' ? "Sign In" : "Sign Up"}
            __staticSelector="AuthModal"
        >
            <Modal.Header>
                <Modal.Title>{view === 'signin' ? 'Sign In' : 'Sign Up'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {view === 'signin' ? (
                    <>
                        <SignIn />
                        <Button variant="link" onClick={() => setView('signup')}>Don't have an account? Sign Up</Button>
                    </>
                ) : (
                    <>
                        <SignUp />
                        <Button variant="link" onClick={() => setView('signin')}>Already have an account? Sign In</Button>
                    </>
                )}
            </Modal.Body>
            <Modal.CloseButton />
        </Modal>
    );
};

export default AuthModal;
