// default imports
import React, { useState, useEffect } from 'react';
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "../theme";
import { AuthProvider , useAuth } from "../src/AuthContext";  // Ensure correct import of AuthProvider and useAuth

//component imports
import { DoubleHeader }from './lib'
import { FooterCentered } from './lib'
import AuthModal from '../src/components/AuthModal'; // Adjust path as necessary

// Page imports
import Music from './music';
import Product from './product';
import Overview from './overview';

const MainContent = ({ Component, pageProps }) => {
  const { authUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Automatically open modal if the user is not logged in
    setIsAuthModalOpen(!authUser);
  }, [authUser]);

  const [pageTracker, setpageTracker] = useState(0);
  let content;
  switch (pageTracker) {
    case 1:
      content = <Overview />;
      break;
    case 2:
      content = <Music />;
      break;
    case 3:
      content = <Product />;
      break;
    default:
      content = <Component {...pageProps} />;
  }

  return (
    <AuthProvider>
      <DoubleHeader setpageTracker={setpageTracker} />
        {content}
      <FooterCentered />
      <AuthModal opened={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </AuthProvider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <MainContent Component={Component} pageProps={pageProps} />
      </MantineProvider>
    </AuthProvider>
  );
}
