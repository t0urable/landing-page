import React from 'react';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import FileUpload from './customcomponents/FileUpload';

export default function Product() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <div style={{ margin: '2%' }}>
            <h1>Upload files below!</h1>
            <FileUpload /> {/* File upload component */}
            <div style = {{ margin: '2%' }}>
              <iframe
                src="https://learnsubito.com"
                style={{
                  width: '100%',    // Full width
                  height: '600px',  // Set a fixed height, adjust as needed
                  border: 'none'    // Remove iframe border
                }}
                title="Learn Subito"
              ></iframe>
            </div>
            
        </div>
    </MantineProvider>
  );
}
