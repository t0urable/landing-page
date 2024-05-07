// Default imports
import React, { useState, useEffect } from 'react';
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "../theme";
import { AuthProvider, useAuth } from "../src/AuthContext";  // Combined import for clarity

// Component imports
import { DoubleHeader, FooterCentered } from './lib';  // Assuming both are exported from './lib'
import AuthModal from '../src/components/AuthModal'; // Adjust path as necessary

// Page imports
import Music from './music';
import Product from './product';
import Overview from './overview';

const MainContent = ({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) => {
  const { currentUser } = useAuth();  // Correctly use useAuth
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Automatically open modal if the user is not logged in
    setIsAuthModalOpen(!currentUser);
  }, [currentUser]);

  const [pageTracker, setPageTracker] = useState(0);

  // Determine which content to display based on pageTracker
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
    <>
      <DoubleHeader setpageTracker={setPageTracker} />
      {content}
      <FooterCentered />
      <AuthModal opened={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default function App({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  return (
    <AuthProvider>  
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <MainContent Component={Component} pageProps={pageProps} />
      </MantineProvider>
    </AuthProvider>
  );
}
