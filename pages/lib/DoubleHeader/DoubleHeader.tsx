import { useEffect, useState } from 'react';
import { Container, Anchor, Group, Burger, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './DoubleHeader.module.css';
import Image from 'next/image';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/', label: 'Waitlist Input' },
  { link: '/', label: 'See some of our music'},
  { link: '/', label: 'See the product'}
];

interface DoubleHeaderProps {
  setpageTracker: (index: number) => void;
}

export function DoubleHeader({setpageTracker}: DoubleHeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);

        //this function passes the current index to app.tsx
        setpageTracker(index);

        //debugging
        console.log(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Image src = "/SubitoLogo.png" alt="Subito Icon" width = {100} height = {100}></Image>
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
