import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';
import classes from './HeroBullets.module.css';
import HoverCardWaitlist from './HoverCardWaitlist';
import { FloatingLabelInput } from '../FloatingLabelInput/FloatingLabelInput';

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            An <span className={classes.highlight}>Adaptive</span> <br /> sightreading application
          </Title>
          <Text c="dimmed" mt="md">
            Practice sightreading and find new music for your needs without hassle – Subito loads
            piano sheet music for you to sightread that adapts based on your skill level and needs:
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Adaptive</b> – Subito queues sheet music that you've never seen before as you play and listens - so you never need to
              turn the page or write down your mistakes
            </List.Item>
            <List.Item>
              <b>Customized</b> – Find sheet music adjusted to your difficulty level, from the same classical
              composers you play frequently or the anime and movie covers that you love
            </List.Item>
            <List.Item>
              <b>Smart Learning</b> – Subito listens as you play - and notes ornaments and measures that you misplay 
              frequently so you can pinpoint your learning
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              See the demo
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Contact Us <a href="https://www.linkedin.com/in/sean-z-cai/"></a>
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}
