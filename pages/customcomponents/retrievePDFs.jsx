import "@mantine/core/styles.css";
import React, { useEffect, useState } from 'react';
import { TableSort } from '../lib';

export function RetrievePDFs() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const [sslError, setSslError] = useState(false);  

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://localhost:3000/api/files');
                if (!response.ok) {
                    if(response.status === 401) {
                        throw new Error('SSL Certificate error, please check your server configuration.');
                    }
                    throw new Error('Failed to fetch files - server responded with an error.');
                }
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                console.error('Error fetching files:', error);
                if (error.message.includes('SSL')) {
                    setSslError(true);  
                }
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            {sslError && <p>Error: SSL/TLS configuration issue. Please check your certificates.</p>}
            {error && <p>Error: {error}</p>}
            {loading ? <p>Loading...</p> :
             (files.length > 0 ? <TableSort data={files} /> : <p>No files found.</p>)}
        </div>
    );
}
