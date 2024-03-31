import { Group } from '@mantine/core';
import pianoImage from './icons/piano.svg'
import { FloatingLabelInput } from './lib';

export default function IndexPage() {
  const headerStyle = {
    color: 'white',
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1.2',
    textAlign: 'center',
  };

  const subHeaderStyle = {
    fontSize: '2rem',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  };

  return (
    <div style={{
      backgroundImage: `url(${pianoImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Group style={{ flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={headerStyle}>Adaptive, Personalized <br/>Sightreading Sessions</h1>
        <h2 style={subHeaderStyle}>Anytime, Anywhere</h2>
        <FloatingLabelInput></FloatingLabelInput>
        <p style={{ color: 'rgba(255, 255, 255, 0.75)', marginBottom: '2em' }}>
          Find unseen before sheet music at your level, personalized for your skill
        </p>
      </Group>
    </div>
  );
}
