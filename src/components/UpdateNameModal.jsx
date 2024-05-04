import React, { useState } from 'react';
import { Modal, Button, TextInput, Group } from '@mantine/core';
import { auth } from '../firebase';

function UpdateNameModal({ onNameUpdate }) {
  const [newName, setNewName] = useState('');

  const handleUpdateName = async () => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      alert('No user logged in');
      return;
    }

    try {
      await auth.currentUser.updateProfile({
        displayName: newName
      });
      console.log('Name updated successfully');
      alert('Name updated successfully');
      onNameUpdate(newName); // Update parent component's state
      setNewName(''); // Clear modal input
    } catch (error) {
      console.error('Failed to update user name:', error);
      alert('Failed to update name');
    }
  };

  return (
    <>
      <Button onClick={() => setNameModalOpen(true)}>Change Name</Button>
      <Modal
        opened={nameModalOpen}
        onClose={() => setNameModalOpen(false)}
        title="Update Your Name"
      >
        <TextInput
          label="New Name"
          value={newName}
          onChange={(event) => setNewName(event.currentTarget.value)}
          placeholder="Enter your new name"
        />
        <Group position="right" mt="md">
          <Button onClick={handleUpdateName}>Update Name</Button>
        </Group>
      </Modal>
    </>
  );
}

export default UpdateNameModal;
