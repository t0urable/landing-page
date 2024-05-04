import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

        const userSignOut = () => {
            signOut(auth)
        }
    return (
        <div>
            {authUser ? <>
                <p>Signed In as {`${authUser.email}`}</p>
                <button onClick = {userSignOut}>Sign Out</button>
            </> : <p>Signed Out</p>}
        </div>
    );
}

export default AuthDetails;
