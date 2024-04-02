import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';
import { supabase } from '../../../src/supabaseClient.js';

export function FloatingLabelInput() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Sign up on our waitlist');

  const floating = value.trim().length !== 0 || focused || undefined;

  const handleKeyDown = async (event: any) => {
    if(event.code === 'Enter') {
      const { data, error } = await supabase
        .from('wait_listers')
        .insert([
          { email: value }
        ]);
    
    if (error) {
      console.error('Error inserting data', error);
      setValue('');
    } else {
      console.log('Data inserted', data);
      setValue('');
      setPlaceholder('Email inputted successfully');
      
    }

    }
  }

  return (
    <TextInput
      label= {placeholder}
      placeholder="janedoe@gmail.com"
      required
      classNames={classes}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
      onKeyDown = { handleKeyDown }
    />
  );
}
