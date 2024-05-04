import React, { useEffect, useState } from 'react';
import { Container, Anchor, Group, Burger, Box, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './DoubleHeader.module.css';
import Image from 'next/image';
import { useAuth } from "../../../src/AuthContext";
import UpdateNameModal from '../../../src/components/UpdateNameModal';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/', label: 'Waitlist Input' },
  { link: '/', label: 'See some of our music'},
  { link: '/', label: 'See the product'}
];

interface DoubleHeaderProps {
  setpageTracker: (index: number) => void;
}

export function DoubleHeader({ setpageTracker }: DoubleHeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const { currentUser } = useAuth(); 
  const [displayName, setDisplayName] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to control the modal visibility

  useEffect(() => {
    setDisplayName(currentUser?.displayName || currentUser?.email || 'Guest');
  }, [currentUser]);

  const toggleModal = () => setModalOpen(!modalOpen); // Function to toggle the modal

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
        <Image src="/SubitoLogo.png" alt="Subito Icon" width={100} height={100}></Image>
        <p>Welcome {displayName}</p>
        {!currentUser && (
          <Button onClick={toggleModal}>Sign In</Button> // Show sign in button if no user is logged in
        )}
        {modalOpen && <UpdateNameModal onNameUpdate={setDisplayName} />} 
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
