import React, { useEffect, useState } from 'react';
import { Container, Anchor, Group, Burger, Box, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './DoubleHeader.module.css';
import Image from 'next/image';
import { useAuth } from "../../../src/AuthContext";
import AuthModal from '../../../src/components/AuthModal';
import UpdateNameModal from '../../../src/components/UpdateNameModal';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/', label: 'Waitlist Input' },
  { link: '/', label: 'See some of our music' },
  { link: '/', label: 'See the product' }
];

interface DoubleHeaderProps {
  setpageTracker: (index: number) => void;
}

export function DoubleHeader({ setpageTracker }: DoubleHeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const [updateNameModalOpen, setUpdateNameModalOpen] = useState(false);
  const [namePrompted, setNamePrompted] = useState(false);

  useEffect(() => {
    setDisplayName(currentUser?.displayName || currentUser?.email || 'Guest');
    if (currentUser && !currentUser.displayName && !namePrompted) {
      setUpdateNameModalOpen(true);
      setNamePrompted(true);
    } else if (!currentUser) {
      setUpdateNameModalOpen(false);
      setNamePrompted(false);
    }
  }, [currentUser, modalOpen]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleUpdateNameModal = () => {
    if (currentUser && !currentUser.displayName) {
      setUpdateNameModalOpen(!updateNameModalOpen);
    }
  };

  const closeModal = () => setModalOpen(false);

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
        setpageTracker(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Image src="/SubitoLogo.png" alt="Subito Icon" width={100} height={100} />
        <Button onClick={() => console.log({currentUser})}>Debugging</Button>
        <p>Welcome!</p>
        {!currentUser && (
          <Button onClick={toggleModal}>Sign In</Button>
        )}
        {modalOpen && <AuthModal setDisplayName = {setDisplayName} opened={modalOpen} onClose={closeModal} />}
        {currentUser && (
          <Button onClick={toggleUpdateNameModal}>Update Name</Button>
        )}
        {updateNameModalOpen && <UpdateNameModal onNameUpdate={setDisplayName} onClose={toggleUpdateNameModal} />}
        <Box className={classes.links} visibleFrom="sm">
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>
    </header>
  );
}
